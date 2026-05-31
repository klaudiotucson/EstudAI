// @ts-nocheck
import { NextResponse } from 'next/server';
import { z } from 'zod';
import llmService from '@/lib/llm';
import { searchSimilar } from '@/lib/vectorStore';
import * as funcoesEstudo from '@/lib/funcoes-estudo';
import * as funcoesPremium from '@/lib/funcoes-premium-estudo';
import * as funcoesAvancadas from '@/lib/funcoes-aprendizado-v2';
import { rateLimit, validationError } from '@/lib/apiGuards';

const searchQuerySchema = z.object({
  q: z.string().trim().min(1).max(200),
  ano: z.string().trim().max(120).optional(),
});

export async function GET(request: Request) {
  const limited = rateLimit(request, 'api-search', { limit: 40, windowMs: 60_000 });
  if (limited) return limited;

  const { searchParams } = new URL(request.url);
  const parsedQuery = searchQuerySchema.safeParse({
    q: searchParams.get('q'),
    ano: searchParams.get('ano') || undefined,
  });
  if (!parsedQuery.success) return validationError('Tema de busca invalido.');

  const query = parsedQuery.data.q;
  const anoEscolar = normalizarAnoEscolar(parsedQuery.data.ano || '6º ano');
  const escopo = criarEscopoBusca(anoEscolar);

  try {
    const area = funcoesEstudo.detectarArea({ tema: query, disciplina: '' });
    const fontes = funcoesPremium.recomendarFontesPremium({ tema: query, disciplina: area });
    const ragResults = await searchSimilar(query, 3);
    const ragText = ragResults.map((r) => r.text).join('\n---\n');
    const ragInject = ragText ? `\n\n### BASE DE CONHECIMENTO CIENTIFICO, BNCC E PREPARATORIOS:\n${ragText}` : '';

    let parsedLLM: any = {};

    try {
      const systemPrompt = `Voce e um professor especialista de ${area} focado em ${escopo.label}.
Seu trabalho e gerar uma base de estudo sobre "${query}".${ragInject}

ESCOPO DO APP:
- Ensino Fundamental Anos Finais: 6º, 7º, 8º e 9º anos.
- Ensino Medio: 1º, 2º e 3º anos, com Linguagens, Matematica, Ciencias da Natureza e Ciencias Humanas.
- Preparacao ENEM: Linguagens, Redacao, Matematica, Ciencias Humanas e Ciencias da Natureza.
- Pre-militares e concursos: nivel fundamental, nivel medio, escolas militares e carreiras militares.
- Avancado: ITA e IME com matematica, fisica e quimica em alto rigor.
- Ajuste linguagem, profundidade, exemplos, dificuldade e cobranca ao escopo: ${escopo.label}.

REGRAS:
1. Responda apenas JSON valido.
2. Nao invente fontes.
3. Use linguagem adequada ao nivel.
4. Inclua exemplos e questoes proporcionais ao nivel.

MODELO:
{
  "shortSummary": "Resumo objetivo com lista de pontos criticos.",
  "mindMap": {
    "title": "Conceito Central",
    "description": "Explicacao breve",
    "children": [{ "title": "Ramo 1", "description": "...", "children": [] }]
  },
  "flashcards": [
    { "front": "Pergunta clara", "back": "Resposta curta e precisa" }
  ],
  "questions": [
    {
      "enunciado": "Questao de multipla escolha",
      "alternativas": ["A", "B", "C", "D"],
      "correta": "A",
      "explicacao": "Justificativa."
    }
  ]
}`;

      const llmOutput = await llmService.generate([
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `Crie o JSON completo sobre ${query} para ${escopo.label}.` }
      ], { temperature: 0.55 });

      const rawOutput = String(llmOutput || '').replace(/```json/g, '').replace(/```/g, '').trim();
      const jsonMatch = rawOutput.match(/\{[\s\S]*\}/);
      parsedLLM = jsonMatch ? JSON.parse(jsonMatch[0]) : {};
    } catch {
      parsedLLM = criarFallbackLLM({ query, area, anoEscolar, escopo });
    }

    const baseSearchResult = {
      topic: query,
      subject: area,
      grade: anoEscolar,
      summary: parsedLLM.resumeContent || parsedLLM.shortSummary || '',
      keyConcepts: (parsedLLM.flashcards || []).map((fc: any) => fc.front).filter(Boolean),
      examples: [],
      commonMistakes: [],
      sources: fontes,
      videoSources: fontes.filter((fonte: any) => {
        const type = String(fonte.type || fonte.category || '').toLowerCase();
        const title = String(fonte.title || '').toLowerCase();
        return type.includes('video') || title.includes('youtube') || title.includes('khan') || title.includes('futura');
      })
    };

    const pacoteEstudo = funcoesAvancadas.gerarPacoteCompletoAposBusca({
      searchResult: baseSearchResult,
      tema: query,
      disciplina: area,
      anoEscolar,
      desempenho: 0.6
    });

    const modoTurbo = funcoesAvancadas.criarPlanoTurboAprendizagem({
      tema: query,
      disciplina: area,
      anoEscolar,
      desempenho: 0.6
    });

    const pdfIlustrado = {
      ...pacoteEstudo.pdfIlustrado,
      images: (pacoteEstudo.pdfIlustrado?.images || []).map((image: any) => ({
        ...image,
        imageUrl: `https://image.pollinations.ai/prompt/${encodeURIComponent(image.generationPrompt || query)}?width=900&height=520&nologo=true`
      }))
    };

    return NextResponse.json({
      tema: query,
      disciplina: area,
      anoEscolar,
      escopo,
      topic: query,
      shortSummary: parsedLLM.shortSummary || `Resumo de ${query} para ${escopo.label}.`,
      mindMap: parsedLLM.mindMap || null,
      fontes,
      resumoAnalitico: pacoteEstudo.resumoAnalitico,
      tecnicasComprovadas: pacoteEstudo.tecnicas,
      pdfIlustrado,
      modosEstudo: pacoteEstudo.modos,
      modoTurbo,
      orientadorFontes: pacoteEstudo.sourceCoach,
      proximasAcoes: pacoteEstudo.nextUiActions,
      detailedSummary: '',
      resumeContent: '',
      studyPlan7Days: pacoteEstudo.studyPlan7Days || [],
      workedExamples: pacoteEstudo.workedExamples || [],
      questions: parsedLLM.questions || [],
      flashcards: parsedLLM.flashcards || [],
      mnemonicos: pacoteEstudo.mnemonicos || [],
      parodias: pacoteEstudo.parodias || [],
      podcastScript: pacoteEstudo.podcastScript || []
    });
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
      fallback: criarFallbackLLM({ query, area: 'geral', anoEscolar, escopo })
    }, { status: 500 });
  }
}

function normalizarAnoEscolar(value: string) {
  const text = String(value || '').toLowerCase();
  if (text.includes('ita') || text.includes('ime')) return 'ITA/IME';
  if (text.includes('enem')) return 'ENEM';
  if (text.includes('militar') && (text.includes('médio') || text.includes('medio') || text.includes('em'))) return 'Pré-militar médio';
  if (text.includes('militar')) return 'Pré-militar fundamental';
  if (text.includes('concurso') && (text.includes('médio') || text.includes('medio') || text.includes('em'))) return 'Concursos nível médio';
  if (text.includes('concurso')) return 'Concursos nível fundamental';
  if (text.includes('3') && (text.includes('em') || text.includes('médio') || text.includes('medio'))) return '3º ano EM';
  if (text.includes('2') && (text.includes('em') || text.includes('médio') || text.includes('medio'))) return '2º ano EM';
  if (text.includes('1') && (text.includes('em') || text.includes('médio') || text.includes('medio'))) return '1º ano EM';
  if (text.includes('9')) return '9º ano';
  if (text.includes('8')) return '8º ano';
  if (text.includes('7')) return '7º ano';
  return '6º ano';
}

function criarEscopoBusca(anoEscolar: string) {
  const text = String(anoEscolar || '').toLowerCase();
  if (text.includes('enem')) return { label: 'preparacao ENEM', tipo: 'enem' };
  if (text.includes('ita') || text.includes('ime')) return { label: 'preparacao ITA/IME', tipo: 'ita-ime' };
  if (text.includes('militar')) return { label: anoEscolar, tipo: 'pre-militar' };
  if (text.includes('concurso')) return { label: anoEscolar, tipo: 'concurso' };
  if (text.includes('em')) return { label: `${anoEscolar} do Ensino Medio`, tipo: 'ensino-medio' };
  return { label: `${anoEscolar} do Ensino Fundamental Anos Finais`, tipo: 'fundamental' };
}

function criarFallbackLLM({ query, area, anoEscolar, escopo }: any) {
  return {
    shortSummary: `Resumo inicial de ${query} para ${escopo?.label || anoEscolar}. Este material organiza os pontos centrais, exemplos e perguntas para começar o estudo mesmo quando a IA externa estiver indisponivel.\n- Tema: ${query}\n- Area: ${area}\n- Nivel: ${anoEscolar}\n- Proximo passo: gerar flashcards, quiz e caderno de erros.`,
    mindMap: {
      title: query,
      description: `Mapa inicial para ${query}`,
      children: [
        { title: 'Conceitos-chave', description: 'Termos e ideias principais.', children: [] },
        { title: 'Exemplos', description: 'Aplicacoes e situacoes de prova.', children: [] },
        { title: 'Erros comuns', description: 'Pontos que merecem revisao.', children: [] }
      ]
    },
    flashcards: [
      { front: `O que e ${query}?`, back: `Explique ${query} com definicao, exemplo e uma aplicacao.` },
      { front: `Como ${query} aparece em provas?`, back: 'Pode aparecer em interpretacao, calculo, comparacao, aplicacao ou justificativa.' }
    ],
    questions: [
      {
        enunciado: `Qual e a melhor primeira estrategia para estudar ${query}?`,
        alternativas: ['Tentar lembrar o que ja sabe', 'Copiar tudo sem entender', 'Pular exemplos', 'Evitar exercicios'],
        correta: 'Tentar lembrar o que ja sabe',
        explicacao: 'Recuperacao ativa mostra lacunas e torna o estudo mais eficiente.'
      }
    ]
  };
}
