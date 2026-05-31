export const learningLevels = [
  { value: "6º ano", label: "6º ano EF", group: "Ensino Fundamental" },
  { value: "7º ano", label: "7º ano EF", group: "Ensino Fundamental" },
  { value: "8º ano", label: "8º ano EF", group: "Ensino Fundamental" },
  { value: "9º ano", label: "9º ano EF", group: "Ensino Fundamental" },
  { value: "1º ano EM", label: "1º ano EM", group: "Ensino Médio" },
  { value: "2º ano EM", label: "2º ano EM", group: "Ensino Médio" },
  { value: "3º ano EM", label: "3º ano EM", group: "Ensino Médio" },
  { value: "ENEM", label: "ENEM", group: "Preparatórios" },
  { value: "Pré-militar fundamental", label: "Pré-militar EF", group: "Preparatórios" },
  { value: "Pré-militar médio", label: "Pré-militar EM", group: "Preparatórios" },
  { value: "ITA/IME", label: "ITA/IME", group: "Preparatórios avançados" },
  { value: "Concursos nível fundamental", label: "Concursos EF", group: "Concursos" },
  { value: "Concursos nível médio", label: "Concursos EM", group: "Concursos" },
];

export const highSchoolSubjects = [
  "Língua Portuguesa",
  "Literatura",
  "Redação",
  "Língua Inglesa",
  "Artes",
  "Educação Física",
  "Matemática",
  "Física",
  "Química",
  "Biologia",
  "História",
  "Geografia",
  "Filosofia",
  "Sociologia",
  "Projeto de Vida",
  "Tecnologia e Cultura Digital",
];

export const preparatoryTracks = [
  {
    title: "ENEM",
    description: "Linguagens, Matemática, Ciências da Natureza, Ciências Humanas e Redação.",
    focus: ["TRI", "competências", "habilidades", "interpretação", "redação", "simulados"],
  },
  {
    title: "Pré-militar EF",
    description: "Preparação para escolas militares e provas seletivas de nível fundamental.",
    focus: ["Português", "Matemática", "História", "Geografia", "Ciências", "simulados"],
  },
  {
    title: "Pré-militar EM",
    description: "Preparação para concursos militares de nível médio e formação técnica.",
    focus: ["Matemática", "Física", "Química", "Português", "Inglês", "Redação"],
  },
  {
    title: "ITA/IME",
    description: "Trilha avançada para matemática, física e química em alto nível.",
    focus: ["álgebra", "geometria", "cálculo", "mecânica", "eletromagnetismo", "físico-química"],
  },
  {
    title: "Concursos nível fundamental",
    description: "Português, Matemática, Raciocínio Lógico, Informática e conhecimentos gerais.",
    focus: ["questões", "lei seca quando aplicável", "revisão", "simulado cronometrado"],
  },
  {
    title: "Concursos nível médio",
    description: "Base comum e disciplinas específicas conforme edital.",
    focus: ["Português", "Matemática", "Raciocínio Lógico", "Informática", "Atualidades", "Redação"],
  },
];

export function getLearningLevelLabel(value: string) {
  return learningLevels.find((level) => level.value === value)?.label || value;
}

export function isPreparatoryLevel(value: string) {
  return /enem|militar|ita|ime|concurso/i.test(value || "");
}

export function isHighSchoolLevel(value: string) {
  return /ensino médio|em|1º ano em|2º ano em|3º ano em|enem|ita|ime|militar médio|nível médio/i.test(value || "");
}
