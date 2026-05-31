// @ts-nocheck
import * as baseStudy from "./funcoes-estudo";
import * as premiumStudy from "./funcoes-premium-estudo";

const TECHNIQUE_CATALOG = Object.freeze({
  retrievalPractice: {
    id: "retrievalPractice",
    name: "Pratica de recuperacao",
    evidence: "forte",
    goal: "Fazer o aluno lembrar antes de reler.",
    bestFor: ["conceitos", "definicoes", "provas", "revisao"],
    appFeature: "Recuperar da memoria",
    studentAction: "Feche o resumo e escreva tudo que lembrar."
  },
  spacedPractice: {
    id: "spacedPractice",
    name: "Pratica espacada",
    evidence: "forte",
    goal: "Distribuir revisoes para lembrar por mais tempo.",
    bestFor: ["flashcards", "vocabulario", "formulas", "conceitos"],
    appFeature: "Fila Revisar Hoje",
    studentAction: "Revise no dia certo, nao tudo de uma vez."
  },
  interleaving: {
    id: "interleaving",
    name: "Intercalacao",
    evidence: "moderada",
    goal: "Misturar tipos de questoes para aprender a escolher estrategia.",
    bestFor: ["matematica", "fisica", "quimica", "classificacao"],
    appFeature: "Treino misturado",
    studentAction: "Resolva questoes parecidas, mas de tipos diferentes."
  },
  elaboration: {
    id: "elaboration",
    name: "Elaboracao",
    evidence: "moderada",
    goal: "Conectar ideias com perguntas de como e por que.",
    bestFor: ["ciencias", "historia", "geografia", "interpretacao"],
    appFeature: "Perguntas por que/como",
    studentAction: "Explique por que isso acontece e como se liga ao cotidiano."
  },
  concreteExamples: {
    id: "concreteExamples",
    name: "Exemplos concretos",
    evidence: "moderada",
    goal: "Transformar ideia abstrata em exemplo real.",
    bestFor: ["conceitos", "ciencias", "gramatica", "matematica"],
    appFeature: "Exemplos do cotidiano",
    studentAction: "Crie dois exemplos e um contraexemplo."
  },
  dualCoding: {
    id: "dualCoding",
    name: "Codificacao dupla",
    evidence: "moderada",
    goal: "Combinar palavras com imagens, diagramas ou tabelas.",
    bestFor: ["processos", "ciclos", "mapas", "comparacoes"],
    appFeature: "Ver como esquema",
    studentAction: "Transforme o texto em desenho e explique o desenho."
  },
  workedExamples: {
    id: "workedExamples",
    name: "Exemplos resolvidos",
    evidence: "moderada",
    goal: "Mostrar caminho antes de exigir autonomia total.",
    bestFor: ["equacoes", "problemas", "fisica", "quimica"],
    appFeature: "Exemplo resolvido",
    studentAction: "Compare cada passo do exemplo com a regra usada."
  },
  fadedExamples: {
    id: "fadedExamples",
    name: "Retirada gradual de ajuda",
    evidence: "moderada",
    goal: "Passar de exemplo guiado para resolucao independente.",
    bestFor: ["matematica", "fisica", "quimica"],
    appFeature: "Complete o passo",
    studentAction: "Complete os passos que sumiram."
  },
  selfExplanation: {
    id: "selfExplanation",
    name: "Autoexplicacao",
    evidence: "moderada",
    goal: "Fazer o aluno justificar o proprio raciocinio.",
    bestFor: ["problemas", "equacoes", "interpretacao"],
    appFeature: "Explique seu passo",
    studentAction: "Depois de cada passo, diga por que ele faz sentido."
  },
  feynman: {
    id: "feynman",
    name: "Tecnica de Feynman",
    evidence: "pratica-pedagogica",
    goal: "Revelar lacunas ao explicar com palavras simples.",
    bestFor: ["resumos", "apresentacao", "conceitos"],
    appFeature: "Eu explico, voce corrige",
    studentAction: "Explique como se ensinasse a um colega."
  },
  mnemonics: {
    id: "mnemonics",
    name: "Mnemonicos",
    evidence: "moderada-para-listas",
    goal: "Ajudar a lembrar sequencias e termos.",
    bestFor: ["listas", "classificacoes", "sequencias"],
    appFeature: "Criar mnemonico",
    studentAction: "Crie uma sigla ou frase, depois explique o significado."
  },
  parodies: {
    id: "parodies",
    name: "Parodias Musicais",
    evidence: "alta-engajamento",
    goal: "Memorizar processos longos atraves do ritmo e rima.",
    bestFor: ["ciclos", "processos", "historia", "biologia"],
    appFeature: "Criar parodia",
    studentAction: "Cante a parodia para fixar o ritmo do conhecimento."
  },
  imageOcclusion: {
    id: "imageOcclusion",
    name: "Imagem com partes ocultas",
    evidence: "aplicacao-de-recuperacao",
    goal: "Treinar memoria visual em diagramas.",
    bestFor: ["ciencias", "geografia", "mapas", "ciclos"],
    appFeature: "Card com imagem escondida",
    studentAction: "Tente lembrar a parte escondida antes de revelar."
  },
  metacognitiveDiary: {
    id: "metacognitiveDiary",
    name: "Diario metacognitivo",
    evidence: "forte-como-autorregulacao",
    goal: "Planejar, monitorar e avaliar o estudo.",
    bestFor: ["todos"],
    appFeature: "Fechar sessao",
    studentAction: "Registre o que aprendeu, onde travou e quando vai revisar."
  },
  pretesting: {
    id: "pretesting",
    name: "Pre-teste",
    evidence: "moderada",
    goal: "Ativar curiosidade e revelar lacunas antes da explicacao.",
    bestFor: ["novo-tema", "diagnostico"],
    appFeature: "Antes de estudar",
    studentAction: "Responda perguntas rapidas antes de ler o resumo."
  },
  discriminativeContrast: {
    id: "discriminativeContrast",
    name: "Comparacao discriminativa",
    evidence: "moderada",
    goal: "Distinguir conceitos parecidos.",
    bestFor: ["ciencias", "gramatica", "matematica", "geografia"],
    appFeature: "Compare conceitos",
    studentAction: "Diga o que e igual, diferente, exemplo e contraexemplo."
  },
  confidenceCalibration: {
    id: "confidenceCalibration",
    name: "Calibracao de confianca",
    evidence: "metacognicao",
    goal: "Comparar certeza do aluno com acerto real para reduzir chute confiante.",
    bestFor: ["provas", "quiz", "simulados", "flashcards"],
    appFeature: "Certeza x acerto",
    studentAction: "Marque sua confianca antes de ver a resposta."
  },
  twoPassExam: {
    id: "twoPassExam",
    name: "Prova em duas passagens",
    evidence: "estrategia-de-prova",
    goal: "Resolver primeiro o que sabe, marcar duvidas e voltar com tempo.",
    bestFor: ["simulados", "provas", "concurso-escolar"],
    appFeature: "Modo Duas Passagens",
    studentAction: "Na primeira rodada, pule travas; na segunda, ataque as marcadas."
  },
  leitnerBoxes: {
    id: "leitnerBoxes",
    name: "Caixas Leitner",
    evidence: "repeticao-espacada",
    goal: "Mover cards entre caixas conforme acertos e erros.",
    bestFor: ["flashcards", "vocabulario", "formulas", "conceitos"],
    appFeature: "Caixas de memoria",
    studentAction: "Cards dificeis voltam mais cedo; cards faceis avancam."
  },
  leechCards: {
    id: "leechCards",
    name: "Cards sanguessuga",
    evidence: "pratica-srs",
    goal: "Identificar cards que o aluno erra muitas vezes e precisam ser reescritos.",
    bestFor: ["flashcards", "caderno-de-erros"],
    appFeature: "Reescrever card dificil",
    studentAction: "Se errar demais, troque o card por pergunta menor e exemplo."
  },
  examBlueprint: {
    id: "examBlueprint",
    name: "Mapa da prova",
    evidence: "planejamento",
    goal: "Organizar estudo por peso, habilidade, dificuldade e frequencia de erro.",
    bestFor: ["prova", "recuperacao", "9o ano"],
    appFeature: "Blueprint de prova",
    studentAction: "Estude primeiro o que vale mais e onde voce erra mais."
  }
});

const PREMIUM_APP_REFERENCES = Object.freeze([
  {
    app: "Quizlet",
    feature: "AI gera flashcards, guias de estudo, modos de estudo e testes.",
    applyAs: "Gerar materiais a partir da busca e permitir editar antes de estudar.",
    url: "https://quizlet.com/features/ai-flashcard-generator"
  },
  {
    app: "Anki",
    feature: "Active recall e repeticao espacada com suporte a midia.",
    applyAs: "Flashcards com imagem, audio futuro e fila diaria de revisao.",
    url: "https://docs.ankiweb.net/background.html"
  },
  {
    app: "RemNote",
    feature: "Flashcards dentro de notas, SRS e image occlusion.",
    applyAs: "Cards criados do resumo e cards visuais com partes ocultas.",
    url: "https://www.remnote.com/feature/spaced-repetition"
  },
  {
    app: "Brainscape",
    feature: "Repeticao baseada em confianca.",
    applyAs: "Aluno avalia confianca 1 a 5 e o app ajusta revisao.",
    url: "https://brainscape.zendesk.com/hc/en-us/articles/13103043051149-How-does-Brainscape-s-spaced-repetition-algorithm-work-i-e-Confidence-Based-Repetition"
  },
  {
    app: "NotebookLM",
    feature: "Respostas e materiais ancorados em fontes com citacoes.",
    applyAs: "Resumo analitico e PDF sempre com fontes e videos.",
    url: "https://google-40.mintlify.app/"
  },
  {
    app: "Microsoft Learning Accelerators",
    feature: "Reading Coach, Search Coach, Math Progress e analytics.",
    applyAs: "Leitura guiada, fonte confiavel, progresso matematico e painel professor.",
    url: "https://www.microsoft.com/en-us/education/learning-tools/learning-accelerators"
  },
  {
    app: "StudyFetch",
    feature: "Material de curso vira plano, flashcards, quizzes e tutor IA.",
    applyAs: "Resultado da busca vira pacote completo de estudo.",
    url: "https://www.studyfetch.com/features/chat"
  },
  {
    app: "Knowt",
    feature: "Notas viram flashcards e quizzes rapidamente.",
    applyAs: "Resumo e PDF viram materiais de pratica.",
    url: "https://knowt.com/ai-notes"
  }
]);

function selecionarTecnicasComprovadas({
  tema,
  disciplina,
  desempenho = 0.6,
  dificuldade = "media",
  objetivo = "aprender",
  diasAteProva = null
} = {}) {
  const area = baseStudy.detectarArea({ tema, disciplina });
  const score = normalizeScore(desempenho);
  const selected = new Set(["retrievalPractice", "spacedPractice", "metacognitiveDiary"]);
  selected.add("confidenceCalibration");

  if (score < 0.55) {
    selected.add("concreteExamples");
    selected.add("workedExamples");
    selected.add("fadedExamples");
    selected.add("selfExplanation");
  }

  if (score >= 0.55 && score < 0.8) {
    selected.add("elaboration");
    selected.add("interleaving");
    selected.add("discriminativeContrast");
  }

  if (score >= 0.8) {
    selected.add("interleaving");
    selected.add("feynman");
    selected.add("pretesting");
  }

  if (["matematica", "fisica", "quimica"].includes(area)) {
    selected.add("workedExamples");
    selected.add("fadedExamples");
    selected.add("selfExplanation");
    selected.add("interleaving");
  }

  if (["ciencias", "fisica", "quimica", "geografia"].includes(area)) {
    selected.add("dualCoding");
    selected.add("imageOcclusion");
  }

  if (String(objetivo).includes("memor") || String(objetivo).includes("prova")) {
    selected.add("mnemonics");
    selected.add("parodies");
    selected.add("leitnerBoxes");
    selected.add("leechCards");
    selected.add("examBlueprint");
    selected.add("twoPassExam");
  }

  if (diasAteProva !== null && Number(diasAteProva) <= 7) {
    selected.add("pretesting");
    selected.add("feynman");
  }

  return {
    tema,
    disciplina,
    area,
    objetivo,
    desempenho: score,
    dificuldade,
    tecnicas: [...selected].map((id) => TECHNIQUE_CATALOG[id]),
    atividades: gerarAtividadesPorTecnica({ tema, disciplina, tecnicas: [...selected] })
  };
}

function gerarAtividadesPorTecnica({ tema, disciplina, tecnicas = [] } = {}) {
  const area = baseStudy.detectarArea({ tema, disciplina });

  return tecnicas.map((id) => {
    const technique = TECHNIQUE_CATALOG[id];
    return {
      techniqueId: id,
      title: technique.appFeature,
      prompt: buildTechniquePrompt(id, tema, disciplina, area),
      evidence: technique.evidence,
      output: expectedOutputForTechnique(id)
    };
  });
}

function buildTechniquePrompt(id, tema, disciplina, area) {
  const subject = disciplina || area || "disciplina";
  const topic = tema || "o tema estudado";
  const prompts = {
    retrievalPractice: `Sem olhar o resumo, escreva 5 coisas que voce lembra sobre ${topic}. Depois confira as lacunas.`,
    spacedPractice: `Agende revisoes de ${topic}: hoje, em 1 dia, 3 dias, 7 dias e 15 dias, ajustando pelos erros.`,
    interleaving: `Misture 6 questoes sobre ${topic} com 4 questoes de temas parecidos de ${subject}.`,
    elaboration: `Responda: por que ${topic} acontece? Como isso se relaciona com o cotidiano?`,
    concreteExamples: `Crie 2 exemplos e 1 contraexemplo de ${topic}, explicando por que cada um serve ou nao serve.`,
    dualCoding: `Transforme ${topic} em tabela, desenho ou mapa mental e explique o visual em voz alta.`,
    workedExamples: `Veja um exemplo resolvido de ${topic} e marque o motivo de cada passo.`,
    fadedExamples: `Resolva ${topic} completando passos que foram apagados aos poucos.`,
    selfExplanation: `A cada passo sobre ${topic}, responda: "por que fiz isso?".`,
    feynman: `Explique ${topic} para um colega do 6o ano usando palavras simples.`,
    mnemonics: `Crie uma sigla, frase ou associacao para lembrar partes importantes de ${topic}.`,
    parodies: `Crie uma parodia musical curta sobre ${topic} usando uma melodia conhecida (ex: 'Brilha Brilha Estrelinha' ou 'Ciranda Cirandinha').`,
    imageOcclusion: `Use uma imagem de ${topic}, esconda partes importantes e tente lembrar antes de revelar.`,
    metacognitiveDiary: `Registre: o que aprendi sobre ${topic}, onde travei e quando vou revisar.`,
    pretesting: `Antes de estudar ${topic}, responda 3 perguntas para descobrir o que voce ja sabe.`,
    discriminativeContrast: `Compare ${topic} com um conceito parecido: igualdades, diferencas, exemplo e contraexemplo.`,
    confidenceCalibration: `Antes de responder sobre ${topic}, marque sua confianca de 1 a 5. Depois compare confianca com acerto.`,
    twoPassExam: `Resolva primeiro as questoes faceis de ${topic}, marque as duvidosas e volte nelas no final.`,
    leitnerBoxes: `Coloque os cards de ${topic} em caixas: errei, dificil, medio, facil e domino.`,
    leechCards: `Encontre cards de ${topic} que voce errou 3 vezes e reescreva em perguntas menores.`,
    examBlueprint: `Monte um mapa de prova de ${topic}: pesos, habilidades, questoes provaveis e erros recorrentes.`
  };
  return prompts[id] || `Estude ${topic} usando ${TECHNIQUE_CATALOG[id]?.name || "uma tecnica ativa"}.`;
}

function expectedOutputForTechnique(id) {
  const outputs = {
    retrievalPractice: "lista de lembrancas + lacunas",
    spacedPractice: "agenda de revisao",
    interleaving: "lista de questoes misturadas",
    elaboration: "respostas como/por que",
    concreteExamples: "exemplos e contraexemplo",
    dualCoding: "esquema visual + explicacao",
    workedExamples: "passos comentados",
    fadedExamples: "passos completados pelo aluno",
    selfExplanation: "justificativas por passo",
    feynman: "explicacao curta avaliada",
    mnemonics: "mnemonico + significado",
    parodies: "parodia musical (ritmo e rima)",
    imageOcclusion: "cards visuais",
    metacognitiveDiary: "registro de sessao",
    pretesting: "respostas diagnosticas",
    discriminativeContrast: "tabela comparativa",
    confidenceCalibration: "grafico certeza x acerto",
    twoPassExam: "fila de questoes marcadas",
    leitnerBoxes: "caixas de revisao",
    leechCards: "cards reescritos",
    examBlueprint: "mapa de prova"
  };
  return outputs[id] || "atividade de estudo";
}

function gerarResumoAnalitico({
  searchResult = {},
  tema,
  disciplina,
  nivel = "6o ano",
  maxTopicos = 8
} = {}) {
  const topic = tema || searchResult.topic || searchResult.titulo || "Tema pesquisado";
  const subject = disciplina || searchResult.subject || searchResult.disciplina || "";
  const summary = String(searchResult.summary || searchResult.resumo || "");
  const keyConcepts = normalizeArray(searchResult.keyConcepts || searchResult.conceitosChave || searchResult.concepts);
  const examples = normalizeArray(searchResult.examples || searchResult.exemplos);
  const commonMistakes = normalizeArray(searchResult.commonMistakes || searchResult.errosComuns);
  const sources = normalizeArray(searchResult.sources || searchResult.fontes);
  const videoSources = normalizeArray(searchResult.videoSources || searchResult.videos);
  const extractedTopics = extractImportantTopics({ summary, keyConcepts, topic, maxTopicos });

  return {
    type: "resumo-analitico",
    topic,
    subject,
    grade: nivel,
    centralIdea: buildCentralIdea(topic, summary),
    mostImportantTopics: extractedTopics.map((item, index) => ({
      priority: index + 1,
      title: item,
      explanation: `Este ponto e importante porque ajuda a entender ${topic} e costuma aparecer em explicacoes, atividades ou provas.`,
      studyAction: `Explique "${item}" com suas palavras e crie um exemplo.`,
      memoryCue: `Palavra-chave: ${firstKeyword(item)}`
    })),
    understandFirst: extractedTopics.slice(0, 4),
    memorizeAfterUnderstanding: keyConcepts.slice(0, 8),
    dailyExamples: examples.length ? examples : [`Crie um exemplo de ${topic} no cotidiano.`],
    commonMistakes: commonMistakes.length ? commonMistakes : [`Decorar ${topic} sem explicar o por que.`],
    likelyExamQuestions: gerarPerguntasProvaveis({ tema: topic, disciplina: subject, conceitos: extractedTopics }),
    activeStudySteps: [
      "Ler a ideia central.",
      "Fechar o texto e recuperar 5 pontos da memoria.",
      "Explicar um topico com suas palavras.",
      "Resolver 3 perguntas.",
      "Criar flashcards dos erros."
    ],
    sources,
    videoSources,
    validation: baseStudy.validarRelatorioComFontes({ sources, videoSources })
  };
}

function extractImportantTopics({ summary, keyConcepts, topic, maxTopicos }) {
  const fromConcepts = keyConcepts.filter(Boolean).map(String);
  const fromSummary = summary
    .split(/[.;:\n]/)
    .map((part) => part.trim())
    .filter((part) => part.length >= 24 && part.length <= 120)
    .slice(0, maxTopicos);
  const fallback = [
    `Definicao de ${topic}`,
    `Como identificar ${topic}`,
    `Exemplos de ${topic}`,
    `Erros comuns em ${topic}`,
    `Como ${topic} aparece em questoes`
  ];
  return dedupe([...fromConcepts, ...fromSummary, ...fallback]).slice(0, maxTopicos);
}

function buildCentralIdea(topic, summary) {
  if (summary && summary.length > 40) {
    return summary.slice(0, 260).replace(/\s+\S*$/, "").trim() + ".";
  }
  return `${topic} e o tema central do estudo. O objetivo e entender o conceito, reconhecer exemplos, evitar erros comuns e praticar com perguntas.`;
}

function gerarPerguntasProvaveis({ tema, disciplina, conceitos = [] } = {}) {
  const area = baseStudy.detectarArea({ tema, disciplina });
  const base = [
    `O que e ${tema}?`,
    `Como reconhecer ${tema} em uma situacao do dia a dia?`,
    `Qual erro comum deve ser evitado ao estudar ${tema}?`
  ];
  if (area === "matematica") {
    base.push(`Resolva um problema envolvendo ${tema} e explique cada passo.`);
  }
  if (["ciencias", "fisica", "quimica"].includes(area)) {
    base.push(`Que evidencia ou exemplo mostra ${tema} acontecendo?`);
  }
  return dedupe([...base, ...conceitos.slice(0, 3).map((concept) => `Explique a importancia de ${concept}.`)]);
}

function planejarPdfIlustrado({
  resumoAnalitico,
  searchResult = {},
  formato = "pdf-estudo",
  incluirExercicios = true,
  incluirGabarito = true,
  imagens = "gerar",
  estiloVisual = "educacional-premium"
} = {}) {
  const analytic = resumoAnalitico || gerarResumoAnalitico({ searchResult });
  const imagePlan = planejarImagensIlustrativas({
    resumoAnalitico: analytic,
    quantidade: formato === "pdf-revisao" ? 3 : 6,
    modo: imagens
  });

  return {
    type: formato,
    title: `${analytic.topic} - Material de estudo`,
    suggestedFileName: slugify(`${analytic.topic}-${analytic.grade}-estudo-ilustrado`) + ".pdf",
    style: {
      visual: estiloVisual,
      pageSize: "A4",
      colorMode: "claro",
      typography: "legivel para 6o ano",
      accessibility: ["texto alternativo em imagens", "contraste adequado", "legendas claras"]
    },
    sections: [
      pdfSection("capa", "Capa", ["tema", "disciplina", "ano", "data"]),
      pdfSection("ideia-central", "Ideia central", [analytic.centralIdea]),
      pdfSection("topicos", "Topicos mais importantes", analytic.mostImportantTopics),
      pdfSection("exemplos", "Exemplos do cotidiano", analytic.dailyExamples),
      pdfSection("erros", "Erros comuns", analytic.commonMistakes),
      pdfSection("memorizacao", "Como estudar e memorizar", analytic.activeStudySteps),
      incluirExercicios ? pdfSection("exercicios", "Exercicios", gerarExerciciosParaPdf(analytic)) : null,
      incluirGabarito ? pdfSection("gabarito", "Gabarito comentado", gerarGabaritoParaPdf(analytic)) : null,
      pdfSection("fontes", "Fontes pesquisadas", analytic.sources),
      pdfSection("videos", "Videos recomendados", analytic.videoSources)
    ].filter(Boolean),
    images: imagePlan,
    saveOptions: criarOpcoesSalvarPdf({ fileName: slugify(`${analytic.topic}-estudo-ilustrado`) + ".pdf" }),
    validation: validarPlanoPdfIlustrado({ analytic, imagePlan })
  };
}

function pdfSection(id, title, content) {
  return { id, title, content };
}

function planejarImagensIlustrativas({ resumoAnalitico, quantidade = 6, modo = "gerar" } = {}) {
  const topic = resumoAnalitico?.topic || "tema estudado";
  const subject = resumoAnalitico?.subject || "";
  const topics = resumoAnalitico?.mostImportantTopics || [];
  const candidates = topics.length ? topics : [{ title: topic }];

  return candidates.slice(0, quantidade).map((item, index) => {
    const title = item.title || String(item);
    return {
      id: `img-${index + 1}`,
      mode: modo,
      title,
      placement: index === 0 ? "apos ideia central" : "junto ao topico relacionado",
      caption: `Imagem ilustrativa para entender: ${title}.`,
      altText: `Ilustracao educacional sobre ${title}, relacionada ao tema ${topic}.`,
      generationPrompt: criarPromptImagemEducacional({ topic, title, subject }),
      copyrightPolicy: "usar imagem gerada pelo app ou fonte com licenca adequada; manter creditos quando houver fonte externa"
    };
  });
}

function criarPromptImagemEducacional({ topic, title, subject } = {}) {
  return [
    `Ilustracao educacional clara para aluno do 6o ano sobre "${title}" dentro do tema "${topic}".`,
    subject ? `Disciplina: ${subject}.` : "",
    "Estilo didatico, colorido com moderacao, sem personagens famosos, sem marcas, sem texto pequeno.",
    "Deve ajudar a entender o conceito, com formas simples, setas ou elementos visuais limpos.",
    "Adequado para criancas, fundo claro, alta legibilidade."
  ].filter(Boolean).join(" ");
}

function gerarExerciciosParaPdf(analytic) {
  return [
    ...analytic.likelyExamQuestions.slice(0, 5).map((question, index) => ({
      id: `ex-${index + 1}`,
      type: index % 2 === 0 ? "resposta-curta" : "multipla-escolha",
      prompt: question,
      skill: analytic.bnccSkillCodes || []
    })),
    {
      id: "ex-autoexplicacao",
      type: "autoexplicacao",
      prompt: `Explique ${analytic.topic} com suas palavras e de um exemplo.`
    }
  ];
}

function gerarGabaritoParaPdf(analytic) {
  return analytic.likelyExamQuestions.slice(0, 5).map((question, index) => ({
    exerciseId: `ex-${index + 1}`,
    expectedAnswer: `Resposta esperada: demonstrar compreensao de ${analytic.topic}, usando conceito correto, exemplo e justificativa.`,
    explanation: `O aluno deve explicar o raciocinio, nao apenas decorar uma frase.`
  }));
}

function criarOpcoesSalvarPdf({ fileName = "estudo.pdf" } = {}) {
  return {
    suggestedName: fileName,
    browserStrategies: [
      {
        id: "file-system-access",
        name: "Salvar com seletor de arquivo",
        requirement: "HTTPS e navegador com showSaveFilePicker",
        bestFor: "desktop moderno"
      },
      {
        id: "blob-download",
        name: "Download por Blob",
        requirement: "navegador comum",
        bestFor: "fallback universal"
      },
      {
        id: "web-share",
        name: "Compartilhar arquivo",
        requirement: "navigator.share com suporte a arquivos",
        bestFor: "mobile/PWA"
      }
    ],
    mimeType: "application/pdf"
  };
}

async function salvarPdfNoDispositivo(pdfBlob, { fileName = "estudo.pdf" } = {}) {
  if (!pdfBlob) {
    throw new Error("PDF Blob obrigatorio.");
  }

  if (typeof window !== "undefined" && typeof window.showSaveFilePicker === "function") {
    const handle = await window.showSaveFilePicker({
      suggestedName: fileName,
      types: [
        {
          description: "PDF",
          accept: { "application/pdf": [".pdf"] }
        }
      ]
    });
    const writable = await handle.createWritable();
    await writable.write(pdfBlob);
    await writable.close();
    return { method: "file-system-access", saved: true };
  }

  if (typeof navigator !== "undefined" && typeof navigator.canShare === "function" && typeof File !== "undefined") {
    const file = new File([pdfBlob], fileName, { type: "application/pdf" });
    if (navigator.canShare({ files: [file] })) {
      await navigator.share({ files: [file], title: fileName });
      return { method: "web-share", saved: true };
    }
  }

  if (typeof document !== "undefined" && typeof URL !== "undefined" && typeof URL.createObjectURL === "function") {
    const url = URL.createObjectURL(pdfBlob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = fileName;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
    return { method: "blob-download", saved: true };
  }

  return {
    method: "unsupported-runtime",
    saved: false,
    reason: "Ambiente sem APIs de salvamento do navegador."
  };
}

function validarPlanoPdfIlustrado({ analytic, imagePlan = [] } = {}) {
  const issues = [];
  if (!analytic?.sources?.length) issues.push("PDF precisa de fontes textuais/curriculares.");
  if (!analytic?.videoSources?.length) issues.push("PDF precisa de videos recomendados ou justificativa.");
  if (!imagePlan.length) issues.push("PDF ilustrado precisa de pelo menos uma imagem/diagrama.");
  if (imagePlan.some((image) => !image.altText)) issues.push("Toda imagem precisa de texto alternativo.");
  return {
    valid: issues.length === 0,
    issues
  };
}

function gerarCardsImageOcclusion({ imagem, labels = [], tema = "" } = {}) {
  return labels.map((label, index) => ({
    id: `ioc-${index + 1}`,
    type: "image-occlusion",
    tema,
    image: imagem,
    hiddenRegion: label.region || { x: 0, y: 0, width: 20, height: 10 },
    front: `Que parte da imagem esta escondida?`,
    back: label.answer || label.name || `Parte ${index + 1}`,
    hint: label.hint || `Pense no papel dessa parte em ${tema}.`,
    altText: label.altText || `Imagem com regiao oculta para estudar ${tema}.`
  }));
}

function criarModoRecuperarDaMemoria({ resumoAnalitico, minutos = 5 } = {}) {
  const topic = resumoAnalitico?.topic || "tema estudado";
  const keyPoints = resumoAnalitico?.mostImportantTopics?.map((item) => item.title) || [];
  return {
    mode: "recuperar-da-memoria",
    title: `Tente lembrar: ${topic}`,
    instructions: [
      "Nao olhe o resumo agora.",
      `Use ${minutos} minutos para escrever tudo que lembrar.`,
      "Depois compare com os pontos essenciais.",
      "Marque lacunas e gere flashcards."
    ],
    checklist: keyPoints,
    scoring: {
      remembered: "quantos pontos essenciais apareceram",
      gaps: "quais pontos faltaram",
      nextAction: "revisar lacunas e agendar repeticao"
    }
  };
}

function criarModoFeynman({ resumoAnalitico } = {}) {
  const topic = resumoAnalitico?.topic || "tema estudado";
  return {
    mode: "feynman",
    title: `Explique ${topic} com suas palavras`,
    prompt: `Explique ${topic} para um colega do 6o ano sem copiar o resumo.`,
    rubric: [
      { id: "clareza", points: 3, description: "Usou palavras simples e organizadas." },
      { id: "conceito", points: 4, description: "Explicou o conceito corretamente." },
      { id: "exemplo", points: 2, description: "Incluiu exemplo concreto." },
      { id: "lacunas", points: 1, description: "Reconheceu o que ainda nao sabe." }
    ],
    tutorFollowUp: [
      "Qual parte da sua explicacao foi mais dificil?",
      "Que exemplo voce poderia acrescentar?",
      "Consegue explicar de um jeito ainda mais simples?"
    ]
  };
}

function criarDiarioMetacognitivo({ tema, desempenho = null } = {}) {
  return {
    type: "diario-metacognitivo",
    tema,
    desempenho,
    prompts: [
      "O que eu aprendi hoje?",
      "Onde eu travei?",
      "Que erro quero evitar na proxima vez?",
      "Qual tecnica de estudo funcionou melhor?",
      "Quando vou revisar?"
    ],
    saveAs: "study_session_reflection",
    nextActionRule: desempenho !== null && normalizeScore(desempenho) < 0.6
      ? "gerar revisao guiada e cards de erro"
      : "agendar revisao espacada"
  };
}

function criarModoVesperaDeProva({ tema, disciplina, horasDisponiveis = 2, pontosFracos = [] } = {}) {
  const blocks = [
    { id: "recuperacao", minutes: 15, action: "Tentar lembrar pontos principais sem olhar." },
    { id: "cards-fracos", minutes: 25, action: "Revisar flashcards com menor confianca." },
    { id: "erros", minutes: 20, action: "Rever caderno de erros." },
    { id: "simulado-curto", minutes: 25, action: "Fazer simulado curto com feedback." },
    { id: "resumo-final", minutes: 15, action: "Ler resumo analitico e fontes principais." },
    { id: "descanso", minutes: 10, action: "Pausa para evitar sobrecarga." }
  ];

  return {
    mode: "vespera-de-prova",
    tema,
    disciplina,
    horasDisponiveis,
    warning: "Na vespera, priorizar revisao e erros. Evitar estudar muitos temas novos.",
    focus: pontosFracos.length ? pontosFracos : ["cards fracos", "erros recorrentes", "perguntas provaveis"],
    blocks: fitBlocksToTime(blocks, horasDisponiveis * 60)
  };
}

function orientarFonteConfiavel({ source = {} } = {}) {
  const reliability = premiumStudy.avaliarConfiabilidadeFonte(source);
  const questions = [
    "Quem publicou essa fonte?",
    "A fonte e oficial, educacional ou opinativa?",
    "Existe data ou autoria clara?",
    "Ela combina com outras fontes confiaveis?",
    "Ela e adequada para o 6o ano?"
  ];
  return {
    source,
    reliability,
    studentQuestions: questions,
    appLabel: reliability.level === "alta"
      ? "Alta confianca"
      : reliability.level === "media"
        ? "Media confianca"
        : "Revisar com professor"
  };
}











function gerarPacoteCompletoAposBusca({
  searchResult,
  tema,
  disciplina,
  anoEscolar = "6º ano",
  desempenho = 0.6,
  diasAteProva = null
} = {}) {
  const resumoAnalitico = gerarResumoAnalitico({ searchResult, tema, disciplina });
  const tecnicas = selecionarTecnicasComprovadas({
    tema: resumoAnalitico.topic,
    disciplina: resumoAnalitico.subject,
    desempenho,
    diasAteProva
  });
  const pdf = planejarPdfIlustrado({ resumoAnalitico });
  const recuperar = criarModoRecuperarDaMemoria({ resumoAnalitico });
  const feynman = criarModoFeynman({ resumoAnalitico });
  const diario = criarDiarioMetacognitivo({ tema: resumoAnalitico.topic, desempenho });
  const vespera = diasAteProva !== null && Number(diasAteProva) <= 7
    ? criarModoVesperaDeProva({ tema: resumoAnalitico.topic, disciplina: resumoAnalitico.subject })
    : null;
  const modoTurbo = criarPlanoTurboAprendizagem({ 
    tema: resumoAnalitico.topic, 
    disciplina: resumoAnalitico.subject, 
    anoEscolar 
  });
  const multimodal = premiumStudy.gerarEstudoMultimodal({
    tema: resumoAnalitico.topic,
    disciplina: resumoAnalitico.subject,
    conceitos: resumoAnalitico.understandFirst
  });

  return {
    topic: resumoAnalitico.topic,
    subject: resumoAnalitico.subject,
    anoEscolar,
    resumoAnalitico,
    tecnicas,
    pdfIlustrado: pdf,
    modos: {
      recuperarDaMemoria: recuperar,
      feynman,
      diarioMetacognitivo: diario,
      vesperaDeProva: vespera,
      modoTurbo
    },
    multimodal,
    sourceCoach: [
      ...resumoAnalitico.sources,
      ...resumoAnalitico.videoSources
    ].map((source) => orientarFonteConfiavel({ source })),
    nextUiActions: [
      "Exibir Resumo Analitico",
      "Gerar PDF Ilustrado",
      "Criar Flashcards",
      "Estudar Ativamente",
      "Fazer Quiz",
      "Abrir Professor IA"
    ]
  };
}

const GRADE_RANGE_CONFIG = Object.freeze({
  "6º ano": {
    foco: "fundamentos e transicao para anos finais",
    linguagem: "mais concreta, com exemplos do cotidiano",
    avaliacao: "questoes curtas, exemplos guiados e recuperacao ativa",
    risco: "sobrecarga de texto longo"
  },
  "7º ano": {
    foco: "consolidacao, comparacao de conceitos e autonomia crescente",
    linguagem: "explicacoes com mais relacoes entre temas",
    avaliacao: "questoes mistas, tabelas, mapas e justificativas",
    risco: "confundir conceitos parecidos"
  },
  "8º ano": {
    foco: "abstracao, interpretacao e problemas com mais etapas",
    linguagem: "maior uso de modelos, graficos e fontes",
    avaliacao: "simulados, resolucao por estrategias e analise de erro",
    risco: "decorar sem saber aplicar"
  },
  "9º ano": {
    foco: "preparacao para ensino medio, provas e autonomia",
    linguagem: "mais objetiva, com treino estilo prova",
    avaliacao: "simulados, tempo, caderno de erros e revisao cumulativa",
    risco: "ansiedade de prova e excesso de conteudo novo"
  },
  "1º ano EM": {
    foco: "transicao para ensino medio, base conceitual forte e organizacao por area",
    linguagem: "explicacoes conceituais com exemplos, graficos e exercicios progressivos",
    avaliacao: "questoes por competencia, listas por topico e revisao acumulada",
    risco: "lacunas do fundamental virarem bloqueio"
  },
  "2º ano EM": {
    foco: "aprofundamento, conexoes entre disciplinas e aplicacao em problemas",
    linguagem: "modelos, demonstracoes guiadas e leitura de dados",
    avaliacao: "questoes intercaladas, simulados parciais e caderno de erros por habilidade",
    risco: "acumulo de conteudo sem revisao espacada"
  },
  "3º ano EM": {
    foco: "consolidacao, simulados, redacao, revisao estrategica e gestao de prova",
    linguagem: "objetiva, orientada a lacunas, tempo e estrategia",
    avaliacao: "simulados cronometrados, TRI/competencias quando aplicavel e revisao retrospectiva",
    risco: "ansiedade, excesso de materiais e pouca correcao ativa"
  },
  "ENEM": {
    foco: "competencias, habilidades, interpretacao, TRI, atualidades e redacao",
    linguagem: "contextualizada, interdisciplinar e orientada a prova",
    avaliacao: "simulados por area, analise de distratores e plano por lacunas",
    risco: "estudar conteudo sem treinar leitura e estrategia"
  },
  "ITA/IME": {
    foco: "alto rendimento em matematica, fisica e quimica",
    linguagem: "rigorosa, progressiva e com demonstracao quando necessario",
    avaliacao: "listas dificeis, questoes autorais, tempo, revisao de erros e aprofundamento",
    risco: "pular fundamentos ou acumular lacunas em pre-requisitos"
  },
  "Pré-militar fundamental": {
    foco: "base forte, disciplina, portugues, matematica, ciencias, historia e geografia",
    linguagem: "direta, com treino de prova e revisao por erro",
    avaliacao: "simulados, questoes objetivas e controle de tempo",
    risco: "decoreba sem entender procedimento"
  },
  "Pré-militar médio": {
    foco: "matematica, portugues, fisica, quimica, ingles, redacao e simulados",
    linguagem: "objetiva, com estrategias de prova e exemplos graduais",
    avaliacao: "simulados cronometrados, questoes por edital e revisao pesada de erros",
    risco: "treinar so conteudo e negligenciar tempo"
  },
  "Concursos nível fundamental": {
    foco: "portugues, matematica, raciocinio logico, informatica e conhecimentos gerais",
    linguagem: "clara, objetiva e orientada a edital",
    avaliacao: "questoes de banca, revisao por assunto e simulados curtos",
    risco: "nao revisar erros recorrentes"
  },
  "Concursos nível médio": {
    foco: "base comum, raciocinio logico, informatica, atualidades e especificas por edital",
    linguagem: "objetiva, com bizus validados e treino de banca",
    avaliacao: "simulados, controle de tempo e ranking de lacunas",
    risco: "estudar sem priorizar edital e frequencia de cobranca"
  }
});

const TURBO_METHODS = Object.freeze([
  {
    id: "blank-page",
    nome: "Folha em branco",
    comoFunciona: "O aluno tenta escrever tudo que lembra antes de consultar o material.",
    noApp: "Botao Recuperar da Memoria com comparacao automatica de lacunas."
  },
  {
    id: "cornell",
    nome: "Notas Cornell",
    comoFunciona: "Divide anotacao em ideias, perguntas-chave e resumo final.",
    noApp: "Gerador de ficha Cornell a partir do resumo analitico."
  },
  {
    id: "sq3r",
    nome: "SQ3R",
    comoFunciona: "Survey, Question, Read, Recite, Review: olhar, perguntar, ler, recitar e revisar.",
    noApp: "Modo leitura guiada para textos longos."
  },
  {
    id: "exam-wrapper",
    nome: "Exam wrapper",
    comoFunciona: "Depois da prova, o aluno analisa preparacao, erros e novo plano.",
    noApp: "Tela pos-simulado com reflexao e plano de correcao."
  },
  {
    id: "questoes-primeiro",
    nome: "Questoes primeiro",
    comoFunciona: "Antes de reler teoria, o aluno tenta questoes para revelar lacunas.",
    noApp: "Pre-teste antes do resumo e simulado curto antes da revisao."
  },
  {
    id: "macete-validado",
    nome: "Bizu validado",
    comoFunciona: "Cria macete, mas exige explicacao do conceito para evitar decoreba.",
    noApp: "Card Macete + Cuidado + Exemplo + Contraexemplo."
  },
  {
    id: "retrospective-timetable",
    nome: "Agenda retrospectiva",
    comoFunciona: "A revisao prioriza o que esta fraco, nao uma lista fixa de capitulos.",
    noApp: "Dashboard ordena conteudos por dominio, prazo e erros."
  },
  {
    id: "prova-cronometrada",
    nome: "Simulado cronometrado",
    comoFunciona: "Treina conteudo e gestao de tempo.",
    noApp: "Modo Prova com timer, revisao de erro e relatorio."
  }
]);

const PREMIUM_TURBO_FEATURES = Object.freeze([
  {
    id: "fonte-ancorada",
    nome: "Caderno ancorado em fontes",
    inspiradoEm: "NotebookLM / Quizlet Study Guide",
    valor: "Todo resumo, quiz, PDF e resposta do tutor nasce das fontes salvas.",
    noApp: "Aba Fontes mostra origem, confianca, videos e o que cada fonte ajudou a explicar."
  },
  {
    id: "fsrs-lite",
    nome: "Revisao inteligente tipo FSRS",
    inspiradoEm: "Anki / RemNote",
    valor: "O app estima dificuldade, estabilidade e esquecimento de cada card.",
    noApp: "Fila diaria prioriza cards vencidos, fracos e proximos da prova."
  },
  {
    id: "confidence-based",
    nome: "Repeticao por confianca",
    inspiradoEm: "Brainscape",
    valor: "O aluno informa o quanto tem certeza, nao apenas se acertou.",
    noApp: "Cards com confianca baixa voltam antes, mesmo quando a resposta foi correta."
  },
  {
    id: "image-occlusion",
    nome: "Imagem com partes escondidas",
    inspiradoEm: "RemNote / Anki",
    valor: "Excelente para mapas, ciencias, geografia, formulas e diagramas.",
    noApp: "PDF ilustrado e flashcards visuais escondem partes para recuperar da memoria."
  },
  {
    id: "questao-adaptativa",
    nome: "Banco adaptativo de questoes",
    inspiradoEm: "Quizlet Practice Tests",
    valor: "Questao muda por ano, habilidade, erro e nivel de dominio.",
    noApp: "Simulado escolhe proxima questao pelo padrao de erro do aluno."
  },
  {
    id: "coach-prova",
    nome: "Coach de prova em tempo real",
    inspiradoEm: "estrategias de simulados/concurso",
    valor: "Ensina o aluno a pular, marcar, voltar, conferir unidade e controlar tempo.",
    noApp: "Modo Duas Passagens com timer, marcacoes e alerta de pressa."
  }
]);

const BIZU_LIBRARY = Object.freeze({
  matematica: [
    "Dado, pedido, plano, conta, confere.",
    "Se tem porcentagem, pergunte: porcentagem de que?",
    "Equacao: fez de um lado, faz do outro.",
    "Problema grande vira desenho, tabela ou linha do tempo.",
    "Resultado sem unidade ainda nao terminou."
  ],
  ciencias: [
    "Observe primeiro, conclua depois.",
    "Classifique usando evidencia, nao aparencia.",
    "Causa, processo, consequencia.",
    "Sistema tem partes que se relacionam.",
    "Experimento bom compara uma coisa por vez."
  ],
  fisica: [
    "Grandeza, unidade, formula, substitui, interpreta.",
    "Antes da conta, desenhe a situacao.",
    "Unidade errada denuncia raciocinio torto.",
    "Velocidade liga distancia e tempo.",
    "Forca muda movimento ou forma."
  ],
  quimica: [
    "Substancia, mistura ou transformacao?",
    "Mudou estado nao significa que mudou substancia.",
    "Evidencia quimica: gas, cor, energia, precipitado ou nova substancia.",
    "Separacao depende de propriedade fisica.",
    "Modelo ajuda, mas precisa bater com evidencia."
  ],
  portugues: [
    "Leia a pergunta antes do texto.",
    "Procure comando: explique, compare, identifique, justifique.",
    "Resposta boa usa trecho + explicacao.",
    "Palavra fora do contexto pode enganar.",
    "Tema e assunto nao sao sempre a mesma coisa."
  ],
  historia: [
    "Contexto, causa, acontecimento, consequencia.",
    "Quem ganha, quem perde, quem conta a historia?",
    "Data ajuda, mas relacao explica.",
    "Fonte historica precisa de autoria e contexto.",
    "Nao julgue o passado sem entender a epoca."
  ],
  geografia: [
    "Onde fica, por que ali, quem e afetado?",
    "Mapa tem titulo, legenda, escala e orientacao.",
    "Paisagem mostra natureza e sociedade juntas.",
    "Clima e padrao; tempo e momento.",
    "Problema ambiental tem causa, impacto e solucao."
  ],
  geral: [
    "Entender antes de decorar.",
    "Questao errada vira card e nova tentativa.",
    "Se nao consegue explicar, ainda nao dominou.",
    "Releitura so depois de tentar lembrar.",
    "Pouco todo dia vence muito de uma vez."
  ]
});

function normalizarAnoAnosFinais(value = "6º ano") {
  const text = String(value || "").toLowerCase();
  if (text.includes("ita") || text.includes("ime")) return "ITA/IME";
  if (text.includes("enem")) return "ENEM";
  if (text.includes("militar") && (text.includes("medio") || text.includes("médio") || text.includes("em"))) return "Pré-militar médio";
  if (text.includes("militar")) return "Pré-militar fundamental";
  if (text.includes("concurso") && (text.includes("medio") || text.includes("médio") || text.includes("em"))) return "Concursos nível médio";
  if (text.includes("concurso")) return "Concursos nível fundamental";
  if (text.includes("3") && (text.includes("em") || text.includes("medio") || text.includes("médio"))) return "3º ano EM";
  if (text.includes("2") && (text.includes("em") || text.includes("medio") || text.includes("médio"))) return "2º ano EM";
  if (text.includes("1") && (text.includes("em") || text.includes("medio") || text.includes("médio"))) return "1º ano EM";
  if (text.includes("9")) return "9º ano";
  if (text.includes("8")) return "8º ano";
  if (text.includes("7")) return "7º ano";
  return "6º ano";
}

function criarConfiguracaoAnosFinais({ anoEscolar = "6º ano", disciplina = "geral" } = {}) {
  const ano = normalizarAnoAnosFinais(anoEscolar);
  const config = GRADE_RANGE_CONFIG[ano] || GRADE_RANGE_CONFIG["6º ano"];
  return {
    anoEscolar: ano,
    disciplina,
    faixa: "6º ano ao Ensino Medio, ENEM e preparatorios",
    ...config,
    recursosObrigatorios: [
      "resumo analitico",
      "estudo ativo",
      "flashcards",
      "revisao espacada",
      "quiz",
      "caderno de erros",
      "fontes",
      ["9º ano", "1º ano EM", "2º ano EM", "3º ano EM", "ENEM", "ITA/IME"].includes(ano) ? "simulado cronometrado" : "exemplos guiados"
    ]
  };
}

function gerarBizusEMacetes({ tema, disciplina, anoEscolar = "6º ano", conceitos = [] } = {}) {
  const area = baseStudy.detectarArea({ tema, disciplina });
  const base = conceitos.length ? conceitos : [tema || "tema estudado"];
  return base.slice(0, 5).map((conceito, index) => ({
    id: `bizu-${index + 1}`,
    conceito,
    macete: criarMacete(conceito, area),
    cuidado: "Macete ajuda a lembrar, mas o app sempre pede explicacao e exemplo para confirmar entendimento.",
    treino: `Explique ${conceito} sem usar o macete. Depois crie um exemplo.`,
    anoEscolar
  }));
}

function criarMacete(conceito, area) {
  const text = String(conceito || "conceito");
  if (area === "matematica") return `Dado, pedido, plano, conta, confere: use esse roteiro antes de calcular ${text}.`;
  if (area === "ciencias" || area === "fisica" || area === "quimica") return `Observe, compare, explique: nao classifique ${text} sem uma evidencia.`;
  if (area === "historia") return `Causa, acontecimento, consequencia: organize ${text} nessa ordem.`;
  if (area === "geografia") return `Onde, por que ali, quem afeta: leia ${text} pelo espaco e pelas pessoas.`;
  return `Ideia, exemplo, erro: para lembrar ${text}, explique os tres.`;
}

function criarSprintConcursoEscolar({ tema, anoEscolar = "6º ano", minutos = 50 } = {}) {
  const base = [
    { id: "teoria-minima", titulo: "Teoria minima", minutos: 8, acao: `Ler a ideia central de ${tema}.` },
    { id: "folha-branco", titulo: "Folha em branco", minutos: 7, acao: "Escrever o que lembra sem olhar." },
    { id: "questoes", titulo: "Questoes primeiro", minutos: 15, acao: "Resolver questoes misturadas." },
    { id: "erros", titulo: "Caderno de erros", minutos: 10, acao: "Classificar erros e criar cards." },
    { id: "macete", titulo: "Macete validado", minutos: 5, acao: "Criar um bizu e provar com exemplo." },
    { id: "revisao", titulo: "Revisao final", minutos: 5, acao: "Agendar proxima revisao." }
  ];
  return fitBlocksToTime(base, minutos).map((block) => ({ ...block, anoEscolar }));
}

function criarConfiguracoesPremiumEstudo({ anoEscolar = "6º ano", disciplina = "geral" } = {}) {
  const ano = normalizarAnoAnosFinais(anoEscolar);
  const isExamTrack = /enem|ita|ime|militar|concurso|em/i.test(ano);
  return [
    { id: "nivel", nome: "Nivel escolar", valor: ano },
    { id: "modo-ia", nome: "Professor IA", valor: isExamTrack ? "socratico + estrategia de prova" : "socratico guiado" },
    { id: "fontes", nome: "Fontes", valor: "obrigatorias, com selo de confianca" },
    { id: "revisao", nome: "Revisao", valor: "espacada + cards fracos primeiro" },
    { id: "questoes", nome: "Questoes", valor: isExamTrack ? "cronometradas, cumulativas e por edital/competencia" : "progressivas e guiadas" },
    { id: "macetes", nome: "Bizus", valor: "permitidos, mas sempre validados por explicacao" },
    { id: "disciplina", nome: "Disciplina", valor: disciplina || "geral" }
  ];
}

function criarCadernoCornell({ tema, resumo = "", perguntas = [] } = {}) {
  return {
    tema,
    colunas: {
      pistas: perguntas.length ? perguntas : [`O que e ${tema}?`, `Como explicar ${tema}?`, `Onde eu posso errar?`],
      anotacoes: resumo ? [resumo] : [`Anote as ideias principais de ${tema}.`],
      resumoFinal: `Explique ${tema} em 3 frases, sem copiar.`
    },
    rotina: ["registrar", "reduzir em pistas", "recitar sem olhar", "refletir", "revisar"]
  };
}

function criarRoteiroSQ3R({ tema } = {}) {
  return {
    tema,
    passos: [
      { id: "survey", titulo: "Sobrevoar", acao: "Olhe titulos, imagens e palavras-chave antes de ler." },
      { id: "question", titulo: "Perguntar", acao: `Crie perguntas sobre ${tema}.` },
      { id: "read", titulo: "Ler", acao: "Leia procurando respostas." },
      { id: "recite", titulo: "Recitar", acao: "Feche o texto e responda com suas palavras." },
      { id: "review", titulo: "Revisar", acao: "Revise lacunas e transforme erros em flashcards." }
    ]
  };
}

function criarExamWrapper({ tema, notaEsperada = null, notaObtida = null } = {}) {
  return {
    tema,
    notaEsperada,
    notaObtida,
    perguntas: [
      "Quantos dias antes comecei a estudar?",
      "Usei recuperacao ativa ou so reli?",
      "Quais erros foram de conceito, leitura, procedimento ou pressa?",
      "Qual tecnica funcionou melhor?",
      "O que vou mudar para a proxima prova?"
    ],
    saida: "novo plano de estudo + cards de erro + simulado curto"
  };
}

function criarRecursosPremiumTurbo({ tema, disciplina, anoEscolar = "6º ano" } = {}) {
  const area = baseStudy.detectarArea({ tema, disciplina });
  const ano = normalizarAnoAnosFinais(anoEscolar);
  return PREMIUM_TURBO_FEATURES.map((feature) => ({
    ...feature,
    tema,
    disciplina: area,
    anoEscolar: ano,
    primeiroPasso: primeiroPassoRecursoPremium(feature.id, tema, area)
  }));
}

function primeiroPassoRecursoPremium(id, tema, area) {
  const topic = tema || "tema estudado";
  const passos = {
    "fonte-ancorada": `Abrir Fontes e confirmar quais materiais sustentam ${topic}.`,
    "fsrs-lite": `Criar 8 cards de ${topic} e definir confianca inicial.`,
    "confidence-based": `Responder 5 perguntas de ${topic} marcando certeza de 1 a 5.`,
    "image-occlusion": ["ciencias", "geografia", "fisica", "quimica"].includes(area)
      ? `Escolher uma imagem ou diagrama de ${topic} e esconder partes.`
      : `Criar um esquema visual de ${topic} e esconder palavras-chave.`,
    "questao-adaptativa": `Fazer um pre-teste curto de ${topic} para calibrar dificuldade.`,
    "coach-prova": `Ativar timer e resolver primeiro as questoes faceis de ${topic}.`
  };
  return passos[id] || `Estudar ${topic} com esse recurso.`;
}

function criarBizusPorDisciplina({ disciplina, tema, anoEscolar = "6º ano" } = {}) {
  const area = baseStudy.detectarArea({ tema, disciplina });
  const bizus = BIZU_LIBRARY[area] || BIZU_LIBRARY.geral;
  return bizus.map((bizu, index) => ({
    id: `${area}-bizu-${index + 1}`,
    disciplina: area,
    anoEscolar,
    bizu,
    validacao: "Explique por que o bizu funciona e resolva um exemplo sem olhar.",
    quandoUsar: definirQuandoUsarBizu(area, index)
  }));
}

function definirQuandoUsarBizu(area, index) {
  const fallback = [
    "quando estiver travado no inicio da questao",
    "ao revisar antes do quiz",
    "depois de errar uma questao parecida",
    "na checagem final",
    "quando precisar explicar para outra pessoa"
  ];
  const porArea = {
    matematica: ["antes de montar a conta", "em porcentagem", "em equacoes", "em problemas longos", "antes de entregar"],
    ciencias: ["antes de concluir", "em classificacoes", "em processos", "em sistemas", "em experimentos"],
    portugues: ["antes de responder", "ao interpretar comando", "em resposta discursiva", "em vocabulario", "ao diferenciar tema e assunto"],
    geografia: ["ao ler mapa", "ao localizar fenomeno", "em paisagem", "em clima e tempo", "em impactos ambientais"],
    historia: ["ao organizar fatos", "ao analisar grupos sociais", "em linha do tempo", "ao ler fonte historica", "ao comparar epocas"]
  };
  return (porArea[area] || fallback)[index] || fallback[index % fallback.length];
}

function criarConfiguracaoMemoriaPremium({ desempenho = 0.6, diasAteProva = null, intensidade = "normal" } = {}) {
  const score = normalizeScore(desempenho);
  const provaPerto = diasAteProva !== null && Number(diasAteProva) <= 7;
  return {
    scheduler: "fsrs-lite + confidence-based",
    retencaoAlvo: provaPerto ? 0.9 : 0.85,
    novosCardsPorDia: intensidade === "turbo" ? 18 : score < 0.55 ? 8 : 12,
    reviewsMaximosPorDia: intensidade === "turbo" ? 80 : 45,
    regras: [
      "card errado volta cedo",
      "card correto com baixa confianca volta antes",
      "card errado 3 vezes vira card sanguessuga e deve ser reescrito",
      "antes da prova, revisar cards fracos e erros primeiro",
      "nao criar muitos cards novos se as revisoes atrasarem"
    ],
    intervalosBaseDias: provaPerto ? [0, 1, 2, 4, 7] : [0, 1, 3, 7, 15, 30],
    sinaisDeAlerta: [
      "muitos cards vencidos",
      "confianca alta com erro",
      "tempo alto por questao",
      "erros repetidos do mesmo tipo"
    ]
  };
}

function criarTreinoDuasPassagens({ tema, minutos = 30, totalQuestoes = 10 } = {}) {
  return {
    mode: "duas-passagens",
    tema,
    minutos,
    totalQuestoes,
    primeiraPassagem: {
      tempo: Math.round(minutos * 0.6),
      regra: "resolver faceis e medias; marcar duvidosas; pular travas",
      marcacoes: ["sei", "duvida", "pular", "conferir unidade", "rever enunciado"]
    },
    segundaPassagem: {
      tempo: Math.round(minutos * 0.35),
      regra: "voltar nas marcadas, eliminar alternativas e justificar",
      fechamento: "conferir respostas que tiveram baixa confianca"
    },
    posTreino: "questoes erradas viram caderno de erros, flashcard e pergunta parecida"
  };
}

function criarCoachDeConfianca({ tema, tentativas = [] } = {}) {
  const total = tentativas.length || 1;
  const superconfianteErrado = tentativas.filter((item) => item.confidence >= 4 && item.isCorrect === false).length;
  const inseguroCorreto = tentativas.filter((item) => item.confidence <= 2 && item.isCorrect === true).length;
  return {
    tema,
    metricas: {
      superconfianteErrado,
      inseguroCorreto,
      calibracao: Number(((total - superconfianteErrado - inseguroCorreto) / total).toFixed(2))
    },
    feedback: [
      "Se errou com muita confianca, releia o conceito e crie contraexemplo.",
      "Se acertou sem confianca, faca mais 2 questoes parecidas para consolidar.",
      "Antes de ver o gabarito, sempre marque certeza de 1 a 5."
    ]
  };
}

function criarPlanoTurboAprendizagem({
  tema,
  disciplina,
  anoEscolar = "6º ano",
  desempenho = 0.6,
  minutos = 50
} = {}) {
  const configAno = criarConfiguracaoAnosFinais({ anoEscolar, disciplina });
  const tecnicas = selecionarTecnicasComprovadas({ tema, disciplina, desempenho, objetivo: "prova e memorizacao" });
  const conceitos = tecnicas.tecnicas.map((item) => item.name).slice(0, 5);
  const memoriaPremium = criarConfiguracaoMemoriaPremium({ desempenho, intensidade: "turbo" });
  return {
    tema,
    disciplina,
    anoEscolar: configAno.anoEscolar,
    configuracaoAno: configAno,
    metodos: TURBO_METHODS,
    recursosPremium: criarRecursosPremiumTurbo({ tema, disciplina, anoEscolar }),
    configuracoes: criarConfiguracoesPremiumEstudo({ anoEscolar, disciplina }),
    bizusEMacetes: gerarBizusEMacetes({ tema, disciplina, anoEscolar, conceitos }),
    bizusPorDisciplina: criarBizusPorDisciplina({ tema, disciplina, anoEscolar }),
    sprintConcurso: criarSprintConcursoEscolar({ tema, anoEscolar, minutos }),
    memoriaPremium,
    treinoDuasPassagens: criarTreinoDuasPassagens({ tema, minutos: Math.min(minutos, 45), totalQuestoes: 10 }),
    coachConfianca: criarCoachDeConfianca({ tema }),
    cornell: criarCadernoCornell({ tema }),
    sq3r: criarRoteiroSQ3R({ tema }),
    examWrapper: criarExamWrapper({ tema }),
    recomendacao: "Use teoria minima, questoes primeiro, caderno de erros e revisao espacada. Macetes entram como apoio, nunca como substituto do entendimento."
  };
}

function criarEspecificacaoUiNovasFuncoes() {
  return {
    studyPageButtons: [
      { id: "analytical-summary", label: "Resumo analitico", tab: "Resumo" },
      { id: "illustrated-pdf", label: "PDF ilustrado", tab: "PDF" },
      { id: "active-study", label: "Estudar ativamente", tab: "Memorizacao" },
      { id: "memory-recall", label: "Tentar lembrar", tab: "Memorizacao" },
      { id: "feynman", label: "Eu explico", tab: "Professor IA" },
      { id: "mixed-practice", label: "Treino misturado", tab: "Quiz" },
      { id: "exam-eve", label: "Tenho prova em breve", tab: "Simulado" }
    ],
    pdfControls: [
      "tipo do PDF",
      "incluir imagens",
      "incluir exercicios",
      "incluir gabarito",
      "salvar no dispositivo"
    ],
    safetyRules: [
      "bloquear PDF sem fontes",
      "usar imagens educativas seguras",
      "adicionar texto alternativo",
      "registrar origem das imagens",
      "evitar dados pessoais"
    ]
  };
}

function fitBlocksToTime(blocks, totalMinutes) {
  const sum = blocks.reduce((acc, block) => acc + block.minutes, 0);
  if (sum <= totalMinutes) return blocks;
  const ratio = totalMinutes / sum;
  return blocks.map((block) => ({
    ...block,
    minutes: Math.max(5, Math.round(block.minutes * ratio))
  }));
}

function normalizeScore(value) {
  const num = Number(value);
  if (!Number.isFinite(num)) return 0.6;
  return num > 1 ? clamp(num / 100, 0, 1) : clamp(num, 0, 1);
}

function normalizeArray(value) {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  return [value];
}

function firstKeyword(text) {
  return String(text || "")
    .split(/\s+/)
    .find((word) => word.length > 3) || String(text || "").split(/\s+/)[0] || "";
}

function dedupe(items) {
  return [...new Set(items.filter(Boolean).map((item) => typeof item === "string" ? item.trim() : item))];
}

function slugify(value) {
  return String(value || "arquivo")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, Number(value)));
}

export {
  TECHNIQUE_CATALOG,
  GRADE_RANGE_CONFIG,
  TURBO_METHODS,
  PREMIUM_TURBO_FEATURES,
  BIZU_LIBRARY,
  PREMIUM_APP_REFERENCES,
  normalizarAnoAnosFinais,
  criarConfiguracaoAnosFinais,
  selecionarTecnicasComprovadas,
  gerarAtividadesPorTecnica,
  gerarResumoAnalitico,
  planejarPdfIlustrado,
  gerarExerciciosParaPdf,
  gerarGabaritoParaPdf,
  criarOpcoesSalvarPdf,
  salvarPdfNoDispositivo,
  validarPlanoPdfIlustrado,
  gerarCardsImageOcclusion,
  criarModoRecuperarDaMemoria,
  criarModoFeynman,
  criarDiarioMetacognitivo,
  criarModoVesperaDeProva,
  orientarFonteConfiavel,
  gerarPacoteCompletoAposBusca,
  criarEspecificacaoUiNovasFuncoes,
  gerarBizusEMacetes,
  criarRecursosPremiumTurbo,
  criarBizusPorDisciplina,
  criarConfiguracaoMemoriaPremium,
  criarTreinoDuasPassagens,
  criarCoachDeConfianca,
  criarSprintConcursoEscolar,
  criarConfiguracoesPremiumEstudo,
  criarCadernoCornell,
  criarRoteiroSQ3R,
  criarExamWrapper,
  criarPlanoTurboAprendizagem
};
