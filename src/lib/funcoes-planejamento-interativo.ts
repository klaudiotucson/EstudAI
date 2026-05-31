// @ts-nocheck

const STUDY_APP_REFERENCES = Object.freeze([
  {
    app: "MyStudyLife",
    feature: "Calendario academico, tarefas, provas, lembretes inteligentes e Pomodoro.",
    applyAs: "Planejador por disciplina, bimestre, prova e sessao de foco.",
    url: "https://mystudylife.com/"
  },
  {
    app: "Structured",
    feature: "Timeline visual com tarefas, rotinas, subtarefas, Pomodoro e replanejamento.",
    applyAs: "Linha do tempo diaria com blocos reordenaveis e plano anti-atraso.",
    url: "https://apps.apple.com/us/app/structured-daily-planner-todo/id1499198946"
  },
  {
    app: "Focus To-Do",
    feature: "Pomodoro integrado a tarefas, lembretes e estatisticas de tempo.",
    applyAs: "Cronometro conectado ao plano e historico de foco por disciplina.",
    url: "https://play.google.com/store/apps/details?id=com.superelement.pomodoro"
  },
  {
    app: "Forest",
    feature: "Timer gamificado, tags e estatisticas para reduzir distracao.",
    applyAs: "Modo foco com compromisso, recompensa saudavel e bloqueio visual de distracao.",
    url: "https://apps.apple.com/us/app/forest-focus-for-productivity/id866450515"
  },
  {
    app: "Todoist",
    feature: "Prioridades, subtarefas, datas recorrentes e lembretes naturais.",
    applyAs: "Lembretes de estudo, provas e revisoes com prioridade P1-P4.",
    url: "https://get.todoist.help/hc/en-us/articles/205348301-Introduction-to-Reminders"
  }
]);

const ENGLISH_TUTOR_REFERENCES = Object.freeze([
  {
    app: "Duolingo Max",
    feature: "Roleplay, Video Call e Explain My Answer.",
    applyAs: "Cenarios de conversa, explicacao de erro e feedback depois da resposta.",
    url: "https://blog.duolingo.com/duolingo-max/"
  },
  {
    app: "Busuu Conversations",
    feature: "Conversas IA por nivel CEFR, cenario e objetivo com feedback personalizado.",
    applyAs: "Tutor de ingles com A1-B1, roleplay escolar e relatorio de melhoria.",
    url: "https://www.busuu.com/en/languages/language-learning-with-busuu-conversations"
  },
  {
    app: "ELSA Speak",
    feature: "Tutor de pronuncia, conversas IA, vocabulario, gramatica e caminhos personalizados.",
    applyAs: "Treino de fala, shadowing, pronuncia escrita e frases salvas.",
    url: "https://apps.apple.com/us/app/elsa-speak-english-learning/id1083804886"
  }
]);

const CURRENT_AFFAIRS_REFERENCES = Object.freeze([
  {
    source: "Agencia Brasil/EBC",
    role: "noticias nacionais e internacionais de interesse publico",
    url: "https://agenciabrasil.ebc.com.br/feed/ultimasnoticias/feed.xml"
  },
  {
    source: "Camara Noticias RSS",
    role: "educacao civica, legislacao, politica publica e cidadania",
    url: "https://www.camara.leg.br/noticias/rss"
  },
  {
    source: "IBGE Agencia de Noticias",
    role: "dados sociais, economia, geografia, populacao e estatisticas",
    url: "https://agenciadenoticias.ibge.gov.br/agencia-noticias"
  },
  {
    source: "ONU News",
    role: "contexto internacional, direitos humanos, clima, paz e desenvolvimento",
    url: "https://news.un.org/pt/"
  }
]);

const FOCUS_PRESETS = Object.freeze({
  leve: { focus: 15, shortBreak: 4, longBreak: 12, cycles: 3, label: "Leve" },
  pomodoro: { focus: 25, shortBreak: 5, longBreak: 15, cycles: 4, label: "Pomodoro classico" },
  profundo: { focus: 50, shortBreak: 10, longBreak: 20, cycles: 3, label: "Foco profundo" },
  prova: { focus: 45, shortBreak: 8, longBreak: 20, cycles: 4, label: "Treino de prova" },
  leitura: { focus: 30, shortBreak: 6, longBreak: 15, cycles: 3, label: "Leitura ativa" }
});

function criarPlanoEstudosInterativo({
  nome = "Plano de estudos",
  anoEscolar = "6o ano ao Ensino Medio, ENEM e preparatorios",
  periodo = "bimestre",
  semanas = 8,
  horasSemana = 8,
  disciplinas = [],
  provas = [],
  perfilFoco = "normal",
  intensidade = "equilibrado"
} = {}) {
  const normalizedSubjects = normalizarDisciplinas(disciplinas);
  const totalMinutes = Math.max(60, Number(horasSemana || 8) * 60 * Math.max(1, Number(semanas || 8)));
  const pesos = calcularPesos(normalizedSubjects, provas);
  const blocos = distribuirBlocos({ disciplinas: normalizedSubjects, pesos, totalMinutes, semanas, intensidade });
  const planoSemanal = agruparPorSemana(blocos, semanas);
  const planoPorDisciplina = normalizedSubjects.map((disciplina) => criarTrilhaPorDisciplina({
    disciplina,
    blocos: blocos.filter((bloco) => bloco.disciplina === disciplina.nome),
    periodo
  }));

  return {
    nome,
    anoEscolar,
    periodo,
    semanas,
    horasSemana,
    perfilFoco,
    intensidade,
    resumo: {
      totalHoras: Math.round(totalMinutes / 60),
      totalBlocos: blocos.length,
      disciplinas: normalizedSubjects.length,
      provas: provas.length,
      recomendacao: criarRecomendacaoGeral({ intensidade, perfilFoco, provas })
    },
    cronometro: criarCronometroConfiguravel({ perfilFoco, intensidade }),
    planoSemanal,
    planoPorDisciplina,
    lembretes: criarLembretesDeEstudo({ blocos, provas }),
    checkpoints: criarCheckpoints({ semanas, periodo }),
    tecnicas: criarTecnicasPorObjetivo({ intensidade, perfilFoco }),
    foco: criarProtocoloFoco({ perfilFoco, intensidade }),
    provas: criarPlanoProvas({ provas, disciplinas: normalizedSubjects }),
    metricas: ["blocos concluidos", "tempo focado", "questoes resolvidas", "erros corrigidos", "cards revisados"],
    referencias: STUDY_APP_REFERENCES
  };
}

function normalizarDisciplinas(disciplinas = []) {
  const fallback = [
    { nome: "Matematica", conteudos: ["fracoes", "porcentagem", "equacoes"], dificuldade: 4, prioridade: 5 },
    { nome: "Portugues", conteudos: ["interpretacao", "gramatica", "producao textual"], dificuldade: 3, prioridade: 4 },
    { nome: "Ciencias", conteudos: ["materia", "energia", "ambiente"], dificuldade: 3, prioridade: 4 },
    { nome: "Fisica", conteudos: ["cinematica", "dinamica", "eletricidade"], dificuldade: 4, prioridade: 4 },
    { nome: "Quimica", conteudos: ["estequiometria", "solucoes", "organica"], dificuldade: 4, prioridade: 4 },
    { nome: "Biologia", conteudos: ["citologia", "genetica", "ecologia"], dificuldade: 3, prioridade: 4 },
    { nome: "Historia", conteudos: ["Brasil", "mundo", "cidadania"], dificuldade: 3, prioridade: 3 },
    { nome: "Geografia", conteudos: ["cartografia", "clima", "geopolitica"], dificuldade: 3, prioridade: 3 }
  ];

  const source = disciplinas.length ? disciplinas : fallback;
  return source.map((disciplina, index) => ({
    id: disciplina.id || `disc-${index + 1}`,
    nome: disciplina.nome || disciplina.name || `Disciplina ${index + 1}`,
    conteudos: normalizeList(disciplina.conteudos || disciplina.contents || disciplina.topicos),
    dificuldade: clamp(Number(disciplina.dificuldade || disciplina.difficulty || 3), 1, 5),
    prioridade: clamp(Number(disciplina.prioridade || disciplina.priority || 3), 1, 5),
    dominio: clamp(Number(disciplina.dominio || disciplina.mastery || 0.55), 0, 1)
  }));
}

function calcularPesos(disciplinas, provas = []) {
  const provasPorDisciplina = provas.reduce((acc, prova) => {
    const nome = prova.disciplina || prova.subject || "Geral";
    acc[nome] = (acc[nome] || 0) + 2;
    return acc;
  }, {});

  const raw = disciplinas.map((disciplina) => ({
    nome: disciplina.nome,
    peso: disciplina.prioridade + disciplina.dificuldade + (1 - disciplina.dominio) * 4 + (provasPorDisciplina[disciplina.nome] || 0)
  }));
  const total = raw.reduce((acc, item) => acc + item.peso, 0) || 1;
  return raw.reduce((acc, item) => ({ ...acc, [item.nome]: item.peso / total }), {});
}

function distribuirBlocos({ disciplinas, pesos, totalMinutes, semanas, intensidade }) {
  const blockSize = intensidade === "turbo" ? 50 : intensidade === "leve" ? 25 : 40;
  const blocos = [];

  disciplinas.forEach((disciplina) => {
    const minutosDisciplina = Math.max(blockSize, Math.round(totalMinutes * (pesos[disciplina.nome] || 0.2)));
    const quantidade = Math.max(2, Math.round(minutosDisciplina / blockSize));
    const conteudos = disciplina.conteudos.length ? disciplina.conteudos : [disciplina.nome];

    for (let i = 0; i < quantidade; i += 1) {
      const week = (i % semanas) + 1;
      const conteudo = conteudos[i % conteudos.length];
      blocos.push({
        id: `${slugify(disciplina.nome)}-${i + 1}`,
        semana: week,
        disciplina: disciplina.nome,
        conteudo,
        minutos: blockSize,
        prioridade: disciplina.prioridade,
        tipo: escolherTipoBloco(i),
        tecnica: escolherTecnicaBloco(i, disciplina),
        tarefa: criarTarefaBloco({ disciplina, conteudo, index: i }),
        saida: "anotacao ativa + questoes + flashcards dos erros"
      });
    }
  });

  return blocos.sort((a, b) => a.semana - b.semana || b.prioridade - a.prioridade);
}

function escolherTipoBloco(index) {
  const tipos = ["diagnostico", "teoria ativa", "questoes", "caderno de erros", "revisao espacada", "simulado curto"];
  return tipos[index % tipos.length];
}

function escolherTecnicaBloco(index, disciplina) {
  const base = [
    "recuperacao ativa",
    "Cornell",
    "questoes primeiro",
    "autoexplicacao",
    "intercalacao",
    "Feynman",
    "flashcards SRS"
  ];
  if (disciplina.dificuldade >= 4) base.unshift("exemplo resolvido com retirada gradual");
  return base[index % base.length];
}

function criarTarefaBloco({ disciplina, conteudo, index }) {
  const etapas = [
    `Pre-teste rapido de ${conteudo}.`,
    `Resumo analitico e exemplos de ${conteudo}.`,
    `Resolver questoes de ${conteudo} e justificar.`,
    `Corrigir erros de ${conteudo} no caderno de erros.`,
    `Revisar flashcards de ${conteudo}.`,
    `Simulado curto misturando ${conteudo} com conteudos anteriores.`
  ];
  return `${disciplina.nome}: ${etapas[index % etapas.length]}`;
}

function agruparPorSemana(blocos, semanas) {
  return Array.from({ length: semanas }, (_, index) => {
    const semana = index + 1;
    const weekBlocks = blocos.filter((bloco) => bloco.semana === semana);
    return {
      semana,
      foco: semana % 4 === 0 ? "checkpoint e simulado" : "aprendizagem ativa",
      minutos: weekBlocks.reduce((acc, bloco) => acc + bloco.minutos, 0),
      blocos: weekBlocks,
      fechamento: semana % 2 === 0 ? "revisao acumulada + caderno de erros" : "flashcards + recuperacao ativa"
    };
  });
}

function criarTrilhaPorDisciplina({ disciplina, blocos, periodo }) {
  return {
    disciplina: disciplina.nome,
    periodo,
    conteudos: disciplina.conteudos,
    dificuldade: disciplina.dificuldade,
    prioridade: disciplina.prioridade,
    dominioInicial: disciplina.dominio,
    estrategia: disciplina.dominio < 0.5
      ? "fundamentos primeiro, exemplos guiados e questoes curtas"
      : "questoes intercaladas, simulados e explicacao Feynman",
    blocos,
    entregaFinal: "mini simulado + resumo de lacunas + plano de revisao"
  };
}

function criarCronometroConfiguravel({ perfilFoco = "normal", intensidade = "equilibrado" } = {}) {
  if (perfilFoco === "disperso") return FOCUS_PRESETS.leve;
  if (perfilFoco === "prova" || intensidade === "prova") return FOCUS_PRESETS.prova;
  if (perfilFoco === "leitura") return FOCUS_PRESETS.leitura;
  if (intensidade === "turbo") return FOCUS_PRESETS.profundo;
  return FOCUS_PRESETS.pomodoro;
}

function criarLembretesDeEstudo({ blocos, provas = [] }) {
  const lembretesBlocos = blocos.slice(0, 12).map((bloco, index) => ({
    id: `rem-bloco-${index + 1}`,
    tipo: "estudo",
    titulo: `${bloco.disciplina}: ${bloco.conteudo}`,
    quando: `Semana ${bloco.semana}, ${sugestaoDia(index)} as ${sugestaoHorario(index)}`,
    antecedencia: "15 min antes",
    prioridade: bloco.prioridade >= 4 ? "P1" : "P2",
    acao: "abrir cronometro e iniciar bloco"
  }));

  const lembretesProvas = provas.map((prova, index) => ({
    id: `rem-prova-${index + 1}`,
    tipo: "prova",
    titulo: `Prova de ${prova.disciplina || prova.subject || "disciplina"}`,
    quando: prova.data || prova.date || "data a definir",
    antecedencia: "7 dias, 3 dias, 1 dia e 2 horas antes",
    prioridade: "P1",
    acao: "abrir modo prova e revisar caderno de erros"
  }));

  return [...lembretesProvas, ...lembretesBlocos];
}

function criarCheckpoints({ semanas, periodo }) {
  const checkpoints = [];
  for (let semana = 2; semana <= semanas; semana += 2) {
    checkpoints.push({
      semana,
      titulo: `Checkpoint ${semana}/${semanas}`,
      atividades: [
        "simulado curto",
        "revisar caderno de erros",
        "recalcular prioridades",
        "ajustar proximos blocos"
      ]
    });
  }
  return {
    periodo,
    regra: "A cada 2 semanas o plano se adapta ao desempenho real.",
    checkpoints
  };
}

function criarTecnicasPorObjetivo({ intensidade, perfilFoco }) {
  const tecnicas = [
    "recuperacao ativa",
    "repeticao espacada",
    "intercalacao",
    "autoexplicacao",
    "Cornell",
    "SQ3R",
    "Feynman",
    "caderno de erros",
    "simulado cronometrado",
    "duas passagens na prova"
  ];
  if (intensidade === "turbo") tecnicas.push("questoes primeiro", "agenda retrospectiva", "bloco de erro pesado");
  if (perfilFoco === "disperso") tecnicas.push("modo foco sem distracao", "micro metas", "pausa ativa");
  return tecnicas;
}

function criarProtocoloFoco({ perfilFoco, intensidade }) {
  const cronometro = criarCronometroConfiguravel({ perfilFoco, intensidade });
  return {
    preset: cronometro.label,
    antes: [
      "escolher uma unica tarefa",
      "separar material",
      "desativar distracoes",
      "definir saida esperada do bloco"
    ],
    durante: [
      "usar cronometro",
      "anotar distracoes para depois",
      "marcar duvidas sem abandonar o bloco",
      "fazer pequena checagem no final"
    ],
    pausa: [
      "levantar",
      "beber agua",
      "evitar redes sociais",
      "voltar com proxima micro meta"
    ],
    ciclos: cronometro.cycles
  };
}

function criarPlanoProvas({ provas = [], disciplinas = [] }) {
  return provas.map((prova, index) => {
    const disciplina = disciplinas.find((item) => item.nome === (prova.disciplina || prova.subject));
    return {
      id: `prova-${index + 1}`,
      disciplina: prova.disciplina || prova.subject || "Disciplina",
      data: prova.data || prova.date || "data a definir",
      peso: prova.peso || prova.weight || 1,
      checklist: [
        "mapear conteudos cobrados",
        "fazer pre-teste",
        "revisar erros antigos",
        "fazer simulado cronometrado",
        "explicar pontos fracos para o tutor IA"
      ],
      foco: disciplina?.conteudos || ["conteudo da prova"],
      rotinaFinal: "24h antes: revisao leve, flashcards fracos e descanso"
    };
  });
}

function criarRecomendacaoGeral({ intensidade, perfilFoco, provas }) {
  if (provas.length) return "Priorize provas proximas, caderno de erros e simulados curtos.";
  if (intensidade === "turbo") return "Use blocos profundos, questoes primeiro e revisao diaria.";
  if (perfilFoco === "disperso") return "Use blocos curtos, metas pequenas e pausas sem tela.";
  return "Mantenha constancia: estudar um pouco, revisar e praticar toda semana.";
}

function criarBlueprintTutorIngles({ nivel = "A1", objetivo = "escola", anoEscolar = "6o ano ao Ensino Medio, ENEM e preparatorios" } = {}) {
  return {
    nivel,
    objetivo,
    anoEscolar,
    modos: [
      "roleplay",
      "explain my answer",
      "pronunciation coach",
      "grammar micro lesson",
      "vocabulary SRS",
      "listening shadowing",
      "school test practice"
    ],
    rotina: [
      "warm-up de vocabulario",
      "frase modelo",
      "tentativa do aluno",
      "feedback curto",
      "segunda tentativa melhorada",
      "card de vocabulario ou gramatica"
    ],
    seguranca: [
      "nao pedir dados pessoais",
      "nao expor crianca",
      "corrigir com acolhimento",
      "usar portugues como apoio quando necessario"
    ],
    referencias: ENGLISH_TUTOR_REFERENCES
  };
}

function criarCuradoriaAtualidades({ itens = [], anoEscolar = "6o ano ao Ensino Medio, ENEM e preparatorios" } = {}) {
  return {
    anoEscolar,
    atualizadoEm: new Date().toISOString(),
    fontes: CURRENT_AFFAIRS_REFERENCES,
    categorias: ["Brasil", "Mundo", "Ciencia", "Economia", "Meio ambiente", "Cidadania"],
    rotinaAluno: [
      "ler 3 manchetes confiaveis",
      "responder: o que aconteceu?",
      "responder: por que importa?",
      "ligar a uma disciplina",
      "criar pergunta de debate"
    ],
    itens: itens.slice(0, 12).map((item, index) => ({
      ...item,
      id: item.id || `atualidade-${index + 1}`,
      perguntaEstudo: `Como essa noticia se conecta com ${item.disciplina || "Geografia, Historia, Ciencias ou Portugues"}?`,
      atividade: "resumo de 3 linhas + uma pergunta critica + uma fonte checada"
    }))
  };
}

function normalizeList(value) {
  if (!value) return [];
  if (Array.isArray(value)) return value.map(String).filter(Boolean);
  return String(value)
    .split(/[,;\n]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function sugestaoDia(index) {
  return ["segunda", "terca", "quarta", "quinta", "sexta", "sabado"][index % 6];
}

function sugestaoHorario(index) {
  return ["18:00", "18:40", "19:20", "10:00", "16:00", "09:30"][index % 6];
}

function slugify(value) {
  return String(value || "item")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, Number(value)));
}

export {
  STUDY_APP_REFERENCES,
  ENGLISH_TUTOR_REFERENCES,
  CURRENT_AFFAIRS_REFERENCES,
  FOCUS_PRESETS,
  criarPlanoEstudosInterativo,
  criarCronometroConfiguravel,
  criarLembretesDeEstudo,
  criarProtocoloFoco,
  criarBlueprintTutorIngles,
  criarCuradoriaAtualidades
};
