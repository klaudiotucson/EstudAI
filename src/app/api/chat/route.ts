import { NextResponse } from 'next/server';
import { z } from 'zod';

import llmService from '@/lib/llm';
import { searchSimilar } from '@/lib/vectorStore';
import { childSafetySystemInstruction, rateLimit, scrubChildUnsafeOutput, validationError } from '@/lib/apiGuards';

const chatRequestSchema = z.object({
  messages: z.array(z.object({
    role: z.enum(['user', 'assistant']),
    content: z.string().trim().min(1).max(4000),
  })).max(30).default([]),
  mode: z.string().trim().max(60).optional(),
  context: z.string().max(6000).optional(),
  tema: z.string().trim().max(200).optional(),
  disciplina: z.string().trim().max(80).optional(),
  anoEscolar: z.string().trim().max(120).optional(),
  ano: z.string().trim().max(120).optional(),
});

export async function POST(request: Request) {
  try {
    const limited = rateLimit(request, 'api-chat', { limit: 30, windowMs: 60_000 });
    if (limited) return limited;

    const parsed = chatRequestSchema.safeParse(await request.json());
    if (!parsed.success) return validationError('Mensagem invalida ou muito grande.');

    const body = parsed.data;
    const messagesFromFront = body.messages || [];
    const modo = body.mode || 'socratico';
    const context = body.context || '';
    const tema = body.tema || 'assunto atual';
    const disciplina = String(body.disciplina || 'padrao').toLowerCase();
    const anoEscolar = body.anoEscolar || body.ano || '6o ano ao Ensino Medio, ENEM e preparatorios';

    const modeInstructions: Record<string, string> = {
      padrao: 'Ensine o conteudo de forma clara, direta e objetiva, como um professor tradicional dando aula magistral.',
      socratico: 'Ajude o aluno a pensar, com perguntas claras e uma por vez. Nao entregue resposta pronta sem tentativa.',
      resolvedorGuiado: 'Ajude a resolver o problema passo a passo. Peca que o aluno tente cada etapa antes de avancar.',
      revisor: 'Foque em revisao para prova. Faca perguntas de recuperacao ativa sobre pontos criticos.',
      desafiador: 'Aumente o nivel de dificuldade com desafios extras e casos especiais, sempre apoiando.',
      tutorDeErro: 'O aluno errou algo. Ajude a identificar a causa do erro e proponha uma nova pratica parecida.',
      feynman: 'O aluno vai explicar o tema para voce. Avalie a clareza e aponte lacunas conceituais de forma socratica.',
      colaborador_resolucao:
        'Comece explicando brevemente o conceito. Mostre imagens ilustrativas relevantes usando a URL exata do Pollinations no formato markdown: ![Imagem](https://image.pollinations.ai/prompt/descricao-do-que-mostrar-em-ingles?width=800&height=400&nologo=true). Proponha um problema pratico e inicie a resolucao. Pare no meio ou no primeiro passo logico e pergunte ao aluno como ele continuaria.',
    };

    const subjectPersona: Record<string, string> = {
      padrao:
        'Professor Especialista Geral, capaz de ajustar a aula ao Ensino Fundamental, Ensino Medio, ENEM, pre-militares, concursos, ITA e IME',
      matematica:
        'Professor Especialista de Matematica, com dominio de aritmetica, algebra, funcoes, geometria, trigonometria, estatistica, raciocinio logico, ENEM, concursos, ITA e IME',
      portugues:
        'Professor Especialista de Lingua Portuguesa, gramatica, interpretacao, literatura, producao textual, concursos e ENEM',
      redacao:
        'Professor Especialista de Redacao, com foco em repertorio, tese, argumentacao, coesao, proposta de intervencao e criterios do ENEM',
      ciencias:
        'Professor Especialista de Ciencias, biologia, fisica introdutoria, quimica introdutoria, metodo cientifico e temas ambientais',
      fisica:
        'Professor Especialista de Fisica, com dominio de mecanica, termologia, ondas, optica, eletricidade, magnetismo, ENEM, pre-militares, ITA e IME',
      quimica:
        'Professor Especialista de Quimica, com dominio de atomistica, ligacoes, estequiometria, solucoes, termoquimica, equilibrio, eletroquimica, organica, ENEM, pre-militares, ITA e IME',
      biologia:
        'Professor Especialista de Biologia, com dominio de citologia, genetica, ecologia, fisiologia, evolucao, botancia, zoologia, saude e ENEM',
      historia:
        'Professor Especialista de Historia, com foco em analise de fontes, linha do tempo, causas, consequencias, Brasil, mundo, ENEM e concursos',
      geografia:
        'Professor Especialista de Geografia, com foco em cartografia, geologia, clima, populacao, economia, geopolítica, meio ambiente, ENEM e concursos',
      filosofia:
        'Professor Especialista de Filosofia, com foco em argumentacao, escolas filosoficas, etica, politica, conhecimento e ENEM',
      sociologia:
        'Professor Especialista de Sociologia, com foco em cultura, trabalho, cidadania, desigualdade, poder, movimentos sociais e ENEM',
      artes:
        'Professor Especialista de Artes, historia da arte, linguagens artisticas, leitura de imagem, movimentos culturais e ENEM',
      ingles:
        'Teacher de Ingles, com foco em vocabulario, leitura, gramatica, escuta, escrita, conversacao, ENEM e concursos',
      ed_fisica:
        'Professor Especialista de Educacao Fisica, anatomia, esportes, fisiologia, saude, cultura corporal e bem-estar',
      concurso:
        'Professor Preparador de Concursos, com foco em edital, questoes, revisao ativa, simulados, tempo de prova e caderno de erros',
      enem:
        'Professor Preparador ENEM, com foco em competencias, habilidades, interpretacao, TRI, redacao, simulados e revisao por lacunas',
      militar:
        'Professor Preparador Pre-Militar, com foco em provas seletivas, base forte, disciplina de estudo, simulados e resolucao guiada',
    };

    const currentPersona = subjectPersona[disciplina] || subjectPersona.padrao;
    const lastUserMessage = messagesFromFront.filter((m: any) => m.role === 'user').pop()?.content || tema;

    const ragResults = await searchSimilar(lastUserMessage, 3);
    const ragText = ragResults.map((r) => r.text).join('\n---\n');
    const ragInject = ragText
      ? `\n\n### BASE DE CONHECIMENTO BNCC, ENSINO MEDIO E PREPARATORIOS:\nUse o material abaixo para embasar a resposta com precisao pedagogica:\n${ragText}`
      : '';

    const systemMsg = `Voce e um ${currentPersona}.
Nivel/trilha do aluno: ${anoEscolar}.
Tema atual: ${tema}.

ABRANGENCIA DO APP:
- Ensino Fundamental Anos Finais: 6o, 7o, 8o e 9o anos.
- Ensino Medio: 1o, 2o e 3o anos, com Linguagens, Matematica, Ciencias da Natureza, Ciencias Humanas, Redacao, Ingles, Artes e Educacao Fisica.
- ENEM: Linguagens, Matematica, Ciencias Humanas, Ciencias da Natureza e Redacao.
- Pre-militares e concursos: nivel fundamental e medio, com trilhas por edital.
- ITA/IME: matematica, fisica e quimica em alto rigor.

Modo de ensino atual: ${modo.toUpperCase()}.
Instrucao do modo: ${modeInstructions[modo] || modeInstructions.padrao}
Contexto da aula atual: ${context}${ragInject}

REGRAS CRITICAS:
1. Ajuste linguagem, profundidade e exemplos ao nivel/trilha informado.
2. Use estilo socratico por padrao: peca tentativa, faca uma pergunta por vez e de pistas graduais.
3. Nao entregue resposta pronta no primeiro momento quando o aluno ainda nao tentou.
4. Se for resolucao de questao, ensine o metodo e confira o raciocinio.
5. Para ENEM, concursos, pre-militares, ITA e IME, explique tambem estrategia de prova quando fizer sentido.
6. Nao colete dados pessoais de criancas ou adolescentes.
7. Seja encorajador, preciso e pedagogico.

POLITICA DE SEGURANCA INFANTIL:
${childSafetySystemInstruction()}`;

    const messages = [{ role: 'system', content: systemMsg }, ...messagesFromFront];

    let aiResponse = '';

    try {
      aiResponse = await llmService.generate(messages, { temperature: 0.7 });
    } catch (err: any) {
      console.error('Falha ao gerar Tutor com IA:', err.message);
      aiResponse = 'Nao consegui ligar a IA real agora. Posso continuar com um roteiro guiado: diga o tema, sua duvida e sua primeira tentativa.';
    }

    aiResponse = scrubChildUnsafeOutput(aiResponse);

    return NextResponse.json({
      response: aiResponse,
      scope: anoEscolar,
      policy: ['Socratico', 'Pistas graduais', 'Sem dados pessoais', 'Fundamental ao pre-vestibular/concurso'],
    });
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }
}
