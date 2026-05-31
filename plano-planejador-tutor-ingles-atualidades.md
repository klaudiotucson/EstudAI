# Planejador interativo, tutor de ingles e atualidades

## 1. Visao

O app passa a ter tres novos modulos premium:

- Plano de Estudos;
- Tutor Ingles;
- Atualidades.

Objetivo:

- organizar a vida escolar;
- dividir tempo por disciplina, conteudo, prova e periodo;
- manter foco com cronometro configuravel;
- criar lembretes;
- treinar ingles com IA;
- manter o aluno informado com noticias confiaveis.

## 2. Planejador de estudos interativo

Inspiracoes pesquisadas:

- MyStudyLife: calendario escolar, tarefas, provas, lembretes, Pomodoro e agenda academica;
- Structured: timeline visual, subtarefas, rotinas, Pomodoro e replanejamento;
- Focus To-Do: Pomodoro + tarefas + lembretes + estatisticas;
- Forest: foco gamificado, tags e estatisticas de tempo;
- Todoist: prioridades, subtarefas, lembretes recorrentes e linguagem natural.

Como ficou no app:

- aba `Plano de Estudos`;
- configurar ano, periodo, semanas, horas por semana, perfil de foco e intensidade;
- plano por disciplina e conteudo;
- prova/teste com data;
- distribuicao automatica de blocos;
- linha do tempo semanal;
- checklist de blocos concluidos;
- tecnicas aplicadas;
- lembretes;
- cronometro configuravel.

Funcoes criadas:

- `criarPlanoEstudosInterativo`;
- `criarCronometroConfiguravel`;
- `criarLembretesDeEstudo`;
- `criarProtocoloFoco`;
- `criarBlueprintTutorIngles`;
- `criarCuradoriaAtualidades`.

Arquivo:

- `src/lib/funcoes-planejamento-interativo.ts`

## 3. Cronometro configuravel

Presets:

- leve: 15/4;
- Pomodoro classico: 25/5;
- leitura ativa: 30/6;
- prova: 45/8;
- foco profundo: 50/10.

Regras:

- foco disperso usa blocos menores;
- prova usa blocos parecidos com simulado;
- turbo usa foco profundo;
- pausa nao deve virar redes sociais;
- fim do bloco exige registro do que foi aprendido.

## 4. Lembretes

Tipos:

- estudo;
- revisao;
- prova;
- simulado;
- caderno de erros.

Estrategia:

- prova: 7 dias, 3 dias, 1 dia e 2 horas antes;
- estudo: 15 minutos antes;
- tarefa atrasada vira alerta de replanejamento;
- revisao vencida ganha prioridade.

Na versao atual:

- lembretes ficam no plano;
- notificacao do navegador funciona enquanto o app esta aberto e permissao foi dada;
- etapa futura: service worker/PWA para lembretes mesmo com app fechado.

## 5. Tutor IA de ingles

Inspiracoes pesquisadas:

- Duolingo Max: Roleplay, Video Call e Explain My Answer;
- Busuu Conversations: conversas por nivel CEFR, cenario e objetivo, com feedback personalizado;
- ELSA Speak: pronuncia, conversa IA, vocabulario, gramatica e trilha personalizada.

Como ficou no app:

- aba `Tutor Ingles`;
- nivel A1, A2 e B1;
- modos: roleplay, explain my answer, grammar coach, pronunciation coach, vocabulary SRS e test practice;
- cenarios: rotina escolar, apresentacao segura, pedir comida, pedir direcoes, hobbies, revisao de prova e pronuncia;
- feedback:
  - frase do aluno;
  - frase melhor;
  - por que;
  - nova tentativa.

API criada:

- `src/app/api/english-tutor/route.ts`

Comportamento:

- usa IA real se houver chave configurada;
- tem fallback pedagogico se a IA estiver indisponivel;
- nao pede dados pessoais;
- corrige de forma acolhedora.

## 6. Atualidades

Inspiracoes:

- feeds RSS oficiais e jornalismo institucional;
- Agencia Brasil/EBC;
- Camara Noticias;
- IBGE Agencia de Noticias;
- ONU News;
- BBC World.

Como ficou no app:

- aba `Atualidades`;
- busca noticias em feeds;
- classifica por categoria;
- relaciona com disciplina;
- cria pergunta de estudo;
- cria atividade;
- mostra fonte;
- permite atualizar.

API criada:

- `src/app/api/current-affairs/route.ts`

Fontes usadas na API:

- Agencia Brasil RSS;
- BBC World RSS;
- ONU News audio RSS.

Fontes de curadoria no app:

- Agencia Brasil/EBC;
- Camara Noticias RSS;
- IBGE Agencia de Noticias;
- ONU News.

Metodo de estudo de noticia:

- o que aconteceu?
- onde e quando?
- quem foi afetado?
- por que importa?
- qual fonte confirma?

## 7. Arquivos criados

- `src/lib/funcoes-planejamento-interativo.ts`
- `src/components/study/InteractiveStudyPlanner.tsx`
- `src/components/study/EnglishTutorAI.tsx`
- `src/components/study/CurrentAffairsHub.tsx`
- `src/app/api/english-tutor/route.ts`
- `src/app/api/current-affairs/route.ts`
- `plano-planejador-tutor-ingles-atualidades.md`

## 8. Arquivo atualizado

- `src/app/page.tsx`

Novas abas:

- Plano de Estudos;
- Tutor Ingles;
- Atualidades.

## 9. Referencias

- MyStudyLife: https://mystudylife.com/
- Structured: https://apps.apple.com/us/app/structured-daily-planner-todo/id1499198946
- Focus To-Do: https://play.google.com/store/apps/details?id=com.superelement.pomodoro
- Forest: https://apps.apple.com/us/app/forest-focus-for-productivity/id866450515
- Todoist reminders: https://get.todoist.help/hc/en-us/articles/205348301-Introduction-to-Reminders
- Duolingo Max: https://blog.duolingo.com/duolingo-max/
- Busuu Conversations: https://www.busuu.com/en/languages/language-learning-with-busuu-conversations
- ELSA Speak: https://apps.apple.com/us/app/elsa-speak-english-learning/id1083804886
- Agencia Brasil/EBC: https://www.ebc.com.br/sobre/agencia-brasil
- Governo do Brasil RSS: https://www.gov.br/pt-br/rss
- Camara Noticias RSS: https://www.camara.leg.br/noticias/rss
- IBGE Agencia de Noticias: https://agenciadenoticias.ibge.gov.br/agencia-noticias
- ONU News: https://www.un.org/pt/delegate/page/un-news-outlets
