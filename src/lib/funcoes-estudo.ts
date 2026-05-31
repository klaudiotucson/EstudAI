// @ts-nocheck
const DEFAULT_GRADE = "6o ano";

const SOURCE_CATALOG = Object.freeze([
  {
    id: "bncc-mec",
    title: "BNCC/MEC",
    url: "https://basenacionalcomum.mec.gov.br/",
    type: "curriculo",
    subjects: ["todos"],
    useWhen: "Base curricular, habilidades e alinhamento pedagogico."
  },
  {
    id: "bncc-pdf",
    title: "BNCC em PDF - MEC",
    url: "https://www.gov.br/mec/pt-br/escola-em-tempo-integral/BNCC_EI_EF_110518_versaofinal.pdf",
    type: "curriculo",
    subjects: ["todos"],
    useWhen: "Consulta direta ao documento oficial da BNCC."
  },
  {
    id: "khan-matematica-6ano",
    title: "Khan Academy Brasil - Matematica EF: 6o ano",
    url: "https://pt.khanacademy.org/math/6-ano-matematica",
    type: "site-e-video",
    subjects: ["matematica"],
    useWhen: "Videos e exercicios de matematica para o 6o ano."
  },
  {
    id: "khan-algebra-6ano",
    title: "Khan Academy Brasil - Algebra 6o ano",
    url: "https://pt.khanacademy.org/math/6-ano-matematica/algebra-pt",
    type: "site-e-video",
    subjects: ["matematica"],
    useWhen: "Introducao a variaveis, expressoes e problemas de algebra."
  },
  {
    id: "khan-ciencias-6ano",
    title: "Khan Academy Brasil - Ciencias EF: 6o ano",
    url: "https://pt.khanacademy.org/science/6-ano",
    type: "site-e-video",
    subjects: ["ciencias", "fisica", "quimica"],
    useWhen: "Conteudos de Ciencias, materia e energia, Terra e universo, vida e evolucao."
  },
  {
    id: "youtube-edu-unesco",
    title: "YouTube Edu - UNESCO Brasil",
    url: "https://www.unesco.org/pt/articles/youtube-edu",
    type: "video",
    subjects: ["todos"],
    useWhen: "Videos educacionais organizados por playlists e alinhamento escolar."
  },
  {
    id: "canal-futura",
    title: "Canal Futura - Educacao Basica",
    url: "https://futura.frm.org.br/conteudo/educacao-basica",
    type: "video",
    subjects: ["todos"],
    useWhen: "Videos de apoio para educacao basica."
  },
  {
    id: "learning-scientists",
    title: "The Learning Scientists - Six Strategies for Effective Learning",
    url: "https://www.learningscientists.org/blog/2016/8/18-1",
    type: "evidencia-estudo",
    subjects: ["metodos-de-estudo"],
    useWhen: "Base para metodos de reforco, memorizacao e fixacao."
  },
  {
    id: "nature-spacing-retrieval",
    title: "Nature Reviews Psychology - Spacing and retrieval practice",
    url: "https://www.nature.com/articles/s44159-022-00089-1",
    type: "evidencia-estudo",
    subjects: ["metodos-de-estudo"],
    useWhen: "Evidencia sobre repeticao espacada e pratica de recuperacao."
  }
]);

const STUDY_METHODS = Object.freeze({
  recuperacaoAtiva: {
    id: "recuperacaoAtiva",
    name: "Recuperacao ativa",
    goal: "Trazer a informacao da memoria antes de rever o material.",
    howToUse: "Feche o resumo e escreva ou explique o que lembra. Depois confira lacunas.",
    bestFor: ["conceitos", "definicoes", "provas", "revisao"]
  },
  repeticaoEspacada: {
    id: "repeticaoEspacada",
    name: "Repeticao espacada",
    goal: "Revisar em intervalos crescentes para fixar no longo prazo.",
    howToUse: "Revisar depois de 1, 3, 7, 15 e 30 dias, ajustando pelo desempenho.",
    bestFor: ["flashcards", "vocabulario", "formulas", "conceitos"]
  },
  intercalacao: {
    id: "intercalacao",
    name: "Pratica intercalada",
    goal: "Misturar tipos de problemas para aprender quando usar cada estrategia.",
    howToUse: "Alternar questoes de temas parecidos em vez de resolver so um tipo por vez.",
    bestFor: ["matematica", "fisica", "quimica", "classificacao"]
  },
  elaboracao: {
    id: "elaboracao",
    name: "Elaboracao",
    goal: "Conectar ideias com perguntas de como, por que e para que.",
    howToUse: "Responder perguntas como: por que isso acontece? como se relaciona ao que ja sei?",
    bestFor: ["ciencias", "historia", "geografia", "interpretacao"]
  },
  exemplosConcretos: {
    id: "exemplosConcretos",
    name: "Exemplos concretos",
    goal: "Transformar uma ideia abstrata em situacoes do cotidiano.",
    howToUse: "Criar exemplos e contraexemplos, explicando por que servem ou nao servem.",
    bestFor: ["conceitos", "ciencias", "gramatica", "matematica"]
  },
  codificacaoDupla: {
    id: "codificacaoDupla",
    name: "Codificacao dupla",
    goal: "Combinar palavras, desenhos, tabelas, linhas do tempo ou esquemas.",
    howToUse: "Ler o texto e desenhar um esquema; depois explicar o desenho em voz alta.",
    bestFor: ["mapas mentais", "processos", "ciclos", "comparacoes"]
  },
  autoexplicacao: {
    id: "autoexplicacao",
    name: "Autoexplicacao",
    goal: "Fazer o aluno explicar o proprio passo de raciocinio.",
    howToUse: "Depois de cada passo, responder: por que fiz isso? que regra usei?",
    bestFor: ["equacoes", "problemas", "interpretacao", "ciencias"]
  },
  feynman: {
    id: "feynman",
    name: "Tecnica de Feynman",
    goal: "Explicar o tema com palavras simples para revelar lacunas.",
    howToUse: "Ensinar o assunto como se explicasse a um colega; revisar onde travar.",
    bestFor: ["resumos", "conceitos", "apresentacoes"]
  },
  analiseDeErros: {
    id: "analiseDeErros",
    name: "Analise de erros",
    goal: "Transformar erro em pista de estudo.",
    howToUse: "Registrar erro, causa provavel, correcao e uma questao parecida.",
    bestFor: ["matematica", "fisica", "quimica", "provas"]
  },
  cadernoDeErros: {
    id: "cadernoDeErros",
    name: "Caderno de erros",
    goal: "Manter um historico de duvidas e erros recorrentes.",
    howToUse: "Salvar enunciado, tentativa, erro, correcao e proxima revisao.",
    bestFor: ["acompanhamento", "provas", "reforco"]
  },
  praticaDeliberada: {
    id: "praticaDeliberada",
    name: "Pratica deliberada",
    goal: "Treinar exatamente a habilidade que ainda esta fraca.",
    howToUse: "Selecionar poucas questoes focadas, receber feedback e repetir com variacao.",
    bestFor: ["habilidades especificas", "calculo", "leitura", "interpretacao"]
  },
  exemplosResolvidosComRetirada: {
    id: "exemplosResolvidosComRetirada",
    name: "Exemplos resolvidos com retirada gradual",
    goal: "Sair de exemplo guiado para autonomia.",
    howToUse: "Mostrar exemplo completo, depois remover passos para o aluno completar.",
    bestFor: ["equacoes", "problemas", "calculos", "formulas"]
  },
  mnemonicos: {
    id: "mnemonicos",
    name: "Mnemonicos",
    goal: "Criar pistas de memoria para sequencias, nomes e listas.",
    howToUse: "Criar siglas, frases ou associacoes, sempre acompanhadas de entendimento.",
    bestFor: ["listas", "classificacoes", "sequencias", "vocabulario"]
  },
  comparacaoConceitual: {
    id: "comparacaoConceitual",
    name: "Comparacao entre conceitos",
    goal: "Distinguir ideias parecidas e evitar confusoes.",
    howToUse: "Montar tabela: o que e igual, o que e diferente, exemplo e contraexemplo.",
    bestFor: ["ciencias", "gramatica", "geografia", "historia"]
  }
});

const AREA_KEYWORDS = Object.freeze({
  matematica: [
    "matematica", "fracao", "fracoes", "equacao", "expressao", "algebra",
    "porcentagem", "decimal", "numero", "inteiro", "geometria", "area",
    "perimetro", "razao", "proporcao", "mmc", "mdc", "problema",
    "funcao", "funcoes", "trigonometria", "logaritmo", "matriz", "matrizes",
    "determinante", "combinatoria", "probabilidade", "estatistica", "complexos",
    "polinomio", "ita", "ime", "raciocinio logico"
  ],
  fisica: [
    "fisica", "forca", "movimento", "velocidade", "energia", "calor",
    "temperatura", "luz", "som", "eletricidade", "unidade", "grandeza",
    "cinematica", "dinamica", "mecanica", "gravitação", "gravitacao", "ondas",
    "optica", "termologia", "termodinamica", "eletromagnetismo", "circuito"
  ],
  quimica: [
    "quimica", "mistura", "substancia", "solucao", "coloide", "suspensao",
    "reacao", "transformacao", "materia", "atomo", "molecula", "densidade",
    "estequiometria", "ligacao", "ligações", "tabela periodica", "ph", "eletroquimica",
    "termoquimica", "organica", "isomeria", "equilibrio quimico"
  ],
  ciencias: [
    "ciencias", "celula", "corpo humano", "terra", "universo", "agua",
    "solo", "rocha", "ecossistema", "ambiente", "vida", "planeta"
  ],
  biologia: [
    "biologia", "citologia", "genetica", "dna", "rna", "evolucao", "ecologia",
    "fisiologia", "botanica", "zoologia", "microbiologia", "biotecnologia"
  ],
  portugues: [
    "portugues", "gramatica", "interpretacao", "texto", "redacao", "literatura",
    "morfologia", "sintaxe", "semantica", "coesao", "coerencia", "enem"
  ],
  historia: [
    "historia", "brasil colonia", "imperio", "republica", "idade media", "idade moderna",
    "revolucao", "guerra", "fontes historicas", "cidadania"
  ],
  geografia: [
    "geografia", "cartografia", "clima", "relevo", "populacao", "urbanizacao",
    "geopolitica", "globalizacao", "hidrografia", "bioma"
  ],
  filosofia: [
    "filosofia", "etica", "politica", "conhecimento", "epistemologia", "logica",
    "platao", "aristoteles", "kant", "descartes"
  ],
  sociologia: [
    "sociologia", "sociedade", "cultura", "trabalho", "desigualdade", "estado",
    "poder", "cidadania", "durkheim", "weber", "marx"
  ],
  ingles: [
    "ingles", "english", "grammar", "vocabulary", "reading", "listening", "speaking",
    "enem ingles"
  ]
});

const SOCRATIC_STAGES = Object.freeze({
  diagnostico: [
    "O que voce ja sabe sobre esse tema?",
    "Qual parte parece mais facil ate agora?",
    "Em qual ponto voce ficou em duvida?"
  ],
  compreensao: [
    "Consegue explicar o enunciado com suas palavras?",
    "Quais informacoes importantes aparecem aqui?",
    "O que esta sendo pedido exatamente?"
  ],
  estrategia: [
    "Que caminho voce acha que pode funcionar primeiro?",
    "Que regra, conceito ou relacao pode ajudar?",
    "Existe um exemplo parecido que voce ja resolveu?"
  ],
  execucao: [
    "Qual e o primeiro passo que voce consegue fazer sozinho?",
    "Por que esse passo faz sentido?",
    "O que muda se voce conferir esse resultado?"
  ],
  verificacao: [
    "Como voce pode verificar se a resposta faz sentido?",
    "A unidade, valor ou explicacao combina com o problema?",
    "Existe outra forma de chegar ao mesmo resultado?"
  ],
  metacognicao: [
    "O que voce aprendeu sobre como pensar esse tipo de questao?",
    "Que erro voce quer evitar na proxima vez?",
    "Qual seria uma pista util para lembrar desse caminho depois?"
  ]
});

function normalizarTexto(value) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

function includesAny(text, words) {
  return words.some((word) => text.includes(normalizarTexto(word)));
}

function detectarArea({ tema = "", disciplina = "" } = {}) {
  const text = normalizarTexto(`${disciplina} ${tema}`);

  if (!text) return "geral";

  for (const [area, keywords] of Object.entries(AREA_KEYWORDS)) {
    if (includesAny(text, keywords)) return area;
  }

  return "geral";
}

function gerarPromptProfessorSocratico({
  tema,
  disciplina,
  nivel = DEFAULT_GRADE,
  contextoAluno = "",
  modo = "tutor"
} = {}) {
  const area = detectarArea({ tema, disciplina });

  return {
    role: "professor-ia-socratico",
    area,
    system: [
      `Voce e um professor IA de apoio para estudantes do ${nivel} no Brasil.`,
      "Use estilo socratico: faca perguntas claras, uma por vez, e estimule raciocinio.",
      "Nao entregue respostas prontas no primeiro momento.",
      "Se o aluno pedir a resposta, ofereca pista graduada e peca uma tentativa.",
      "Depois que o aluno tentar, explique o raciocinio e corrija com acolhimento.",
      "Mantenha linguagem adequada para criancas e adolescentes.",
      "Nao colete dados pessoais da crianca.",
      "Quando o conteudo envolver BNCC, cite a habilidade apenas se houver confianca."
    ],
    rules: [
      "Comece perguntando o que o aluno ja sabe.",
      "Quebre problemas em passos pequenos.",
      "Peca justificativa antes de validar resposta.",
      "Use exemplos parecidos antes do exemplo identico.",
      "Ao final, resuma o caminho mental usado."
    ],
    context: {
      tema,
      disciplina,
      nivel,
      contextoAluno,
      modo
    },
    firstQuestion: "O que voce ja entende sobre esse tema e onde voce travou?"
  };
}

function gerarPerguntasSocraticas({
  tema,
  disciplina,
  etapa = "diagnostico",
  respostaAluno = "",
  limite = 6
} = {}) {
  const area = detectarArea({ tema, disciplina });
  const base = SOCRATIC_STAGES[etapa] || SOCRATIC_STAGES.diagnostico;
  const extras = [];

  if (respostaAluno) {
    extras.push("O que te fez pensar nessa resposta?");
  }

  if (area === "matematica") {
    extras.push("Qual operacao ou relacao matematica parece mais ligada ao que foi pedido?");
    extras.push("Como voce poderia estimar a resposta antes de calcular?");
  }

  if (area === "fisica") {
    extras.push("Quais grandezas aparecem no problema?");
    extras.push("As unidades combinam entre si?");
  }

  if (area === "quimica") {
    extras.push("Voce esta observando uma mistura, uma substancia ou uma transformacao?");
    extras.push("Que evidencia ajuda a justificar sua conclusao?");
  }

  return {
    tema,
    disciplina,
    etapa,
    area,
    perguntas: [...base, ...extras].slice(0, limite)
  };
}

function gerarRoteiroResolucao({ disciplina, tema = "", problema = "" } = {}) {
  const area = detectarArea({ tema, disciplina });
  const common = {
    area,
    tema,
    problema,
    tutorPolicy: "Guiar com perguntas e pistas graduais antes de mostrar a resolucao completa."
  };

  if (area === "matematica") {
    return {
      ...common,
      title: "Como resolver problemas e equacoes de Matematica",
      steps: [
        step("ler", "Ler com calma", "Reescreva o problema com suas palavras.", "O que o problema quer descobrir?"),
        step("dados", "Separar dados", "Liste numeros, unidades e condicoes.", "Quais dados voce ja tem?"),
        step("incognita", "Definir o desconhecido", "Escolha uma letra ou frase para o que falta descobrir.", "O que sera o x ou a resposta final?"),
        step("estrategia", "Escolher estrategia", "Decida se precisa de operacao, expressao, desenho, tabela ou equacao.", "Que caminho parece mais simples?"),
        step("resolver", "Resolver passo a passo", "Faca uma linha por etapa e explique cada mudanca.", "Por que esse passo mantem a igualdade ou resolve o pedido?"),
        step("conferir", "Conferir", "Substitua, estime ou compare com o contexto.", "Sua resposta faz sentido no texto do problema?")
      ]
    };
  }

  if (area === "fisica") {
    return {
      ...common,
      title: "Como resolver problemas de Fisica introdutoria",
      steps: [
        step("fenomeno", "Identificar o fenomeno", "Diga se o tema envolve movimento, energia, calor, luz, som ou forca.", "O que esta acontecendo na situacao?"),
        step("grandezas", "Listar grandezas", "Separe valores, unidades e o que precisa encontrar.", "Quais grandezas aparecem?"),
        step("relacao", "Escolher relacao", "Use uma formula apenas quando entender o que ela relaciona.", "Que relacao liga os dados ao que foi pedido?"),
        step("unidades", "Conferir unidades", "Veja se as unidades conversam entre si.", "As unidades estao coerentes?"),
        step("calculo", "Calcular", "Substitua valores e resolva devagar.", "Qual seria uma estimativa antes da conta final?"),
        step("interpretar", "Interpretar", "Explique o resultado em frase completa.", "O resultado combina com a situacao real?")
      ]
    };
  }

  if (area === "quimica") {
    return {
      ...common,
      title: "Como resolver problemas de Quimica introdutoria",
      steps: [
        step("identificar", "Identificar o caso", "Veja se envolve substancia, mistura, solucao ou transformacao.", "O que esta sendo observado?"),
        step("evidencias", "Separar evidencias", "Liste sinais visiveis, propriedades e dados.", "Que pista do enunciado sustenta sua ideia?"),
        step("classificar", "Classificar", "Compare com exemplos conhecidos.", "Parece homogeneo, heterogeneo, fisico ou quimico? Por que?"),
        step("explicar", "Explicar", "Use o conceito para justificar, nao apenas o nome.", "Como voce explicaria isso para um colega?"),
        step("conferir", "Conferir", "Procure contraexemplo ou situacao parecida.", "Existe algum detalhe que mudaria a classificacao?")
      ]
    };
  }

  return {
    ...common,
    title: "Como estudar e resolver atividades",
    steps: [
      step("objetivo", "Entender o objetivo", "Descubra o que a atividade pede.", "O que voce precisa responder?"),
      step("informacoes", "Separar informacoes", "Marque conceitos, dados e palavras importantes.", "Quais pistas aparecem no enunciado?"),
      step("conexao", "Conectar com o resumo", "Relacione a pergunta ao conceito estudado.", "Que parte do resumo ajuda aqui?"),
      step("resposta", "Responder com justificativa", "Escreva a resposta e explique o motivo.", "Por que sua resposta faz sentido?"),
      step("revisao", "Revisar", "Confira se respondeu tudo que foi pedido.", "O que voce melhoraria antes de entregar?")
    ]
  };
}

function step(id, title, action, tutorQuestion) {
  return { id, title, action, tutorQuestion };
}

function criarAbaEstudos({ tema, disciplina, bnccSkillCodes = [] } = {}) {
  const area = detectarArea({ tema, disciplina });

  return {
    id: "estudos",
    title: "Estudos",
    tema,
    disciplina,
    area,
    bnccSkillCodes,
    sections: [
      {
        id: "resumo",
        title: "Resumo com fontes",
        actions: ["gerarResumoRobusto", "montarBlocoFontes", "exportarPdf"]
      },
      {
        id: "como-resolver",
        title: "Como resolver",
        actions: ["gerarRoteiroResolucao", "gerarPerguntasSocraticas", "registrarTentativa"]
      },
      {
        id: "pratica-guiada",
        title: "Pratica guiada",
        actions: ["criarExemploResolvido", "retirarPassosGradualmente", "analisarErros"]
      },
      {
        id: "fixacao",
        title: "Fixacao",
        actions: ["gerarAtividadesFixacao", "gerarFlashcards", "agendarRepeticaoEspacada"]
      },
      {
        id: "fontes-videos",
        title: "Fontes e videos",
        actions: ["montarBlocoFontes", "sugerirVideos", "validarRelatorioComFontes"]
      }
    ],
    requiredEndBlock: "fontes pesquisadas e videos recomendados"
  };
}

function selecionarMetodosReforco({
  tema,
  disciplina,
  acertos = 0.6,
  dificuldade = "media",
  tipoConteudo = ""
} = {}) {
  const area = detectarArea({ tema, disciplina });
  const score = Number(acertos) > 1 ? Number(acertos) / 100 : Number(acertos);
  const methods = new Set(["recuperacaoAtiva", "repeticaoEspacada"]);

  if (score < 0.5 || dificuldade === "alta") {
    methods.add("exemplosConcretos");
    methods.add("feynman");
    methods.add("exemplosResolvidosComRetirada");
    methods.add("cadernoDeErros");
  }

  if (score >= 0.5 && score < 0.8) {
    methods.add("elaboracao");
    methods.add("analiseDeErros");
    methods.add("praticaDeliberada");
  }

  if (score >= 0.8) {
    methods.add("intercalacao");
    methods.add("autoexplicacao");
    methods.add("comparacaoConceitual");
  }

  if (["matematica", "fisica", "quimica"].includes(area)) {
    methods.add("autoexplicacao");
    methods.add("analiseDeErros");
    methods.add("intercalacao");
    methods.add("exemplosResolvidosComRetirada");
  }

  if (normalizarTexto(tipoConteudo).includes("lista") || normalizarTexto(tipoConteudo).includes("vocabulario")) {
    methods.add("mnemonicos");
  }

  methods.add("codificacaoDupla");

  return {
    tema,
    disciplina,
    area,
    acertos: score,
    methods: [...methods].map((id) => STUDY_METHODS[id]),
    recommendation: buildReinforcementRecommendation(score)
  };
}

function buildReinforcementRecommendation(score) {
  if (score < 0.5) {
    return "Comecar com exemplos concretos, explicacao guiada e poucas questoes com feedback.";
  }
  if (score < 0.8) {
    return "Misturar recuperacao ativa, analise de erros e pratica deliberada.";
  }
  return "Avancar para intercalacao, desafios e revisoes espacadas para manter dominio.";
}

function agendarRepeticaoEspacada({ dataBase = new Date(), desempenho = "medio" } = {}) {
  const base = toDate(dataBase);
  const intervals = {
    baixo: [1, 2, 4, 7, 14],
    medio: [1, 3, 7, 15, 30],
    alto: [2, 7, 15, 30, 60]
  };

  const selected = intervals[normalizarTexto(desempenho)] || intervals.medio;

  return selected.map((days, index) => ({
    revisao: index + 1,
    diasAposBase: days,
    data: toIsoDate(addDays(base, days)),
    foco: index === 0 ? "recuperar sem olhar" : "rever lacunas e praticar"
  }));
}

function gerarAtividadesFixacao({ tema, disciplina, conceitos = [] } = {}) {
  const area = detectarArea({ tema, disciplina });
  const mainConcepts = conceitos.length ? conceitos : [tema || "tema estudado"];
  const conceptText = mainConcepts.join(", ");
  const activities = [
    {
      method: "recuperacaoAtiva",
      prompt: `Sem olhar o resumo, escreva tudo que lembra sobre: ${conceptText}. Depois compare com o material.`
    },
    {
      method: "elaboracao",
      prompt: `Responda: por que ${tema || "esse conteudo"} e importante? Como ele se liga a algo do cotidiano?`
    },
    {
      method: "exemplosConcretos",
      prompt: `Crie dois exemplos e um contraexemplo sobre ${tema || "o tema"}. Explique por que cada um serve.`
    },
    {
      method: "codificacaoDupla",
      prompt: `Transforme o resumo em desenho, tabela ou mapa mental. Depois explique o visual em voz alta.`
    },
    {
      method: "feynman",
      prompt: `Explique ${tema || "o tema"} para um colega do 6o ano usando palavras simples e sem copiar o resumo.`
    }
  ];

  if (["matematica", "fisica", "quimica"].includes(area)) {
    activities.push(
      {
        method: "autoexplicacao",
        prompt: "Resolva uma questao e escreva ao lado de cada passo: por que fiz isso?"
      },
      {
        method: "analiseDeErros",
        prompt: "Pegue uma questao errada, descubra a causa do erro e crie uma questao parecida para refazer."
      },
      {
        method: "intercalacao",
        prompt: "Misture questoes de tipos diferentes para treinar a escolha da estrategia, nao so a conta."
      }
    );
  }

  return {
    tema,
    disciplina,
    area,
    activities
  };
}

function montarBlocoFontes({
  tema,
  disciplina,
  fontesUsadas = [],
  incluirVideos = true,
  dataPesquisa = new Date()
} = {}) {
  const area = detectarArea({ tema, disciplina });
  const curated = SOURCE_CATALOG.filter((source) => {
    return source.subjects.includes("todos")
      || source.subjects.includes(area)
      || source.subjects.includes("metodos-de-estudo");
  });

  const merged = dedupeSources([...fontesUsadas, ...curated]);
  const videos = incluirVideos
    ? merged.filter((source) => source.type.includes("video"))
    : [];

  return {
    title: "Fontes pesquisadas e videos para estudar",
    tema,
    disciplina,
    dataPesquisa: toIsoDate(toDate(dataPesquisa)),
    fontesCurriculares: merged.filter((source) => source.type === "curriculo"),
    fontesTexto: merged.filter((source) => !source.type.includes("video") && source.type !== "curriculo"),
    videosRecomendados: videos,
    nota: "As fontes devem ser exibidas ao fim de todo resumo, relatorio, PDF, quiz, mapa mental ou prova."
  };
}

function dedupeSources(sources) {
  const map = new Map();

  for (const source of sources) {
    if (!source || !source.url) continue;
    map.set(source.url, {
      id: source.id || source.url,
      title: source.title || source.titulo || source.url,
      url: source.url,
      type: source.type || source.tipo || "fonte",
      subjects: source.subjects || source.assuntos || ["todos"],
      useWhen: source.useWhen || source.uso || "Fonte usada na pesquisa."
    });
  }

  return [...map.values()];
}

function validarRelatorioComFontes(relatorio) {
  const pendencias = [];

  if (!relatorio) {
    return { valido: false, pendencias: ["Relatorio vazio."] };
  }

  if (typeof relatorio === "string") {
    const hasUrl = /https?:\/\//i.test(relatorio);
    const hasFontesSection = /fontes|referencias|videos/i.test(relatorio);

    if (!hasFontesSection) pendencias.push("Adicionar secao de fontes.");
    if (!hasUrl) pendencias.push("Adicionar links das fontes pesquisadas.");

    return { valido: pendencias.length === 0, pendencias };
  }

  const sourceCount = Array.isArray(relatorio.sources) ? relatorio.sources.length : 0;
  const videoCount = Array.isArray(relatorio.videoSources) ? relatorio.videoSources.length : 0;

  if (sourceCount === 0) pendencias.push("Adicionar pelo menos uma fonte textual/curricular.");
  if (videoCount === 0) pendencias.push("Adicionar pelo menos uma fonte em video ou justificar ausencia.");

  return { valido: pendencias.length === 0, pendencias };
}

function criarContratoRespostaResumo({ tema, disciplina, nivel = DEFAULT_GRADE } = {}) {
  return {
    name: "StudySummaryWithSources",
    requiredSections: [
      "titulo",
      "disciplina",
      "ano",
      "habilidadesBncc",
      "resumoRobusto",
      "conceitosChave",
      "exemplos",
      "errosComuns",
      "perguntasDeVerificacao",
      "metodosDeFixacao",
      "fontesPesquisadas",
      "videosRecomendados"
    ],
    rules: [
      "Nao inventar fontes.",
      "Nao inventar codigo BNCC quando nao houver confianca.",
      "Adequar linguagem ao 6o ano.",
      "Separar fonte curricular, fonte textual e video.",
      "Incluir data da pesquisa.",
      "Sugerir revisao por professor/responsavel quando o tema exigir."
    ],
    schema: {
      topic: tema,
      subject: disciplina,
      grade: nivel,
      bnccSkillCodes: [],
      summary: "",
      keyConcepts: [],
      examples: [],
      commonMistakes: [],
      reviewQuestions: [],
      studyMethods: [],
      sources: [],
      videoSources: [],
      researchedAt: "YYYY-MM-DD"
    }
  };
}

function gerarPlanoReforco({
  tema,
  disciplina,
  acertos,
  dificuldade,
  conceitos = [],
  dataBase = new Date()
} = {}) {
  const reforco = selecionarMetodosReforco({ tema, disciplina, acertos, dificuldade });
  const agenda = agendarRepeticaoEspacada({
    dataBase,
    desempenho: reforco.acertos < 0.5 ? "baixo" : reforco.acertos >= 0.8 ? "alto" : "medio"
  });
  const atividades = gerarAtividadesFixacao({ tema, disciplina, conceitos });

  return {
    tema,
    disciplina,
    metodos: reforco.methods,
    recomendacao: reforco.recommendation,
    agenda,
    atividades: atividades.activities
  };
}

function criarEntradaCadernoErros({
  tema,
  disciplina,
  enunciado,
  respostaAluno,
  respostaEsperada = "",
  causaProvavel = "a investigar"
} = {}) {
  return {
    id: `erro-${Date.now()}`,
    tema,
    disciplina,
    enunciado,
    respostaAluno,
    respostaEsperada,
    causaProvavel,
    perguntasSocraticas: gerarPerguntasSocraticas({
      tema,
      disciplina,
      etapa: "verificacao",
      respostaAluno
    }).perguntas,
    proximaAcao: "Refazer uma questao parecida apos revisar o conceito.",
    createdAt: new Date().toISOString()
  };
}

function addDays(date, days) {
  const copy = new Date(date);
  copy.setDate(copy.getDate() + days);
  return copy;
}

function toDate(value) {
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) {
    throw new Error("Data invalida.");
  }
  return date;
}

function toIsoDate(date) {
  return date.toISOString().slice(0, 10);
}

export {
  DEFAULT_GRADE,
  SOURCE_CATALOG,
  STUDY_METHODS,
  detectarArea,
  gerarPromptProfessorSocratico,
  gerarPerguntasSocraticas,
  gerarRoteiroResolucao,
  criarAbaEstudos,
  selecionarMetodosReforco,
  agendarRepeticaoEspacada,
  gerarAtividadesFixacao,
  montarBlocoFontes,
  validarRelatorioComFontes,
  criarContratoRespostaResumo,
  gerarPlanoReforco,
  criarEntradaCadernoErros
};
