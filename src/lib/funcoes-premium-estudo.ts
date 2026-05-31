// @ts-nocheck
import * as baseStudy from "./funcoes-estudo";

const DEFAULT_CONTEXT = Object.freeze({
  country: "Brasil",
  grade: "6o ano",
  curriculum: "BNCC/MEC",
  ageRange: "11-12"
});

const PREMIUM_REFERENCES = Object.freeze([
  {
    id: "khanmigo",
    title: "Khanmigo - Khan Academy",
    url: "https://www.khanmigo.ai/",
    category: "ai-tutor",
    learnings: ["tutor socratico", "seguranca", "assistente do professor"]
  },
  {
    id: "quizlet-ai",
    title: "Quizlet AI Study Tools",
    url: "https://quizlet.com/features/ai-study-tools",
    category: "study-generation",
    learnings: ["flashcards", "practice tests", "study guides", "pdf summarizer"]
  },
  {
    id: "remnote-srs",
    title: "RemNote Spaced Repetition",
    url: "https://www.remnote.com/feature/spaced-repetition",
    category: "memory",
    learnings: ["spaced repetition", "notes plus flashcards", "exam scheduler"]
  },
  {
    id: "brainscape-cbr",
    title: "Brainscape Confidence-Based Repetition",
    url: "https://brainscape.zendesk.com/hc/en-us/articles/13103043051149-How-does-Brainscape-s-spaced-repetition-algorithm-work-i-e-Confidence-Based-Repetition",
    category: "memory",
    learnings: ["confidence rating", "adaptive intervals", "weakness focus"]
  },
  {
    id: "duolingo-learning-science",
    title: "Duolingo Teaching Method",
    url: "https://blog.duolingo.com/duolingo-teaching-method/",
    category: "personalization",
    learnings: ["micro lessons", "personalized practice", "edge of knowledge"]
  },
  {
    id: "duolingo-spaced",
    title: "Duolingo Spaced Repetition",
    url: "https://blog.duolingo.com/spaced-repetition-for-learning/",
    category: "memory",
    learnings: ["spaced repetition", "active recall", "review mistakes sooner"]
  },
  {
    id: "brilliant",
    title: "Brilliant - Learn by Doing",
    url: "https://brilliant.org/",
    category: "interactive-learning",
    learnings: ["interactive problems", "instant feedback", "learn by doing"]
  },
  {
    id: "ixl-diagnostic",
    title: "IXL Real-Time Diagnostic",
    url: "https://www.ixl.com/diagnostic/getting-started",
    category: "diagnostic",
    learnings: ["real-time diagnostic", "personalized action plan", "skill gaps"]
  },
  {
    id: "aleks",
    title: "ALEKS Knowledge Space Theory",
    url: "https://www.aleks.com/about_aleks/knowledge_space_theory",
    category: "adaptive-map",
    learnings: ["knowledge map", "readiness", "prerequisite-aware learning"]
  },
  {
    id: "photomath",
    title: "Photomath",
    url: "https://photomath.com/",
    category: "problem-solving",
    learnings: ["scan problem", "step-by-step", "multiple methods"]
  },
  {
    id: "notebooklm-mindmap",
    title: "NotebookLM Mind Maps",
    url: "https://support.google.com/notebooklm/answer/16212283",
    category: "source-grounded-study",
    learnings: ["source-based mind maps", "ask about nodes", "visual overview"]
  },
  {
    id: "microsoft-learning-accelerators",
    title: "Microsoft Learning Accelerators",
    url: "https://www.microsoft.com/en-us/education/learning-tools/learning-accelerators",
    category: "teacher-analytics",
    learnings: ["reading progress", "math progress", "search coach", "analytics"]
  },
  {
    id: "cast-udl",
    title: "CAST UDL Guidelines",
    url: "https://udlguidelines.cast.org/",
    category: "accessibility",
    learnings: ["engagement", "representation", "action and expression"]
  },
  {
    id: "wwc-study",
    title: "What Works Clearinghouse - Organizing Instruction and Study",
    url: "https://ies.ed.gov/ncee/wwc/PracticeGuide/1",
    category: "evidence",
    learnings: ["spacing", "worked examples", "graphics plus words", "quizzing"]
  },
  {
    id: "eef-metacognition",
    title: "EEF Metacognition and Self-Regulation",
    url: "https://educationendowmentfoundation.org.uk/education-evidence/teaching-learning-toolkit/metacognition-and-self-regulation",
    category: "metacognition",
    learnings: ["plan", "monitor", "evaluate", "self-regulated learning"]
  },
  {
    id: "unesco-genai",
    title: "UNESCO Guidance for Generative AI in Education",
    url: "https://www.unesco.org/en/digital-education/ai-future-learning/guidance",
    category: "safety",
    learnings: ["human-centered AI", "age appropriateness", "privacy"]
  },
  {
    id: "unicef-ai-children",
    title: "UNICEF Policy Guidance on AI for Children",
    url: "https://www.unicef.org/globalinsight/reports/policy-guidance-ai-children",
    category: "safety",
    learnings: ["child rights", "inclusion", "fairness", "well-being"]
  },
  {
    id: "anpd-criancas",
    title: "ANPD - Dados pessoais de criancas e adolescentes",
    url: "https://www.gov.br/anpd/pt-br/assuntos/noticias/anpd-divulga-enunciado-sobre-o-tratamento-de-dados-pessoais-de-criancas-e-adolescentes",
    category: "privacy",
    learnings: ["melhor interesse", "LGPD", "minimizacao de dados"]
  }
]);

const PREMIUM_MODULES = Object.freeze([
  {
    id: "source-grounded-research",
    title: "Busca confiavel com fontes",
    value: "Todo resumo termina com fontes, videos e confiabilidade.",
    benchmark: ["NotebookLM", "Quizlet", "Microsoft Search Coach"],
    functions: ["criarModoPesquisaConfiavel", "avaliarConfiabilidadeFonte", "montarRelatorioComCitacoes"]
  },
  {
    id: "socratic-ai-tutor",
    title: "Professor IA socratico premium",
    value: "Guia o aluno por perguntas, pistas graduais e reflexao.",
    benchmark: ["Khanmigo"],
    functions: ["criarSessaoProfessorPremium", "detectarRiscosPedagogicos"]
  },
  {
    id: "adaptive-bncc-map",
    title: "Mapa adaptativo BNCC",
    value: "Calcula dominio, pre-requisitos e proximo melhor passo.",
    benchmark: ["ALEKS", "IXL"],
    functions: ["criarMapaConhecimentoBncc", "calcularDominioAdaptativo", "selecionarProximaAtividade"]
  },
  {
    id: "memory-engine",
    title: "Motor de memoria",
    value: "Revisa o que importa no momento certo.",
    benchmark: ["Anki", "RemNote", "Brainscape", "Duolingo"],
    functions: ["agendarMemoriaAvancada", "criarSprintEstudoPremium"]
  },
  {
    id: "interactive-problem-solving",
    title: "Resolucao guiada",
    value: "Ensina processo, multiplos metodos e verificacao.",
    benchmark: ["Photomath", "Brilliant", "WWC"],
    functions: ["criarProtocoloResolucaoPremium", "gerarQuestoesAdaptativas"]
  },
  {
    id: "mistake-intelligence",
    title: "Caderno de erros inteligente",
    value: "Transforma erro em plano de recuperacao.",
    benchmark: ["Duolingo", "IXL", "EEF"],
    functions: ["classificarErro", "gerarCadernoErrosInteligente"]
  },
  {
    id: "multimodal-study-studio",
    title: "Estudio multimodal",
    value: "Converte tema em PDF, mapa, audio, quiz, slides e cards.",
    benchmark: ["Quizlet", "NotebookLM", "Microsoft Learning Accelerators"],
    functions: ["gerarEstudoMultimodal", "criarPacoteExportacaoEstudo"]
  },
  {
    id: "teacher-parent-command-center",
    title: "Painel professor/responsavel",
    value: "Mostra progresso, lacunas, grupos e acoes recomendadas.",
    benchmark: ["IXL Analytics", "Microsoft Insights"],
    functions: ["montarDashboardProfessorPremium"]
  },
  {
    id: "child-safe-ai",
    title: "Seguranca infantil e privacidade",
    value: "IA segura, minima coleta de dados e supervisao.",
    benchmark: ["UNESCO", "UNICEF", "ANPD"],
    functions: ["criarContratoSegurancaInfantil", "detectarRiscosPedagogicos"]
  }
]);

const ERROR_TYPES = Object.freeze({
  leitura: "Erro de leitura do enunciado",
  conceito: "Erro conceitual",
  procedimento: "Erro de procedimento",
  calculo: "Erro de calculo",
  unidade: "Erro de unidade",
  sinal: "Erro de sinal",
  interpretacao: "Erro de interpretacao",
  chute: "Resposta sem justificativa ou chute",
  formula: "Formula usada sem compreender a relacao",
  comunicacao: "Resposta incompleta ou pouco explicada"
});

const BLOOM_LEVELS = Object.freeze([
  "lembrar",
  "compreender",
  "aplicar",
  "analisar",
  "avaliar",
  "criar"
]);

function criarBlueprintPremium(context = {}) {
  const cfg = { ...DEFAULT_CONTEXT, ...context };

  return {
    product: "App de estudos premium mundial",
    context: cfg,
    northStar: "Ajudar o aluno a aprender, lembrar e explicar com autonomia.",
    principles: [
      "Aprendizagem ativa antes de explicacao passiva.",
      "IA como professora socratica, nao como cola.",
      "Todo conteudo importante precisa de fonte e data.",
      "Dominio real importa mais que tempo de tela.",
      "Erro e dado pedagogico, nao fracasso.",
      "Personalizacao deve respeitar privacidade infantil.",
      "Acessibilidade e inclusao entram desde o primeiro desenho."
    ],
    modules: PREMIUM_MODULES,
    references: PREMIUM_REFERENCES
  };
}

function planejarRoadmapPremium({ meses = 12, foco = "mvp-premium" } = {}) {
  const phases = [
    {
      month: "1-2",
      title: "Base pedagogica e IA segura",
      deliverables: [
        "professor IA socratico",
        "resumos com fontes",
        "flashcards",
        "quiz",
        "contrato de seguranca infantil"
      ]
    },
    {
      month: "3-4",
      title: "Memoria e aba Estudos",
      deliverables: [
        "repeticao espacada avancada",
        "plano de revisao",
        "caderno de erros",
        "aba Estudos premium",
        "exportacao PDF"
      ]
    },
    {
      month: "5-6",
      title: "Diagnostico e adaptacao",
      deliverables: [
        "calculo de dominio",
        "mapa BNCC",
        "proximo melhor passo",
        "simulados adaptativos",
        "painel responsavel"
      ]
    },
    {
      month: "7-9",
      title: "Multimodal e professor",
      deliverables: [
        "mapas mentais interativos",
        "audio de estudo",
        "slides",
        "dashboard professor",
        "agrupamento por lacunas"
      ]
    },
    {
      month: "10-12",
      title: "Premium mundial",
      deliverables: [
        "OCR de exercicios",
        "quadro branco",
        "simulacoes",
        "modo offline",
        "auditoria pedagogica",
        "pesquisa de eficacia"
      ]
    }
  ];

  return {
    foco,
    meses,
    phases: phases.filter((_, index) => index < Math.ceil(meses / 2.5)),
    successMetrics: [
      "aumento de dominio por habilidade",
      "retencao apos 7, 15 e 30 dias",
      "redução de erros recorrentes",
      "uso de fontes confiaveis",
      "satisfacao do aluno, professor e responsavel",
      "baixo indice de respostas prontas sem tentativa"
    ]
  };
}

function criarMapaConhecimentoBncc({ skills = [], subject = "", grade = DEFAULT_CONTEXT.grade } = {}) {
  const nodes = skills.map((skill, index) => ({
    id: skill.code || skill.id || `skill-${index + 1}`,
    title: skill.title || skill.name || "Habilidade sem titulo",
    subject: skill.subject || subject,
    grade: skill.grade || grade,
    prerequisites: skill.prerequisites || [],
    concepts: skill.concepts || [],
    mastery: clamp(skill.mastery ?? 0, 0, 1),
    confidence: clamp(skill.confidence ?? 0.5, 0, 1),
    difficulty: skill.difficulty || inferDifficulty(skill)
  }));

  const edges = nodes.flatMap((node) => {
    return node.prerequisites.map((pre) => ({
      from: pre,
      to: node.id,
      type: "prerequisite"
    }));
  });

  return {
    subject,
    grade,
    nodes,
    edges,
    readyToLearn: nodes
      .filter((node) => isSkillReady(node, nodes))
      .sort((a, b) => a.mastery - b.mastery)
      .map((node) => node.id)
  };
}

function calcularDominioAdaptativo({
  attempts = [],
  confidence = 3,
  recencyDays = 0,
  hintsUsed = 0,
  responseTimeSec = 60
} = {}) {
  const normalizedConfidence = clamp(Number(confidence) / 5, 0, 1);
  const attemptScore = attempts.length ? weightedAttemptScore(attempts) : 0.45;
  const recencyScore = Math.exp(-clamp(recencyDays, 0, 120) / 45);
  const hintsPenalty = clamp(hintsUsed * 0.06, 0, 0.3);
  const speedScore = clamp(1 - Math.log10(Math.max(responseTimeSec, 10) / 10) / 3, 0.25, 1);

  const mastery = clamp(
    attemptScore * 0.55
      + normalizedConfidence * 0.18
      + recencyScore * 0.17
      + speedScore * 0.1
      - hintsPenalty,
    0,
    1
  );

  return {
    mastery,
    level: masteryToLevel(mastery),
    confidence: normalizedConfidence,
    recencyScore,
    attemptScore,
    hintsPenalty,
    speedScore,
    recommendation: masteryRecommendation(mastery)
  };
}

function selecionarProximaAtividade({
  skills = [],
  attemptsBySkill = {},
  dueReviews = [],
  availableActivities = [],
  maxNewDifficulty = "media"
} = {}) {
  if (dueReviews.length) {
    const review = [...dueReviews].sort((a, b) => priorityValue(b.priority) - priorityValue(a.priority))[0];
    return {
      type: "review",
      reason: "Ha revisoes vencidas; memoria de longo prazo vem antes de conteudo novo.",
      target: review,
      activity: matchActivity(availableActivities, review.skillId, "review")
    };
  }

  const map = criarMapaConhecimentoBncc({ skills });
  const candidates = map.nodes
    .filter((node) => map.readyToLearn.includes(node.id))
    .map((node) => {
      const state = calcularDominioAdaptativo({
        attempts: attemptsBySkill[node.id] || [],
        confidence: node.confidence * 5
      });
      return { ...node, state };
    })
    .filter((node) => allowedDifficulty(node.difficulty, maxNewDifficulty))
    .sort((a, b) => a.state.mastery - b.state.mastery);

  const selected = candidates[0] || map.nodes.sort((a, b) => a.mastery - b.mastery)[0];

  return {
    type: selected && selected.mastery < 0.4 ? "remediation" : "new-or-practice",
    reason: selected ? "Proximo passo escolhido pelo menor dominio com pre-requisitos suficientes." : "Sem habilidade disponivel.",
    target: selected || null,
    activity: selected ? matchActivity(availableActivities, selected.id, "practice") : null
  };
}

function agendarMemoriaAvancada({
  quality = 3,
  confidence = 3,
  previousInterval = 0,
  ease = 2.5,
  repetitions = 0,
  lapses = 0,
  targetRetention = 0.9,
  now = new Date()
} = {}) {
  const q = clamp(Number(quality), 0, 5);
  const c = clamp(Number(confidence), 1, 5);
  let nextEase = Math.max(1.3, ease + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02)));
  nextEase += (c - 3) * 0.03;

  let interval;
  let nextRepetitions = repetitions;
  let nextLapses = lapses;

  if (q < 3) {
    interval = c <= 2 ? 1 : 2;
    nextRepetitions = 0;
    nextLapses += 1;
    nextEase = Math.max(1.3, nextEase - 0.2);
  } else if (repetitions === 0) {
    interval = c >= 4 ? 2 : 1;
    nextRepetitions = 1;
  } else if (repetitions === 1) {
    interval = c >= 4 ? 6 : 3;
    nextRepetitions = 2;
  } else {
    const retentionFactor = clamp(targetRetention, 0.75, 0.97) / 0.9;
    interval = Math.round(Math.max(1, previousInterval * nextEase * retentionFactor));
    nextRepetitions += 1;
  }

  const dueDate = addDays(toDate(now), interval);

  return {
    intervalDays: interval,
    dueDate: toIsoDate(dueDate),
    ease: round(nextEase, 2),
    repetitions: nextRepetitions,
    lapses: nextLapses,
    priority: q < 3 ? "alta" : interval <= 3 ? "media" : "normal",
    explanation: "Intervalo ajustado por qualidade, confianca, facilidade e esquecimentos."
  };
}

function criarSprintEstudoPremium({
  tema,
  disciplina,
  minutes = 25,
  energy = "media",
  weakSkills = [],
  dueReviews = [],
  examDate = null
} = {}) {
  const total = clamp(minutes, 5, 120);
  const warmup = total >= 20 ? 3 : 1;
  const review = dueReviews.length ? Math.max(5, Math.round(total * 0.25)) : Math.max(2, Math.round(total * 0.12));
  const core = Math.max(5, Math.round(total * 0.45));
  const practice = Math.max(4, Math.round(total * 0.22));
  const reflect = Math.max(2, total - warmup - review - core - practice);
  const nearExam = examDate ? daysBetween(new Date(), toDate(examDate)) <= 7 : false;

  return {
    tema,
    disciplina,
    minutes: total,
    energy,
    mode: nearExam ? "revisao-para-prova" : "aprendizado-ativo",
    blocks: [
      block("aquecimento", warmup, "Dizer o que lembra sem consultar."),
      block("revisao-espacada", review, dueReviews.length ? "Revisar cards vencidos." : "Revisar 3 conceitos-chave."),
      block("aprendizagem", core, weakSkills.length ? `Focar em ${weakSkills[0].title || weakSkills[0]}.` : "Estudar o resumo com exemplos."),
      block("pratica", practice, "Resolver questoes intercaladas com feedback."),
      block("metacognicao", reflect, "Registrar o que aprendeu, erro principal e proximo passo.")
    ],
    guardrail: "Se o aluno travar, o tutor oferece pista graduada antes de resposta."
  };
}

function criarSessaoProfessorPremium({
  tema,
  disciplina,
  modo = "socratico",
  nivel = DEFAULT_CONTEXT.grade,
  tentativaObrigatoria = true,
  fontesObrigatorias = true
} = {}) {
  const prompt = baseStudy.gerarPromptProfessorSocratico({ tema, disciplina, nivel, modo });
  const modes = {
    socratico: "Ensinar por perguntas e pistas graduais.",
    resolvedorGuiado: "Resolver por etapas, pedindo tentativa em cada passo.",
    revisor: "Focar em revisao, recuperacao ativa e erros comuns.",
    desafiador: "Aumentar dificuldade com apoio e sem humilhar.",
    tutorDeErro: "Classificar erro, explicar causa e gerar nova pratica.",
    responsavel: "Orientar adulto a ajudar sem fazer pelo aluno."
  };

  return {
    ...prompt,
    modeDescription: modes[modo] || modes.socratico,
    premiumRules: [
      tentativaObrigatoria ? "Pedir tentativa antes de resolver." : "Pode demonstrar se estiver em modo aula.",
      "Usar no maximo uma pergunta principal por turno.",
      "Detectar chute e pedir justificativa.",
      "Dar pista nivel 1 antes de pista nivel 2.",
      "Fechar com resumo do raciocinio.",
      fontesObrigatorias ? "Ao gerar relatorio, listar fontes e videos." : "Fontes opcionais neste modo."
    ],
    hintLevels: [
      "pergunta aberta",
      "pista leve",
      "exemplo parecido",
      "passo incompleto",
      "demonstracao completa apos tentativa"
    ]
  };
}

function criarProtocoloResolucaoPremium({ tema, disciplina, problema = "" } = {}) {
  const base = baseStudy.gerarRoteiroResolucao({ tema, disciplina, problema });

  return {
    ...base,
    premiumAddOns: [
      "identificar erro comum antes da resolucao",
      "pedir estimativa antes da conta",
      "mostrar metodo alternativo depois da primeira tentativa",
      "transformar o passo mais dificil em flashcard",
      "gerar questao irma para confirmar dominio",
      "registrar no caderno de erros se houver falha recorrente"
    ],
    answerPolicy: {
      directAnswerAllowed: false,
      requiresAttempt: true,
      afterAttempt: "explicar o raciocinio e pedir verificacao pelo aluno"
    }
  };
}

function gerarEstudoMultimodal({ tema, disciplina, conceitos = [], nivel = DEFAULT_CONTEXT.grade } = {}) {
  const area = baseStudy.detectarArea({ tema, disciplina });
  const conceptList = conceitos.length ? conceitos : [tema || "tema principal"];

  return {
    tema,
    disciplina,
    nivel,
    area,
    outputs: [
      output("resumo", "Resumo robusto com fontes e exemplos."),
      output("flashcards", "Cards pequenos com recuperacao ativa e revisao espacada."),
      output("quiz", "Perguntas adaptativas com feedback imediato."),
      output("mapa-mental", "Mapa com nos clicaveis e perguntas por no."),
      output("pdf", "Material imprimivel com exercicios e gabarito comentado."),
      output("audio", "Roteiro de audio de 5 a 8 minutos para revisao."),
      output("slides", "Apresentacao curta para explicar o tema a outra pessoa."),
      output("caderno-erros", "Tabela de erros, causas, correcao e nova pratica."),
      output("simulado", "Prova curta por habilidade e dificuldade."),
      output("glossario", "Palavras-chave com definicao simples e exemplo.")
    ],
    activeTasks: [
      `Explique ${conceptList[0]} com suas palavras.`,
      "Desenhe um exemplo.",
      "Crie uma pergunta dificil sobre o tema.",
      "Resolva uma questao e justifique cada passo.",
      "Ensine o tema para um colega imaginario."
    ]
  };
}

function avaliarConfiabilidadeFonte({ url = "", title = "", type = "", author = "", hasCitations = false } = {}) {
  const text = normalize(`${url} ${title} ${type} ${author}`);
  let score = 40;
  const reasons = [];

  if (/\.gov|gov\.br|mec\.gov|anpd\.gov/.test(text)) {
    score += 25;
    reasons.push("dominio governamental/oficial");
  }
  if (/\.edu|unesco|unicef|cast|ies\.ed|nctm|educationendowmentfoundation/.test(text)) {
    score += 20;
    reasons.push("instituicao educacional/cientifica");
  }
  if (/khanacademy|khanmigo|quizlet|duolingo|brilliant|ixl|aleks|photomath|remnote|brainscape|microsoft|google/.test(text)) {
    score += 10;
    reasons.push("referencia de produto educacional reconhecido");
  }
  if (hasCitations) {
    score += 10;
    reasons.push("possui citacoes ou referencias");
  }
  if (/blog|opinion|forum|reddit|tiktok/.test(text)) {
    score -= 12;
    reasons.push("fonte pode exigir verificacao adicional");
  }
  if (!/^https?:\/\//i.test(url)) {
    score -= 15;
    reasons.push("link ausente ou incompleto");
  }

  const finalScore = clamp(score, 0, 100);

  return {
    score: finalScore,
    level: finalScore >= 80 ? "alta" : finalScore >= 60 ? "media" : "baixa",
    reasons,
    needsHumanReview: finalScore < 60
  };
}

function recomendarFontesPremium({ tema, disciplina, includeVideos = true }: any = {}) {
  const baseBlock = baseStudy.montarBlocoFontes({ tema, disciplina, incluirVideos: includeVideos });
  const all = [...baseBlock.fontesCurriculares, ...baseBlock.fontesTexto, ...baseBlock.videosRecomendados, ...PREMIUM_REFERENCES];
  const unique = dedupeByUrl(all);

  return unique.map((source) => ({
    ...source,
    reliability: avaliarConfiabilidadeFonte(source)
  })).sort((a, b) => b.reliability.score - a.reliability.score);
}

function montarRelatorioComCitacoes({
  tema,
  disciplina,
  sections = {},
  sources = [],
  videos = [],
  researchedAt = new Date()
} = {}) {
  const recommended = recomendarFontesPremium({ tema, disciplina });
  const finalSources = dedupeByUrl([...sources, ...recommended]).slice(0, 12);
  const finalVideos = dedupeByUrl([...videos, ...finalSources.filter((source) => {
    return normalize(source.type || source.category).includes("video") || normalize(source.title).includes("youtube");
  })]).slice(0, 5);

  return {
    tema,
    disciplina,
    researchedAt: toIsoDate(toDate(researchedAt)),
    sections: {
      resumo: sections.resumo || "",
      conceitosChave: sections.conceitosChave || [],
      exemplos: sections.exemplos || [],
      errosComuns: sections.errosComuns || [],
      perguntas: sections.perguntas || [],
      planoDeEstudo: sections.planoDeEstudo || []
    },
    sources: finalSources,
    videos: finalVideos,
    validation: baseStudy.validarRelatorioComFontes({
      sources: finalSources,
      videoSources: finalVideos
    }),
    disclaimer: "Conteudo educacional para apoio ao estudo; professor/responsavel pode revisar."
  };
}

function classificarErro({
  enunciado = "",
  respostaAluno = "",
  respostaEsperada = "",
  passosAluno = [],
  metadados = {}
} = {}) {
  const answer = normalize(respostaAluno);
  const expected = normalize(respostaEsperada);
  const statement = normalize(enunciado);
  const steps = passosAluno.map(normalize).join(" ");
  const tags = [];

  if (!answer || answer.length < 3) tags.push("comunicacao");
  if (metadados.tempoRespostaSec && metadados.tempoRespostaSec < 5) tags.push("chute");
  if (metadados.hintsUsed >= 3) tags.push("conceito");
  if (/[a-z]\s*=/.test(statement) && !/[a-z]\s*=/.test(answer + steps)) tags.push("procedimento");
  if (/\bcm|m|kg|g|l|ml|s|min|h\b/.test(statement) && !/\bcm|m|kg|g|l|ml|s|min|h\b/.test(answer)) tags.push("unidade");
  if (answer.includes("-") !== expected.includes("-") && expected) tags.push("sinal");
  if (/\d/.test(answer) && /\d/.test(expected) && answer !== expected) tags.push("calculo");
  if (answer && expected && !answer.includes(expected) && !expected.includes(answer)) tags.push("interpretacao");

  const uniqueTags = [...new Set(tags.length ? tags : ["conceito"])];

  return {
    tags: uniqueTags,
    primary: uniqueTags[0],
    labels: uniqueTags.map((tag) => ERROR_TYPES[tag]),
    nextAction: remediateError(uniqueTags[0])
  };
}

function gerarCadernoErrosInteligente({ attempts = [] } = {}) {
  const entries = attempts.map((attempt, index) => {
    const error = classificarErro(attempt);
    return {
      id: attempt.id || `erro-premium-${index + 1}`,
      tema: attempt.tema,
      disciplina: attempt.disciplina,
      enunciado: attempt.enunciado,
      respostaAluno: attempt.respostaAluno,
      respostaEsperada: attempt.respostaEsperada,
      error,
      flashcard: {
        front: `Qual erro evitar neste tipo de questao? ${attempt.enunciado || ""}`.trim(),
        back: `${error.labels[0]}. ${error.nextAction}`
      },
      review: agendarMemoriaAvancada({ quality: attempt.correct ? 4 : 2, confidence: attempt.confidence || 2 })
    };
  });

  return {
    entries,
    clusters: clusterBy(entries, (entry) => entry.error.primary),
    recommendations: Object.keys(clusterBy(entries, (entry) => entry.error.primary)).map((key) => ({
      errorType: key,
      label: ERROR_TYPES[key],
      action: remediateError(key)
    }))
  };
}

function gerarQuestoesAdaptativas({
  tema,
  disciplina,
  habilidades = [],
  quantidade = 10,
  nivel = "medio",
  incluirJustificativa = true
} = {}) {
  const area = baseStudy.detectarArea({ tema, disciplina });
  const count = clamp(quantidade, 1, 50);

  return Array.from({ length: count }, (_, index) => {
    const bloom = BLOOM_LEVELS[index % BLOOM_LEVELS.length];
    const skill = habilidades[index % Math.max(habilidades.length, 1)] || {};
    return {
      id: `q-${index + 1}`,
      tema,
      disciplina,
      area,
      habilidade: skill.code || skill.id || null,
      dificuldade: difficultyByIndex(index, nivel),
      bloom,
      tipo: index % 4 === 0 ? "resposta-aberta" : "multipla-escolha",
      enunciado: criarEnunciadoTemplate({ tema, disciplina, bloom, area }),
      alternativas: index % 4 === 0 ? [] : ["A", "B", "C", "D"].map((letter) => `${letter}. alternativa ${letter}`),
      respostaCorreta: index % 4 === 0 ? "resposta esperada com justificativa" : "A",
      exigeJustificativa: incluirJustificativa || bloom !== "lembrar",
      feedbackPolicy: "explicar o motivo e gerar questao parecida se errar"
    };
  });
}

function gerarSimuladoAdaptativo(options = {}) {
  const questions = gerarQuestoesAdaptativas(options);
  const skills = options.habilidades || [];

  return {
    tema: options.tema,
    disciplina: options.disciplina,
    tipo: options.tipo || "simulado-adaptativo",
    tempoMinutos: options.tempoMinutos || Math.max(10, questions.length * 2),
    questions,
    blueprint: {
      total: questions.length,
      porDificuldade: countBy(questions, "dificuldade"),
      porBloom: countBy(questions, "bloom"),
      habilidades: skills.map((skill) => skill.code || skill.id).filter(Boolean)
    },
    afterSubmit: [
      "corrigir por habilidade",
      "gerar caderno de erros",
      "agendar revisao",
      "recomendar aula curta"
    ]
  };
}

function corrigirSimulado({ questions = [], answers = [] } = {}) {
  const answerMap = new Map(answers.map((answer) => [answer.questionId, answer]));
  const results = questions.map((question) => {
    const answer = answerMap.get(question.id) || {};
    const correct = normalize(answer.value) === normalize(question.respostaCorreta);
    return {
      questionId: question.id,
      habilidade: question.habilidade,
      dificuldade: question.dificuldade,
      bloom: question.bloom,
      correct,
      feedback: correct
        ? "Boa. Agora explique por que essa resposta faz sentido."
        : "Vamos analisar o erro e resolver uma questao parecida."
    };
  });
  const score = results.length ? results.filter((item) => item.correct).length / results.length : 0;

  return {
    score,
    percent: Math.round(score * 100),
    level: masteryToLevel(score),
    results,
    bySkill: groupScore(results, "habilidade"),
    byBloom: groupScore(results, "bloom"),
    nextPlan: score < 0.6 ? "revisao guiada e caderno de erros" : "intercalacao e desafios"
  };
}

function criarRubrica({ tipo = "resposta-aberta", criterios = [] } = {}) {
  const defaults = {
    "resposta-aberta": [
      ["conceito", "Usa o conceito correto.", 4],
      ["justificativa", "Explica o raciocinio com clareza.", 3],
      ["exemplo", "Inclui exemplo ou evidencia.", 2],
      ["linguagem", "Responde em linguagem adequada.", 1]
    ],
    "resolucao-problema": [
      ["dados", "Identifica dados e pergunta.", 2],
      ["estrategia", "Escolhe estrategia adequada.", 3],
      ["execucao", "Resolve passos com coerencia.", 3],
      ["verificacao", "Confere se a resposta faz sentido.", 2]
    ],
    "apresentacao": [
      ["organizacao", "Organiza inicio, meio e fim.", 3],
      ["conteudo", "Explica ideias essenciais.", 3],
      ["clareza", "Fala com clareza e ritmo.", 2],
      ["fontes", "Indica fontes usadas.", 2]
    ]
  };

  const selected = criterios.length ? criterios : defaults[tipo] || defaults["resposta-aberta"];
  return {
    tipo,
    total: selected.reduce((sum, item) => sum + item[2], 0),
    criterios: selected.map(([id, descricao, pontos]) => ({ id, descricao, pontos }))
  };
}

function avaliarRespostaAberta({ resposta = "", palavrasChave = [], rubrica = criarRubrica() } = {}) {
  const text = normalize(resposta);
  const keywordHits = palavrasChave.filter((word) => text.includes(normalize(word)));
  const criteriaResults = rubrica.criterios.map((criterion) => {
    const hitRatio = palavrasChave.length ? keywordHits.length / palavrasChave.length : text.length > 40 ? 0.75 : 0.4;
    const score = round(criterion.pontos * clamp(hitRatio, 0.2, 1), 1);
    return {
      id: criterion.id,
      score,
      max: criterion.pontos,
      feedback: score >= criterion.pontos * 0.7 ? "bom caminho" : "precisa desenvolver melhor"
    };
  });
  const total = round(criteriaResults.reduce((sum, item) => sum + item.score, 0), 1);

  return {
    total,
    max: rubrica.total,
    percent: Math.round((total / rubrica.total) * 100),
    keywordHits,
    criteriaResults,
    nextQuestion: "Que parte da sua resposta voce consegue justificar com uma fonte ou exemplo?"
  };
}

function montarDashboardProfessorPremium({ students = [] } = {}) {
  const summaries = students.map((student) => {
    const skills = student.skills || [];
    const averageMastery = average(skills.map((skill) => skill.mastery || 0));
    const weakSkills = skills.filter((skill) => (skill.mastery || 0) < 0.6);
    return {
      id: student.id,
      name: student.name || "Aluno",
      averageMastery,
      level: masteryToLevel(averageMastery),
      weakSkills,
      dueReviews: student.dueReviews || [],
      alerts: detectarRiscosPedagogicos(student.session || {}).risks
    };
  });

  return {
    classAverage: average(summaries.map((summary) => summary.averageMastery)),
    students: summaries,
    groupsByNeed: clusterBy(summaries.flatMap((summary) => {
      return summary.weakSkills.map((skill) => ({
        studentId: summary.id,
        studentName: summary.name,
        skill: skill.code || skill.id || skill.title,
        mastery: skill.mastery || 0
      }));
    }), (item) => item.skill || "sem-habilidade"),
    teacherActions: [
      "formar grupo de reforco por habilidade",
      "enviar atividade diferenciada",
      "gerar mini-aula",
      "acompanhar caderno de erros",
      "mandar relatorio simples ao responsavel"
    ]
  };
}

function detectarRiscosPedagogicos(session = {}) {
  const text = normalize(`${session.lastMessage || ""} ${session.transcript || ""}`);
  const risks = [];

  if (/qual e a resposta|me da a resposta|so quero a resposta|cola/.test(text)) {
    risks.push({
      type: "answer-dependence",
      level: "medio",
      action: "ativar modo socratico estrito e pedir tentativa"
    });
  }

  if (/sou burro|nao consigo|odeio estudar|desisto|impossivel/.test(text)) {
    risks.push({
      type: "frustration",
      level: "alto",
      action: "reduzir dificuldade, acolher e propor uma etapa menor"
    });
  }

  if (/\b(endereco|telefone|cpf|senha|nome completo|cartao)\b/.test(text)) {
    risks.push({
      type: "personal-data",
      level: "alto",
      action: "bloquear coleta, orientar a nao compartilhar dados pessoais"
    });
  }

  if ((session.minutes || 0) > 90) {
    risks.push({
      type: "overstudy",
      level: "medio",
      action: "sugerir pausa e dividir estudo em blocos menores"
    });
  }

  return {
    safe: risks.length === 0,
    risks
  };
}

function criarContratoSegurancaInfantil({ idade = 11, modo = "aluno" } = {}) {
  return {
    idade,
    modo,
    rules: [
      "Nao coletar dados pessoais desnecessarios.",
      "Nao pedir nome completo, endereco, telefone, CPF, escola ou senha.",
      "Nao criar dependencia emocional com a IA.",
      "Nao substituir professor, responsavel ou profissional humano.",
      "Bloquear conteudo inadequado para idade.",
      "Usar linguagem respeitosa e adequada.",
      "Registrar fontes em relatorios educacionais.",
      "Permitir supervisao por responsavel/professor."
    ],
    dataMinimization: [
      "usar apelido",
      "guardar apenas progresso educacional necessario",
      "separar dados identificaveis de dados pedagogicos",
      "permitir exclusao e exportacao de dados"
    ],
    escalation: [
      "risco de seguranca",
      "pedido de dado pessoal",
      "conteudo sensivel",
      "frustracao intensa",
      "duvida fora do escopo escolar"
    ]
  };
}

function criarModoPesquisaConfiavel({ query, disciplina = "", nivel = DEFAULT_CONTEXT.grade } = {}) {
  const reformulated = [
    `${query} ${disciplina} ${nivel} BNCC`,
    `${query} explicacao para ${nivel}`,
    `${query} exercicios resolvidos ${nivel}`,
    `${query} video aula ${nivel}`
  ].map((item) => item.replace(/\s+/g, " ").trim());

  return {
    query,
    disciplina,
    nivel,
    reformulated,
    sourcePolicy: [
      "priorizar MEC, BNCC, orgaos oficiais e instituicoes educacionais",
      "usar Khan Academy, YouTube Edu, Canal Futura e fontes pedagogicas confiaveis",
      "evitar fontes sem autoria, sem data ou sem objetivo educacional",
      "comparar fontes quando houver divergencia",
      "mostrar links no fim do relatorio"
    ],
    requiredOutput: [
      "resumo",
      "conceitos-chave",
      "exemplos",
      "atividade",
      "fontes pesquisadas",
      "videos recomendados"
    ]
  };
}

function gerarPlanoMetacognitivo({ tema, disciplina, objetivo = "aprender o tema" } = {}) {
  return {
    tema,
    disciplina,
    objetivo,
    antes: [
      "O que eu ja sei?",
      "O que parece dificil?",
      "Como vou saber que aprendi?"
    ],
    durante: [
      "Consigo explicar este passo?",
      "Preciso de exemplo concreto?",
      "Estou lendo ou realmente lembrando?"
    ],
    depois: [
      "O que ficou claro?",
      "Qual erro preciso evitar?",
      "Quando vou revisar?"
    ],
    evidenceBasedMethods: [
      "recuperacao ativa",
      "repeticao espacada",
      "autoexplicacao",
      "analise de erros"
    ]
  };
}

function criarPacoteExportacaoEstudo({ tema, disciplina, formatos = ["pdf", "flashcards", "quiz", "mapa-mental"] } = {}) {
  return {
    tema,
    disciplina,
    packageId: `study-pack-${Date.now()}`,
    formats: formatos.map((format) => ({
      format,
      requiredSections: requiredSectionsForFormat(format),
      mustIncludeSources: true,
      mustIncludeBncc: true
    })),
    qualityChecklist: [
      "linguagem adequada ao 6o ano",
      "fonte oficial ou educacional",
      "atividade de recuperacao ativa",
      "feedback de erro",
      "proxima revisao agendada"
    ]
  };
}

function gerarExperimentoSeguroCiencias({ tema, disciplina = "Ciencias", materiais = [] } = {}) {
  const area = baseStudy.detectarArea({ tema, disciplina });
  const forbidden = ["fogo", "acido", "soda", "cloro", "eletricidade alta", "vidro quebrado"];
  const unsafe = materiais.some((material) => forbidden.some((word) => normalize(material).includes(word)));

  return {
    tema,
    disciplina,
    area,
    allowed: !unsafe,
    safetyLevel: unsafe ? "requer revisao adulta" : "baixo risco",
    rules: [
      "usar apenas materiais domesticos seguros",
      "ter supervisao adulta quando houver agua, calor ou objeto cortante",
      "nao misturar produtos de limpeza",
      "usar o experimento para observar, registrar e explicar"
    ],
    structure: [
      "pergunta investigavel",
      "hipotese",
      "materiais",
      "passos",
      "observacoes",
      "explicacao",
      "relacao com o tema"
    ],
    adultReviewRequired: unsafe
  };
}

function priorizarBacklogPremium({ ideas = [], weights = {} } = {}) {
  const cfg = {
    impact: weights.impact ?? 0.35,
    learningEvidence: weights.learningEvidence ?? 0.25,
    feasibility: weights.feasibility ?? 0.2,
    safety: weights.safety ?? 0.2
  };

  return ideas.map((idea) => {
    const score = (
      (idea.impact || 0) * cfg.impact
      + (idea.learningEvidence || 0) * cfg.learningEvidence
      + (idea.feasibility || 0) * cfg.feasibility
      + (idea.safety || 0) * cfg.safety
    );
    return { ...idea, score: round(score, 2) };
  }).sort((a, b) => b.score - a.score);
}

function gerarBancoRecursosPremium({ tema, disciplina } = {}) {
  return {
    tema,
    disciplina,
    references: recomendarFontesPremium({ tema, disciplina }),
    studyMethods: baseStudy.selecionarMetodosReforco({ tema, disciplina }).methods,
    multimodal: gerarEstudoMultimodal({ tema, disciplina }).outputs,
    assessment: gerarSimuladoAdaptativo({ tema, disciplina, quantidade: 6 }).blueprint,
    safety: criarContratoSegurancaInfantil()
  };
}

function isSkillReady(node, nodes) {
  if (!node.prerequisites.length) return true;
  return node.prerequisites.every((pre) => {
    const preNode = nodes.find((candidate) => candidate.id === pre);
    return preNode && preNode.mastery >= 0.65;
  });
}

function weightedAttemptScore(attempts) {
  const weights = attempts.map((attempt, index) => {
    const recencyWeight = 1 + index / Math.max(attempts.length, 1);
    const difficultyWeight = attempt.difficulty === "alta" ? 1.2 : attempt.difficulty === "baixa" ? 0.85 : 1;
    return recencyWeight * difficultyWeight;
  });
  const totalWeight = weights.reduce((sum, item) => sum + item, 0);
  const score = attempts.reduce((sum, attempt, index) => {
    const base = attempt.correct ? 1 : 0;
    const partial = typeof attempt.score === "number" ? clamp(attempt.score, 0, 1) : base;
    const hintPenalty = clamp((attempt.hintsUsed || 0) * 0.08, 0, 0.4);
    return sum + Math.max(0, partial - hintPenalty) * weights[index];
  }, 0);
  return totalWeight ? score / totalWeight : 0;
}

function masteryToLevel(mastery) {
  if (mastery < 0.35) return "inicial";
  if (mastery < 0.6) return "em desenvolvimento";
  if (mastery < 0.8) return "proficiente";
  return "dominio forte";
}

function masteryRecommendation(mastery) {
  if (mastery < 0.35) return "usar exemplos concretos e pratica guiada";
  if (mastery < 0.6) return "fazer recuperacao ativa e corrigir erros";
  if (mastery < 0.8) return "intercalar questoes e aumentar dificuldade";
  return "manter revisao espacada e desafios";
}

function inferDifficulty(skill) {
  const prereqCount = (skill.prerequisites || []).length;
  if (prereqCount >= 3) return "alta";
  if (prereqCount >= 1) return "media";
  return "baixa";
}

function allowedDifficulty(current, max) {
  const order = { baixa: 1, media: 2, alta: 3 };
  return (order[current] || 2) <= (order[max] || 2);
}

function matchActivity(activities, skillId, type) {
  return activities.find((activity) => activity.skillId === skillId && activity.type === type)
    || activities.find((activity) => activity.skillId === skillId)
    || { type, skillId, title: type === "review" ? "Revisao ativa" : "Pratica guiada" };
}

function priorityValue(value) {
  const map = { baixa: 1, normal: 2, media: 3, alta: 4, urgente: 5 };
  return map[normalize(value)] || 2;
}

function block(id, minutes, action) {
  return { id, minutes, action };
}

function output(id, description) {
  return { id, description };
}

function remediateError(type) {
  const actions = {
    leitura: "Reformular o enunciado com palavras proprias antes de calcular.",
    conceito: "Revisar conceito com exemplo concreto e contraexemplo.",
    procedimento: "Comparar exemplo resolvido com uma questao parecida.",
    calculo: "Refazer a conta devagar e conferir por estimativa.",
    unidade: "Marcar unidades antes e depois do calculo.",
    sinal: "Verificar operacoes inversas e sinais em cada linha.",
    interpretacao: "Responder em frase completa e ligar ao contexto.",
    chute: "Pedir justificativa antes de aceitar a resposta.",
    formula: "Explicar o que cada termo da formula significa.",
    comunicacao: "Completar resposta com conceito, justificativa e exemplo."
  };
  return actions[type] || actions.conceito;
}

function difficultyByIndex(index, level) {
  if (level === "baixo") return index % 3 === 2 ? "media" : "baixa";
  if (level === "alto") return index % 3 === 0 ? "media" : "alta";
  return ["baixa", "media", "alta"][index % 3];
}

function criarEnunciadoTemplate({ tema, disciplina, bloom, area }) {
  const prefix = {
    lembrar: "Defina",
    compreender: "Explique com suas palavras",
    aplicar: "Resolva uma situacao envolvendo",
    analisar: "Compare duas situacoes sobre",
    avaliar: "Julgue a afirmacao e justifique",
    criar: "Crie um exemplo sobre"
  }[bloom] || "Explique";

  if (area === "matematica") {
    return `${prefix} ${tema} e mostre o raciocinio passo a passo.`;
  }
  if (area === "fisica" || area === "quimica" || area === "ciencias") {
    return `${prefix} ${tema}, usando uma evidencia ou exemplo do cotidiano.`;
  }
  return `${prefix} ${tema} em ${disciplina || "sua disciplina"}.`;
}

function requiredSectionsForFormat(format) {
  const common = ["titulo", "ano", "disciplina", "fontes"];
  const map = {
    pdf: ["resumo", "conceitos", "exemplos", "exercicios", "gabarito"],
    flashcards: ["frente", "verso", "dica", "revisao"],
    quiz: ["enunciado", "alternativas", "gabarito", "feedback"],
    "mapa-mental": ["no central", "ramos", "conexoes"],
    audio: ["roteiro", "pontos-chave", "perguntas"],
    slides: ["objetivo", "topicos", "atividade"]
  };
  return [...common, ...(map[format] || ["conteudo"])];
}

function groupScore(items, key) {
  const groups = clusterBy(items, (item) => item[key] || "sem-categoria");
  return Object.fromEntries(Object.entries(groups).map(([name, values]) => {
    const score = values.filter((item) => item.correct).length / values.length;
    return [name, { total: values.length, score, percent: Math.round(score * 100) }];
  }));
}

function countBy(items, key) {
  return items.reduce((acc, item) => {
    const value = item[key] || "sem-categoria";
    acc[value] = (acc[value] || 0) + 1;
    return acc;
  }, {});
}

function clusterBy(items, getKey) {
  return items.reduce((acc, item) => {
    const key = getKey(item);
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});
}

function dedupeByUrl(items) {
  const map = new Map();
  for (const item of items) {
    if (!item || !item.url) continue;
    map.set(item.url, item);
  }
  return [...map.values()];
}

function average(values) {
  const nums = values.filter((value) => Number.isFinite(value));
  return nums.length ? nums.reduce((sum, item) => sum + item, 0) / nums.length : 0;
}

function daysBetween(a, b) {
  const ms = toDate(b).getTime() - toDate(a).getTime();
  return Math.ceil(ms / 86400000);
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

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, Number(value)));
}

function round(value, digits = 2) {
  const factor = 10 ** digits;
  return Math.round(value * factor) / factor;
}

function normalize(value) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

export {
  DEFAULT_CONTEXT,
  PREMIUM_REFERENCES,
  PREMIUM_MODULES,
  ERROR_TYPES,
  criarBlueprintPremium,
  planejarRoadmapPremium,
  criarMapaConhecimentoBncc,
  calcularDominioAdaptativo,
  selecionarProximaAtividade,
  agendarMemoriaAvancada,
  criarSprintEstudoPremium,
  criarSessaoProfessorPremium,
  criarProtocoloResolucaoPremium,
  gerarEstudoMultimodal,
  avaliarConfiabilidadeFonte,
  recomendarFontesPremium,
  montarRelatorioComCitacoes,
  classificarErro,
  gerarCadernoErrosInteligente,
  gerarQuestoesAdaptativas,
  gerarSimuladoAdaptativo,
  corrigirSimulado,
  criarRubrica,
  avaliarRespostaAberta,
  montarDashboardProfessorPremium,
  detectarRiscosPedagogicos,
  criarContratoSegurancaInfantil,
  criarModoPesquisaConfiavel,
  gerarPlanoMetacognitivo,
  criarPacoteExportacaoEstudo,
  gerarExperimentoSeguroCiencias,
  priorizarBacklogPremium,
  gerarBancoRecursosPremium
};
