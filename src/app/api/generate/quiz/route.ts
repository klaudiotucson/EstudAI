import { NextResponse } from 'next/server';
import { z } from 'zod';

import llmService from '@/lib/llm';
import { rateLimit, validationError } from '@/lib/apiGuards';

const quizSchema = z.object({
  topic: z.string().trim().min(1).max(200),
  difficulty: z.string().trim().min(1).max(40),
  count: z.coerce.number().int().min(1).max(30),
});

export async function POST(request: Request) {
  try {
    const limited = rateLimit(request, 'api-generate-quiz', { limit: 30, windowMs: 60_000 });
    if (limited) return limited;

    const parsed = quizSchema.safeParse(await request.json());
    if (!parsed.success) return validationError('Parametros de quiz invalidos.');

    const { topic, difficulty, count } = parsed.data;

    const systemPrompt = `Voce e um professor especialista criador de questoes de prova.
Gere exatamente ${count} questoes de multipla escolha sobre "${topic}", no nivel "${difficulty}".
Responda apenas JSON valido neste modelo:
{
  "questions": [
     {
       "enunciado": "Pergunta adaptativa do nivel solicitado",
       "dificuldade": "${difficulty}",
       "alternativas": ["Item A", "Item B", "Item C", "Item D"],
       "correta": "Item B",
       "explicacao": "Por que a correta esta certa e as outras erradas."
     }
  ]
}
Regras:
1. Nao use markdown fora do JSON.
2. Nao use HTML.
3. Nao inclua dados pessoais.`;

    const llmOutput = await llmService.generate([
      { role: 'system', content: systemPrompt },
      { role: 'user', content: `Gere as ${count} questoes no nivel ${difficulty} sobre ${topic}.` }
    ], { temperature: 0.8 });

    const rawOutput = String(llmOutput || '').replace(/```json/g, '').replace(/```/g, '').trim();
    const jsonMatch = rawOutput.match(/\{[\s\S]*\}/);

    if (!jsonMatch) throw new Error('Sem JSON na resposta.');

    return NextResponse.json(JSON.parse(jsonMatch[0]));
  } catch (error: any) {
    console.error('[GenerateQuizAPI] Erro:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
