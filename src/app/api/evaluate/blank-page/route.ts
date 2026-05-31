import { NextResponse } from 'next/server';
import { z } from 'zod';

import llmService from '@/lib/llm';
import { rateLimit, validationError } from '@/lib/apiGuards';

const blankPageSchema = z.object({
  topic: z.string().trim().min(1).max(200),
  content: z.string().trim().min(10).max(6000),
});

export async function POST(req: Request) {
  try {
    const limited = rateLimit(req, 'api-evaluate-blank-page', { limit: 25, windowMs: 60_000 });
    if (limited) return limited;

    const parsed = blankPageSchema.safeParse(await req.json());
    if (!parsed.success) return validationError('Tema ou texto invalido.');

    const { topic, content } = parsed.data;

    const systemPrompt = `Voce e um avaliador academico premium.
Avalie o texto de recuperacao ativa do aluno com precisao e acolhimento.
Retorne apenas JSON valido, sem markdown fora do JSON.
Nao solicite nem repita dados pessoais.`;

    const userPrompt = `
Tema: ${topic}
Texto do aluno: "${content}"

Retorne JSON nesta estrutura:
{
  "score": "numero de 0 a 10 de quao bom foi o recall",
  "remembered": ["Ponto que lembrou bem"],
  "missed": ["Conceito importante que faltou"]
}`;

    const rawResponse = await llmService.generate([
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt }
    ], { temperature: 0.3 });

    try {
      const cleaned = String(rawResponse || '').replace(/```json/g, '').replace(/```/g, '').trim();
      return NextResponse.json(JSON.parse(cleaned));
    } catch {
      return NextResponse.json({
        score: 5,
        remembered: ['Alguns conceitos do texto'],
        missed: ['Muitos pontos-chave nao ficaram claros', 'Tente escrever mais detalhadamente na proxima']
      });
    }
  } catch (error) {
    console.error('Error on evaluate blank page:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
