import { NextResponse } from 'next/server';
import { z } from 'zod';

import llmService from '@/lib/llm';
import { rateLimit, validationError } from '@/lib/apiGuards';

const flashcardsSchema = z.object({
  topic: z.string().trim().min(1).max(200),
  count: z.coerce.number().int().min(1).max(30),
});

export async function POST(request: Request) {
  try {
    const limited = rateLimit(request, 'api-generate-flashcards', { limit: 30, windowMs: 60_000 });
    if (limited) return limited;

    const parsed = flashcardsSchema.safeParse(await request.json());
    if (!parsed.success) return validationError('Parametros de flashcards invalidos.');

    const { topic, count } = parsed.data;

    const systemPrompt = `Voce e um professor especialista criador de flashcards para revisao espacada.
Gere exatamente ${count} flashcards sobre "${topic}".
Responda apenas JSON valido neste modelo:
{
  "flashcards": [
     {"front": "Pergunta", "back": "Resposta super direta com metodo", "bloom": "compreender"}
  ]
}
Regras:
1. Nao use markdown fora do JSON.
2. Nao use HTML.
3. Nao inclua dados pessoais.`;

    const llmOutput = await llmService.generate([
      { role: 'system', content: systemPrompt },
      { role: 'user', content: `Gere os ${count} flashcards sobre ${topic}.` }
    ], { temperature: 0.7 });

    const rawOutput = String(llmOutput || '').replace(/```json/g, '').replace(/```/g, '').trim();
    const jsonMatch = rawOutput.match(/\{[\s\S]*\}/);

    if (!jsonMatch) throw new Error('Sem JSON na resposta.');

    return NextResponse.json(JSON.parse(jsonMatch[0]));
  } catch (error: any) {
    console.error('[GenerateFlashcardsAPI] Erro:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
