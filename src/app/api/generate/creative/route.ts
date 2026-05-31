import { NextResponse } from 'next/server';
import { z } from 'zod';

import llmService from '@/lib/llm';
import { rateLimit, validationError } from '@/lib/apiGuards';

const creativeSchema = z.object({
  topic: z.string().trim().min(1).max(200),
  type: z.enum(['podcast', 'parodia', 'mnemonico']),
  style: z.string().trim().max(80).optional(),
  duration: z.coerce.number().int().min(1).max(10).optional(),
  context: z.string().max(6000).optional(),
});

export async function POST(request: Request) {
  try {
    const limited = rateLimit(request, 'api-generate-creative', { limit: 20, windowMs: 60_000 });
    if (limited) return limited;

    const parsed = creativeSchema.safeParse(await request.json());
    if (!parsed.success) return validationError('Parametros criativos invalidos.');

    const { topic, type, style, duration, context } = parsed.data;
    let systemPrompt = '';

    if (type === 'parodia') {
      systemPrompt = `Crie uma parodia educacional sobre "${topic}".
Estilo/ritmo: ${style || 'livre'}.
Responda apenas JSON valido:
{
  "parodias": [
    {"titulo": "Titulo criativo", "melodia": "Referencia de ritmo", "letra": "Letra completa"}
  ]
}
Nao use HTML e nao inclua dados pessoais.`;
    } else if (type === 'podcast') {
      const numFalas = (duration || 2) * 3;
      systemPrompt = `Crie roteiro de podcast educacional sobre "${topic}".
Estilo: ${style || 'conversa amigavel'}.
Duracao estimada: ${duration || 2} minutos. Gere cerca de ${numFalas} interacoes.
Responda apenas JSON valido:
{
  "podcastScript": [
    {"host": "Locutor 1", "fala": "Fala inicial"},
    {"host": "Locutor 2", "fala": "Resposta ou complemento"}
  ]
}
Nao use HTML e nao inclua dados pessoais.`;
    } else {
      const contextMsg = context ? `Resumo como base:\n${context}` : '';
      systemPrompt = `Crie mnemonicos eficientes sobre "${topic}".
${contextMsg}
Responda apenas JSON valido:
{
  "mnemonicos": [
    {"sigla": "PALAVRA", "significado": "P = ...", "explicacao": "Por que funciona"}
  ]
}
Nao use HTML e nao inclua dados pessoais.`;
    }

    const llmOutput = await llmService.generate([
      { role: 'system', content: systemPrompt },
      { role: 'user', content: `Gere o conteudo criativo solicitado sobre ${topic}.` }
    ], { temperature: 0.9, max_tokens: 4000 });

    const rawOutput = String(llmOutput || '').replace(/```json/g, '').replace(/```/g, '').trim();
    const jsonMatch = rawOutput.match(/\{[\s\S]*\}/);

    if (!jsonMatch) throw new Error('Sem JSON na resposta.');

    return NextResponse.json(JSON.parse(jsonMatch[0]));
  } catch (error: any) {
    console.error('[GenerateCreativeAPI] Erro:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
