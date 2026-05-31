import { NextResponse } from 'next/server';
import { z } from 'zod';

import llmService from '@/lib/llm';
import { rateLimit, validationError } from '@/lib/apiGuards';

const summarySchema = z.object({
  topic: z.string().trim().min(1).max(200),
});

export async function POST(request: Request) {
  try {
    const limited = rateLimit(request, 'api-generate-summary', { limit: 15, windowMs: 60_000 });
    if (limited) return limited;

    const parsed = summarySchema.safeParse(await request.json());
    if (!parsed.success) return validationError('Topico invalido.');

    const { topic } = parsed.data;

    const systemPrompt = `Voce e um professor especialista capaz de atender Ensino Fundamental Anos Finais, Ensino Medio, ENEM, pre-militares, concursos de nivel fundamental/medio, ITA e IME.
Sua missao e escrever um material didatico completo e profundo sobre "${topic}", ajustando linguagem, exemplos e dificuldade ao nivel informado pelo app.

Inclua:
- introducao historica e conceitual;
- funcionamento na pratica;
- formulas ou regras, se aplicavel;
- subtopicos importantes;
- casos excepcionais e curiosidades;
- resumo final;
- aplicacoes em ENEM, concursos, pre-militares, ITA/IME quando fizer sentido;
- fontes e termos que o aluno deve checar no material oficial.

Regras:
1. Escreva em Markdown.
2. Nao use HTML.
3. Nao solicite nem inclua dados pessoais.`;

    const content = await llmService.generate([
      { role: 'system', content: systemPrompt },
      { role: 'user', content: `Crie o guia definitivo e extenso sobre o tema: ${topic}` }
    ], { temperature: 0.7, max_tokens: 6000 });

    return NextResponse.json({ content });
  } catch (error: any) {
    console.error('[GenerateSummaryAPI] Erro:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
