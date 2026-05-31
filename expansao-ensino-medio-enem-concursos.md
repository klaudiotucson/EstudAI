# Expansao do EstudIA: Fundamental, Ensino Medio, ENEM e Preparartorios

## Objetivo

Expandir o EstudIA para deixar de ser apenas um app do Ensino Fundamental Anos Finais e se tornar uma plataforma completa de estudos para:

- Ensino Fundamental Anos Finais: 6o, 7o, 8o e 9o anos.
- Ensino Medio: 1o, 2o e 3o anos.
- ENEM.
- Pre-militares de nivel fundamental e medio.
- Concursos de nivel fundamental e medio.
- Trilhas avancadas ITA/IME.

## Base MEC/BNCC para Ensino Medio

O app passa a organizar o Ensino Medio pelas areas de conhecimento da BNCC:

- Linguagens e suas Tecnologias: Lingua Portuguesa, Literatura, Redacao, Lingua Inglesa, Artes e Educacao Fisica.
- Matematica e suas Tecnologias: Matematica, funcoes, algebra, geometria, estatistica, probabilidade e raciocinio logico.
- Ciencias da Natureza e suas Tecnologias: Fisica, Quimica e Biologia.
- Ciencias Humanas e Sociais Aplicadas: Historia, Geografia, Filosofia e Sociologia.
- Itinerarios e formacao integral: Projeto de Vida, Tecnologia, Cultura Digital, Investigacao Cientifica e aprofundamentos.

Referencias oficiais usadas:

- BNCC/MEC: https://basenacionalcomum.mec.gov.br/
- INEP/ENEM: https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/enem

## Novas trilhas do app

### Ensino Medio

Cada aluno pode selecionar 1o, 2o ou 3o ano EM. A busca, o professor IA, o planejador e os materiais passam a ajustar:

- linguagem;
- profundidade;
- exemplos;
- nivel de cobranca;
- simulados;
- tipo de feedback;
- estrategia de prova.

### ENEM

O app deve tratar o ENEM como uma trilha propria, com:

- competencias e habilidades;
- interpretacao interdisciplinar;
- Redacao ENEM;
- simulados por area;
- analise de distratores;
- controle de tempo;
- plano de revisao por lacunas;
- atualidades conectadas a repertorio.

### Pre-militares

O app passa a aceitar:

- Pre-militar EF;
- Pre-militar EM;
- escolas militares;
- carreiras militares de nivel medio;
- preparacao por edital.

Recursos recomendados:

- questoes cronometradas;
- revisao por assunto;
- caderno de erros;
- treino de disciplina e rotina;
- simulados semanais;
- bizus validados por explicacao.

### Concursos nivel fundamental e medio

O app passa a apoiar:

- Portugues;
- Matematica;
- Raciocinio Logico;
- Informatica;
- Atualidades;
- Conhecimentos Gerais;
- disciplinas especificas por edital.

Funcao premium recomendada:

- modo edital: o aluno informa banca, cargo e edital, e o app monta trilha de estudo, simulados e revisoes.

### ITA/IME

Trilha avancada para alto rendimento:

- Matematica aprofundada;
- Fisica aprofundada;
- Quimica aprofundada;
- listas dificeis;
- resolucao guiada com demonstracoes;
- simulados longos;
- analise de pre-requisitos;
- caderno de erros pesado;
- plano de longo prazo.

## Implementacao feita no app

Arquivos principais atualizados:

- `src/data/learningTracks.ts`: niveis, Ensino Medio, preparatorios e concursos.
- `src/data/subjects.ts`: novas materias e cards de Fisica, Quimica, Biologia, Historia, Filosofia/Sociologia, Redacao ENEM, ITA/IME e Pre-militares.
- `src/components/dashboard/DashboardPage.tsx`: seletor ampliado, materias novas e area de preparatorios.
- `src/app/api/search/route.ts`: busca agora entende Fundamental, Ensino Medio, ENEM, pre-militares, concursos e ITA/IME.
- `src/app/api/chat/route.ts`: Professor IA agora adapta o nivel e a estrategia para cada trilha.
- `src/components/study/InteractiveStudyPlanner.tsx`: planejador aceita Ensino Medio, ENEM, concursos, pre-militares e ITA/IME.
- `src/lib/funcoes-aprendizado-v2.ts`: configuracoes premium expandidas para novos niveis.
- `src/app/api/english-tutor/route.ts`: tutor de ingles agora atende todas as trilhas.
- `src/app/api/current-affairs/route.ts`: atualidades agora usam o escopo ampliado.

## Comportamento esperado da busca

Quando o aluno digita um tema e clica em buscar:

1. O app identifica o nivel/trilha selecionado.
2. A API tenta gerar resposta estruturada.
3. Se a IA externa falhar, o app cria um fallback local com resumo inicial, mapa mental, fontes oficiais, perguntas e flashcards.
4. A tela muda para o dashboard de estudo em vez de parecer travada.

Isso evita o problema anterior em que o clique em "Buscar" podia parecer que nao fazia nada.
