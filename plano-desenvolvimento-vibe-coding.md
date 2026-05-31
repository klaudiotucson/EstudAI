# Plano detalhado para construir o app de estudos com vibe coding

## 1. Nome provisório do produto

Sugestões:

- Estuda.AI 6
- TutorBNCC
- Aprender+ IA
- Mente Guia
- Estudo Mestre

Nome funcional usado neste plano: **Estuda.AI 6**.

## 2. Visão do app

O Estuda.AI 6 será uma plataforma premium de estudos para crianças do 6º ano do Ensino Fundamental, alinhada à BNCC/MEC, com professor IA socrático, busca por temas, resumo robusto com fontes, geração de PDFs, flashcards, mapas mentais, quizzes, simulados, caderno de erros, técnicas de memorização, estudo adaptativo e painel para professor/responsável.

O app deve funcionar como um ecossistema de aprendizagem, não apenas como chatbot.

Objetivo principal:

> Ajudar o aluno a entender, praticar, lembrar e explicar conteúdos escolares com autonomia, segurança e acompanhamento.

## 3. Princípios obrigatórios

1. O professor IA deve ensinar em estilo socrático.
2. O app não deve dar resposta pronta sem tentativa do aluno.
3. Todo resumo, relatório, prova, PDF ou material deve terminar com fontes pesquisadas e vídeos recomendados.
4. O conteúdo deve ser adequado ao 6º ano.
5. A BNCC deve orientar disciplinas, habilidades e trilhas.
6. O app deve reforçar memória de longo prazo com repetição espaçada.
7. O erro deve virar plano de recuperação.
8. O app deve ser seguro para crianças.
9. O responsável/professor deve conseguir acompanhar progresso.
10. O aluno deve estudar por múltiplos formatos: texto, flashcard, quiz, áudio, mapa, PDF e problema guiado.

## 4. Stack recomendada para vibe coding

### Opção recomendada para começar rápido

- Frontend: Next.js com React e TypeScript
- UI: Tailwind CSS
- Componentes: shadcn/ui
- Ícones: lucide-react
- Backend: API Routes do Next.js no início
- Banco: Supabase Postgres
- Autenticação: Supabase Auth
- Storage: Supabase Storage
- IA: OpenAI API ou outro provedor compatível
- PDFs: react-pdf ou pdf-lib
- Mapas mentais: React Flow
- Gráficos: Recharts
- Validação: Zod
- ORM opcional: Prisma

### Por que essa stack

- rápida para vibe coding;
- fácil de evoluir;
- bom ecossistema para IA;
- boa integração com banco;
- permite web app premium primeiro;
- depois pode virar app mobile com React Native/Expo.

## 5. Estrutura de pastas sugerida

```text
estuda-ai-6/
  app/
    page.tsx
    layout.tsx
    dashboard/
    estudos/
    professor/
    flashcards/
    quizzes/
    simulados/
    mapas/
    relatorios/
    responsavel/
    api/
      ai/
      search/
      summaries/
      flashcards/
      quizzes/
      pdf/
      progress/
      sources/
  components/
    ui/
    layout/
    study/
    tutor/
    cards/
    quiz/
    mindmap/
    dashboard/
  lib/
    ai/
    bncc/
    study/
    memory/
    safety/
    sources/
    pdf/
    db/
  data/
    bncc/
    seed/
  types/
  tests/
  docs/
```

## 6. Arquivos já criados neste projeto

### Escopo base

Arquivo: `escopo-aplicativo-estudos-6ano.md`

Contém:

- visão geral;
- base pedagógica;
- busca por assuntos;
- resumo robusto;
- PDFs;
- flashcards;
- técnicas de memorização;
- aba Estudos;
- resolução guiada;
- professor IA socrático;
- segurança;
- arquitetura;
- modelo de dados;
- evolução premium.

### Funções base

Arquivo: `funcoes-estudo.js`

Contém funções para:

- professor IA socrático;
- perguntas socráticas;
- aba Estudos;
- roteiro de resolução;
- métodos de reforço;
- repetição espaçada;
- atividades de fixação;
- fontes e vídeos;
- validação de relatório com fontes;
- caderno de erros.

### Plano premium

Arquivo: `plano-premium-mundial-app-estudos.md`

Contém:

- benchmark mundial;
- diferenciais premium;
- arquitetura premium;
- módulos avançados;
- roadmap premium;
- referências.

### Funções premium

Arquivo: `funcoes-premium-estudo.js`

Contém funções para:

- blueprint premium;
- roadmap;
- mapa adaptativo BNCC;
- domínio por habilidade;
- próximo melhor passo;
- memória avançada;
- sprint de estudo;
- professor premium;
- estudo multimodal;
- confiabilidade de fontes;
- relatório com citações;
- caderno de erros inteligente;
- simulado adaptativo;
- dashboard professor/responsável;
- segurança infantil.

## 7. Persona principal

### Aluno

- 6º ano;
- 11 a 12 anos;
- quer entender conteúdos;
- pode ter dificuldade em matemática, leitura ou memorização;
- precisa de linguagem clara;
- se frustra com respostas longas demais;
- aprende melhor com exemplos, perguntas, prática e feedback.

### Professor

- quer economizar tempo;
- precisa de atividades, provas e relatórios;
- precisa saber onde a turma está com dificuldade;
- precisa revisar o que a IA gera.

### Responsável

- quer acompanhar progresso;
- quer ajudar sem fazer pelo aluno;
- quer segurança e privacidade.

## 8. Produto final desejado

O app completo terá:

- login de aluno, professor e responsável;
- busca por tema;
- resumo robusto com fontes;
- professor IA socrático;
- aba Estudos;
- resolução guiada de problemas;
- flashcards;
- repetição espaçada;
- técnicas de memorização;
- quiz;
- simulado;
- prova;
- mapa mental;
- PDF;
- caderno de erros;
- painel de progresso;
- painel professor/responsável;
- recomendações de vídeos;
- trilha BNCC;
- diagnóstico adaptativo;
- estudo multimodal;
- segurança infantil.

## 9. Fases de construção

## Fase 0. Preparação do projeto

Objetivo: criar a fundação técnica.

Entregas:

- criar app Next.js;
- configurar TypeScript;
- configurar Tailwind;
- configurar shadcn/ui;
- configurar Supabase;
- configurar variáveis de ambiente;
- criar layout base;
- criar design system inicial;
- criar navegação.

Prompt de vibe coding:

```text
Crie um app Next.js com TypeScript e Tailwind para uma plataforma de estudos chamada Estuda.AI 6. 
Use layout de aplicação, não landing page. 
Crie sidebar com abas: Início, Estudos, Professor IA, Flashcards, Quiz, Simulados, Mapas Mentais, Relatórios e Responsável. 
Use visual premium, limpo, educacional, adequado para estudante do 6º ano, com boa acessibilidade.
```

Critérios de aceite:

- app roda localmente;
- navegação funciona;
- visual parece produto real;
- layout responsivo;
- nenhuma página vazia.

## Fase 1. Modelo de dados

Objetivo: definir banco para sustentar o app.

Tabelas principais:

- users;
- profiles;
- student_profiles;
- teacher_profiles;
- guardian_profiles;
- bncc_skills;
- topics;
- study_summaries;
- study_sources;
- video_recommendations;
- flashcard_decks;
- flashcards;
- review_schedules;
- quizzes;
- questions;
- answer_attempts;
- mind_maps;
- generated_pdfs;
- tutor_conversations;
- tutor_messages;
- learning_progress;
- error_notebook_entries;
- diagnostic_sessions;
- simulated_tests;
- consent_records;

Campos importantes:

```text
study_summaries:
  id
  user_id
  topic
  grade
  subject
  bncc_skill_codes
  summary
  key_concepts
  examples
  common_mistakes
  review_questions
  sources
  video_sources
  created_at

flashcards:
  id
  deck_id
  front
  back
  hint
  difficulty
  confidence
  next_review_at
  interval_days
  ease
  lapses

answer_attempts:
  id
  user_id
  question_id
  answer
  is_correct
  confidence
  hints_used
  response_time_sec
  error_type
  created_at
```

Prompt de vibe coding:

```text
Crie o schema SQL/Supabase para o app Estuda.AI 6 com tabelas de usuário, perfis, resumos, fontes, vídeos, flashcards, revisão espaçada, quizzes, tentativas, caderno de erros, conversas com professor IA e progresso por habilidade BNCC. 
Inclua created_at, updated_at, user_id e índices úteis. 
Prepare o schema para segurança por usuário.
```

Critérios de aceite:

- banco criado;
- tabelas relacionadas;
- dados por usuário protegidos;
- campos JSONB para fontes, habilidades e estruturas flexíveis.

## Fase 2. Home/Dashboard do aluno

Objetivo: primeira tela útil do aluno.

Componentes:

- saudação;
- barra de busca por assunto;
- cards de revisão pendente;
- progresso semanal;
- últimos temas estudados;
- próximos flashcards;
- botão para professor IA;
- botão para simulado;
- alerta de revisão.

Prompt de vibe coding:

```text
Crie o dashboard do aluno do Estuda.AI 6. 
A primeira ação deve ser uma busca por assunto. 
Mostre cards de revisão pendente, últimos estudos, progresso por disciplina e botão para falar com o professor IA. 
Use dados mockados por enquanto, mas estruture os componentes para receber dados reais depois.
```

Critérios de aceite:

- dashboard parece pronto para uso;
- busca é destaque;
- aluno entende o que fazer;
- cards não sobrecarregam.

## Fase 3. Busca por assunto com fontes

Objetivo: pesquisar tema e gerar base de estudo.

Fluxo:

1. aluno digita tema;
2. app detecta disciplina;
3. app busca/seleciona fontes;
4. IA gera resumo robusto;
5. IA lista fontes e vídeos;
6. app salva histórico.

Contrato de resposta:

```json
{
  "topic": "",
  "subject": "",
  "grade": "6º ano",
  "bnccSkillCodes": [],
  "summary": "",
  "keyConcepts": [],
  "examples": [],
  "commonMistakes": [],
  "reviewQuestions": [],
  "studyMethods": [],
  "sources": [],
  "videoSources": [],
  "researchedAt": ""
}
```

Prompt de vibe coding:

```text
Implemente a busca por assunto. 
Ao pesquisar, chame uma função de IA que retorna JSON estruturado com tema, disciplina, resumo robusto, conceitos-chave, exemplos, erros comuns, perguntas de revisão, fontes pesquisadas e vídeos recomendados. 
Nunca permita salvar resumo sem fontes. 
Mostre o resultado em uma página de estudo.
```

Critérios de aceite:

- busca retorna conteúdo estruturado;
- fontes aparecem ao final;
- vídeos aparecem ao final;
- relatório sem fonte é bloqueado;
- botão "gerar flashcards" aparece.

## Fase 4. Página de estudo

Objetivo: centralizar tudo que nasce de um tema.

Abas internas:

- Resumo;
- Como resolver;
- Flashcards;
- Quiz;
- Mapa mental;
- Simulado;
- PDF;
- Fontes e vídeos;
- Caderno de erros.

Prompt de vibe coding:

```text
Crie a página de estudo de um tema. 
Use abas: Resumo, Como Resolver, Flashcards, Quiz, Mapa Mental, Simulado, PDF, Fontes e Vídeos, Caderno de Erros. 
O resumo deve ser a aba inicial. 
Inclua botões para gerar cada material com base no resumo.
```

Critérios de aceite:

- todas as abas existem;
- resumo alimenta outras abas;
- fontes sempre visíveis;
- aluno consegue continuar estudando sem voltar ao dashboard.

## Fase 5. Professor IA socrático

Objetivo: criar tutor com comportamento pedagógico correto.

Regras:

- perguntar antes de responder;
- pedir tentativa;
- dar pistas graduais;
- detectar chute;
- pedir justificativa;
- fechar com resumo do raciocínio;
- registrar erro quando necessário;
- não coletar dados pessoais.

Modos:

- Socrático;
- Resolver problema;
- Revisão de prova;
- Explicar com exemplos;
- Tutor de erro;
- Responsável ajudando.

Prompt de vibe coding:

```text
Crie o chat do Professor IA do Estuda.AI 6. 
Ele deve usar estilo socrático: não dar resposta pronta no primeiro momento, pedir tentativa, fazer perguntas guiadas e dar pistas graduais. 
Inclua seletor de modo: Socrático, Resolver Problema, Revisão, Explicar com Exemplos, Tutor de Erro e Responsável. 
Use as regras de segurança infantil e bloqueie pedidos de dados pessoais.
```

Prompt de sistema para IA:

```text
Você é um professor IA para estudantes do 6º ano no Brasil.
Use estilo socrático.
Faça uma pergunta por vez.
Não entregue resposta pronta sem tentativa do aluno.
Se o aluno pedir a resposta, ofereça uma pista.
Peça que o aluno explique o raciocínio.
Ao final, resuma o caminho mental usado.
Não colete dados pessoais.
Use linguagem clara, acolhedora e adequada à idade.
```

Critérios de aceite:

- professor não entrega resposta direta inicialmente;
- chat faz perguntas úteis;
- há níveis de pista;
- conversa pode gerar entrada no caderno de erros.

## Fase 6. Flashcards e repetição espaçada

Objetivo: transformar estudo em memória de longo prazo.

Tipos de card:

- pergunta/resposta;
- lacuna;
- verdadeiro/falso;
- conceito/exemplo;
- erro/correção;
- passo de resolução;
- imagem/texto no futuro.

Dados do card:

- frente;
- verso;
- dica;
- dificuldade;
- confiança 1 a 5;
- próxima revisão;
- intervalo;
- facilidade;
- lapsos.

Prompt de vibe coding:

```text
Implemente flashcards com repetição espaçada. 
O aluno deve avaliar confiança de 1 a 5 após virar o card. 
Calcule próxima revisão usando qualidade, confiança, intervalo anterior, facilidade e lapsos. 
Crie uma fila diária de revisão e destaque cards difíceis.
```

Critérios de aceite:

- cards são gerados a partir do resumo;
- aluno revisa e informa confiança;
- próxima data é calculada;
- cards errados voltam mais cedo;
- há tela "Revisar hoje".

## Fase 7. Técnicas de memorização e fixação

Objetivo: oferecer estudo inteligente.

Métodos:

- recuperação ativa;
- repetição espaçada;
- intercalacão;
- elaboração;
- exemplos concretos;
- codificação dupla;
- autoexplicação;
- Feynman;
- mnemônicos;
- análise de erros;
- caderno de erros;
- prática deliberada;
- comparação conceitual.

Prompt de vibe coding:

```text
Crie um gerador de plano de reforço. 
Com base no tema, disciplina, percentual de acertos e dificuldade, selecione métodos de estudo adequados: recuperação ativa, repetição espaçada, elaboração, exemplos concretos, codificação dupla, autoexplicação, Feynman, mnemônicos, análise de erros e prática deliberada. 
Mostre um plano diário simples para o aluno.
```

Critérios de aceite:

- plano muda conforme desempenho;
- aluno recebe ações claras;
- métodos não aparecem só como texto, mas como atividades.

## Fase 8. Quiz

Objetivo: testar entendimento rapidamente.

Tipos:

- múltipla escolha;
- verdadeiro/falso;
- completar;
- resposta curta;
- justificar resposta.

Feedback:

- correto;
- incorreto;
- explicação;
- pista;
- questão parecida;
- habilidade BNCC relacionada.

Prompt de vibe coding:

```text
Crie módulo de Quiz. 
Gere 5 a 10 questões a partir do resumo. 
Após cada resposta, mostre feedback, explicação e sugestão de revisão. 
Se o aluno errar, registre possível erro e ofereça questão parecida.
```

Critérios de aceite:

- quiz gera perguntas coerentes;
- feedback é imediato;
- erro vira revisão;
- resultado final mostra pontos fortes e fracos.

## Fase 9. Simulados e provas

Objetivo: criar avaliação formal.

Configurações:

- disciplina;
- tema;
- quantidade;
- dificuldade;
- tempo;
- com/sem gabarito;
- por habilidade BNCC;
- modo aluno;
- modo professor.

Relatório:

- nota;
- acertos por habilidade;
- erros por tipo;
- plano de estudo;
- flashcards gerados;
- fontes.

Prompt de vibe coding:

```text
Implemente simulados adaptativos. 
Permita escolher tema, disciplina, quantidade de questões, dificuldade e tempo. 
Cada questão deve ter gabarito, justificativa da correta, explicação das erradas e habilidade BNCC quando possível. 
Ao finalizar, gere relatório por habilidade e plano de revisão.
```

Critérios de aceite:

- simulado com timer;
- correção automática;
- relatório detalhado;
- exportação PDF;
- plano pós-prova.

## Fase 10. Caderno de erros inteligente

Objetivo: transformar erro em aprendizagem.

Classificações:

- leitura;
- conceito;
- procedimento;
- cálculo;
- unidade;
- sinal;
- interpretação;
- chute;
- fórmula;
- comunicação.

Cada erro deve gerar:

- causa provável;
- explicação;
- flashcard;
- questão parecida;
- revisão agendada;
- orientação do professor IA.

Prompt de vibe coding:

```text
Crie o Caderno de Erros Inteligente. 
Sempre que o aluno errar quiz, simulado ou problema, classifique o erro em leitura, conceito, procedimento, cálculo, unidade, sinal, interpretação, chute, fórmula ou comunicação. 
Gere correção, flashcard de erro, questão parecida e próxima revisão.
```

Critérios de aceite:

- erros são salvos;
- aluno vê histórico;
- app mostra padrão de erro;
- app recomenda ação concreta.

## Fase 11. Mapas mentais

Objetivo: criar visão visual do tema.

Recursos:

- nó central;
- ramos;
- sub-ramos;
- clicar em nó para perguntar ao professor IA;
- exportar imagem/PDF;
- editar nós;
- usar React Flow.

Prompt de vibe coding:

```text
Crie módulo de mapa mental com React Flow. 
Gere mapa a partir do resumo com nó central, ramos principais e sub-ramos. 
Permita expandir, editar, exportar e clicar em um nó para perguntar ao Professor IA sobre aquele ponto.
```

Critérios de aceite:

- mapa visual funciona;
- nós são clicáveis;
- exportação existe;
- mapa vem do resumo.

## Fase 12. PDFs

Objetivo: gerar material imprimível.

Tipos:

- resumo;
- lista de exercícios;
- simulado;
- prova;
- roteiro de aula;
- relatório de progresso.

Cada PDF deve ter:

- capa;
- tema;
- disciplina;
- ano;
- habilidade BNCC;
- conteúdo;
- exercícios;
- gabarito, se aplicável;
- fontes;
- vídeos.

Prompt de vibe coding:

```text
Implemente geração de PDF para resumo, lista de exercícios, simulado, prova e relatório. 
Todo PDF deve incluir fontes pesquisadas, vídeos recomendados, data da geração e habilidade BNCC quando disponível.
```

Critérios de aceite:

- PDF baixa corretamente;
- layout limpo;
- fontes aparecem;
- há versão aluno e professor para provas.

## Fase 13. Resolução guiada de Matemática, Física e Química

Objetivo: ensinar processo, não só resultado.

Matemática:

- entender problema;
- dados;
- incógnita;
- estratégia;
- equação/operação;
- resolver;
- conferir.

Física introdutória:

- fenômeno;
- grandezas;
- unidades;
- relação;
- cálculo;
- interpretação.

Química introdutória:

- substância/mistura/transformação;
- evidências;
- propriedades;
- classificação;
- justificativa.

Prompt de vibe coding:

```text
Crie a aba Como Resolver. 
Para Matemática, Física introdutória e Química introdutória, mostre roteiro por etapas. 
Em cada etapa, o aluno deve tentar responder antes de receber a explicação. 
Inclua botão de pista, exemplo parecido e verificação final.
```

Critérios de aceite:

- aluno interage por etapa;
- não recebe solução toda de uma vez;
- cada etapa tem pergunta socrática;
- erro pode ser salvo.

## Fase 14. Diagnóstico adaptativo BNCC

Objetivo: descobrir nível real do aluno.

Fluxo:

1. escolher disciplina;
2. responder perguntas diagnósticas;
3. medir domínio por habilidade;
4. identificar lacunas;
5. recomendar trilha.

Prompt de vibe coding:

```text
Implemente diagnóstico adaptativo por disciplina. 
Use perguntas progressivas para estimar domínio por habilidade. 
Ao final, mostre mapa de domínio: inicial, em desenvolvimento, proficiente e domínio forte. 
Recomende próximos temas de estudo.
```

Critérios de aceite:

- domínio calculado;
- lacunas visíveis;
- próxima atividade recomendada;
- dashboard atualiza.

## Fase 15. Mapa de conhecimento BNCC

Objetivo: criar trilha inteligente.

Cada nó:

- habilidade;
- conceito;
- pré-requisitos;
- domínio;
- atividades;
- fontes;
- revisão.

Prompt de vibe coding:

```text
Crie mapa de conhecimento BNCC. 
Cada habilidade deve ser um nó com pré-requisitos, domínio do aluno e atividades recomendadas. 
O app deve escolher o próximo melhor passo com base em domínio, pré-requisitos e revisões pendentes.
```

Critérios de aceite:

- mapa existe por disciplina;
- pré-requisitos funcionam;
- app recomenda próximo passo.

## Fase 16. Painel do responsável

Objetivo: acompanhamento simples.

Mostrar:

- tempo de estudo;
- temas estudados;
- progresso;
- dificuldades;
- revisões pendentes;
- alertas;
- como ajudar;
- relatórios.

Prompt de vibe coding:

```text
Crie painel do responsável. 
Mostre progresso do aluno, temas estudados, dificuldades recorrentes, revisões pendentes e sugestões de como ajudar sem dar resposta pronta. 
Inclua resumo seguro das interações com IA, sem expor dados sensíveis.
```

Critérios de aceite:

- responsável entende progresso;
- há ações recomendadas;
- não expõe conversa completa desnecessariamente.

## Fase 17. Painel do professor

Objetivo: uso escolar.

Mostrar:

- turmas;
- alunos;
- domínio por habilidade;
- grupos por dificuldade;
- provas geradas;
- relatórios;
- atividades diferenciadas;
- alertas.

Prompt de vibe coding:

```text
Crie painel do professor. 
Permita ver turma, domínio por habilidade BNCC, alunos com dificuldade, grupos recomendados, atividades diferenciadas, provas geradas e relatórios. 
Inclua botão para gerar atividade de reforço para grupo de alunos.
```

Critérios de aceite:

- professor vê turma;
- grupos por lacuna;
- gera atividade;
- exporta relatório.

## Fase 18. Estudo multimodal

Objetivo: o mesmo tema virar vários formatos.

Formatos:

- resumo;
- flashcards;
- quiz;
- mapa mental;
- PDF;
- áudio;
- slides;
- glossário;
- tabela comparativa;
- linha do tempo;
- experimento seguro.

Prompt de vibe coding:

```text
Crie gerador multimodal. 
A partir de um resumo, permita gerar flashcards, quiz, mapa mental, PDF, roteiro de áudio, slides, glossário, tabela comparativa e atividade prática segura quando for Ciências.
```

Critérios de aceite:

- materiais são gerados do mesmo resumo;
- fontes acompanham todos;
- usuário escolhe formato.

## Fase 19. Acessibilidade e inclusão

Objetivo: tornar o app usável por mais alunos.

Recursos:

- fonte ajustável;
- alto contraste;
- modo foco;
- leitura em voz alta;
- linguagem simples;
- glossário;
- sessões curtas;
- menos distrações;
- teclado acessível;
- alt text em imagens.

Prompt de vibe coding:

```text
Adicione recursos de acessibilidade: modo foco, fonte ajustável, alto contraste, leitura em voz alta, glossário, botões grandes e navegação por teclado. 
Garanta que textos não estourem no mobile.
```

Critérios de aceite:

- app usável no mobile;
- contraste adequado;
- botões acessíveis;
- modo foco existe.

## Fase 20. Segurança infantil e privacidade

Objetivo: proteger crianças.

Regras:

- coletar mínimo de dados;
- não pedir nome completo;
- não pedir endereço;
- não pedir telefone;
- não pedir CPF;
- não pedir senha;
- consentimento de responsável;
- logs educacionais;
- exclusão de dados;
- filtros de conteúdo;
- IA sem dependência emocional.

Prompt de vibe coding:

```text
Implemente camada de segurança infantil. 
Bloqueie coleta de dados pessoais como nome completo, endereço, telefone, CPF, escola e senha. 
Inclua consentimento do responsável, política de privacidade simplificada, exclusão de conta e filtros de conteúdo inadequado.
```

Critérios de aceite:

- dados pessoais bloqueados no chat;
- consentimento registrado;
- responsável tem controle;
- há logs de segurança.

## Fase 21. Gamificação saudável

Objetivo: motivar sem viciar.

Usar:

- metas diárias;
- sequência de estudo;
- conquistas por domínio;
- medalha por corrigir erro;
- celebração de revisão;
- descanso recomendado;
- sem ranking obrigatório.

Prompt de vibe coding:

```text
Crie gamificação saudável. 
Inclua metas diárias, sequência de estudos, conquistas por revisar, entender e corrigir erros. 
Evite ranking competitivo como padrão. 
Inclua lembrete de pausa após sessões longas.
```

Critérios de aceite:

- motivação sem excesso;
- progresso real vale mais que pontos;
- app recomenda pausa.

## Fase 22. Administração e curadoria

Objetivo: controlar qualidade.

Recursos:

- painel admin;
- revisar conteúdos gerados;
- aprovar fontes;
- bloquear fontes;
- editar habilidades BNCC;
- auditar prompts;
- ver erros da IA;
- gerenciar usuários.

Prompt de vibe coding:

```text
Crie painel administrativo para curadoria. 
Permita revisar conteúdos gerados pela IA, aprovar ou bloquear fontes, editar habilidades BNCC, auditar prompts e visualizar alertas de segurança.
```

Critérios de aceite:

- admin revisa conteúdo;
- fontes podem ser bloqueadas;
- prompts versionados.

## Fase 23. Testes

Objetivo: garantir qualidade.

Testes necessários:

- funções de memória;
- funções de domínio;
- validação de fontes;
- segurança infantil;
- geração de quiz;
- correção de simulado;
- criação de PDF;
- permissões por perfil;
- responsividade;
- acessibilidade.

Prompt de vibe coding:

```text
Crie testes unitários para as funções de estudo, memória, domínio adaptativo, fontes, caderno de erros e segurança infantil. 
Crie também testes de integração para busca, geração de resumo, flashcards e quiz.
```

Critérios de aceite:

- testes rodam;
- funções principais cobertas;
- falha se relatório não tiver fonte.

## Fase 24. Deploy

Objetivo: publicar.

Recomendação:

- Vercel para frontend/backend Next.js;
- Supabase para banco/auth/storage;
- domínio próprio;
- variáveis seguras;
- logs;
- backups;
- monitoramento.

Checklist:

- env vars configuradas;
- autenticação funcionando;
- banco com RLS;
- logs de erro;
- política de privacidade;
- termos de uso;
- consentimento do responsável;
- teste mobile;
- teste desktop.

Prompt de vibe coding:

```text
Prepare o app para deploy na Vercel com Supabase. 
Configure variáveis de ambiente, tratamento de erro, loading states, páginas de erro, política de privacidade e termos de uso. 
Garanta que o app funcione bem em mobile e desktop.
```

## 10. Ordem ideal de implementação

1. Setup técnico.
2. Layout base.
3. Banco e auth.
4. Dashboard aluno.
5. Busca por tema.
6. Resumo com fontes.
7. Página de estudo.
8. Professor IA socrático.
9. Flashcards.
10. Repetição espaçada.
11. Quiz.
12. Caderno de erros.
13. PDF.
14. Simulado.
15. Mapa mental.
16. Resolução guiada.
17. Plano de reforço.
18. Painel responsável.
19. Painel professor.
20. Diagnóstico adaptativo.
21. Mapa BNCC.
22. Estudo multimodal.
23. Acessibilidade.
24. Segurança avançada.
25. Curadoria/admin.
26. Testes.
27. Deploy.

## 11. MVP enxuto, mas premium

Observacao importante: este bloco fica mantido apenas como referencia de caminho reduzido. A decisao atual do produto e implementar uma **V1 completa, com tudo incluso antes do primeiro lancamento publico**. Para esse caminho, use o arquivo `plano-v1-completa-tudo-incluso.md`.

Atualizacao adicional: a V1 completa agora tambem inclui resumo analitico, PDF ilustrado com imagens, salvamento do PDF no dispositivo, tecnicas comprovadas de estudo ativo, image occlusion, modo Feynman, modo recuperar da memoria, diario metacognitivo e orientador de fontes. Consulte `novas-funcoes-premium-estudo-e-pdf.md` e `funcoes-aprendizado-avancadas.js`.

Se quiser lançar uma primeira versão boa, fazer:

- login;
- dashboard;
- busca por tema;
- resumo com fontes;
- professor IA socrático;
- flashcards;
- repetição espaçada;
- quiz;
- caderno de erros;
- PDF;
- painel simples do responsável.

Isso já entrega valor forte.

## 12. Versão premium completa

Pela decisao atual, os itens desta secao deixam de ser "depois" e passam a fazer parte da primeira versao publica. O desenvolvimento ainda deve acontecer por blocos internos, mas o lancamento da V1 so deve ocorrer quando esses recursos estiverem implementados, testados e integrados.

Depois adicionar:

- diagnóstico adaptativo;
- mapa BNCC;
- simulados avançados;
- professor/painel de turmas;
- mapas mentais interativos;
- áudio;
- slides;
- OCR de exercício;
- quadro branco;
- leitura em voz alta;
- estudo offline;
- biblioteca curada;
- integrações escolares.

## 13. Prompts mestres para vibe coding

### Prompt mestre do produto

```text
Você está construindo o Estuda.AI 6, uma plataforma premium de estudos para alunos do 6º ano do Ensino Fundamental no Brasil, alinhada à BNCC/MEC.
O app deve ter busca por assunto, resumo robusto com fontes, professor IA socrático, flashcards, repetição espaçada, quiz, simulado, mapa mental, PDF, caderno de erros, técnicas de memorização, resolução guiada e painel para responsável/professor.
Priorize aprendizagem ativa, segurança infantil, acessibilidade e design premium.
Não crie landing page; crie o app funcional.
```

### Prompt mestre do professor IA

```text
Você é um professor IA socrático para estudantes do 6º ano.
Seu objetivo é ajudar o aluno a pensar.
Não dê resposta pronta no primeiro momento.
Peça tentativa.
Faça uma pergunta por vez.
Use pistas graduais.
Peça justificativa.
Se o aluno errar, acolha, explique o raciocínio e proponha nova tentativa.
Ao final, resuma o caminho mental.
Não colete dados pessoais.
Use linguagem clara e adequada para crianças.
```

### Prompt mestre de resumo

```text
Gere um resumo robusto para aluno do 6º ano.
Inclua disciplina, habilidade BNCC se identificável, explicação, conceitos-chave, exemplos, erros comuns, perguntas de revisão, técnicas de fixação, fontes pesquisadas e vídeos recomendados.
Não invente fontes.
Se não houver fonte suficiente, avise.
Retorne JSON estruturado.
```

### Prompt mestre de quiz

```text
Gere um quiz sobre o tema estudado para aluno do 6º ano.
Crie questões progressivas, com alternativas, gabarito, justificativa da correta, explicação das erradas, habilidade BNCC se possível e feedback pedagógico.
Inclua ao menos uma questão que peça justificativa.
```

### Prompt mestre de caderno de erros

```text
Analise a resposta do aluno e classifique o erro.
Tipos possíveis: leitura, conceito, procedimento, cálculo, unidade, sinal, interpretação, chute, fórmula, comunicação.
Explique a causa provável, dê uma pista, gere uma questão parecida e crie um flashcard de erro.
```

## 14. Qualidade pedagógica

Checklist de cada conteúdo gerado:

- está adequado ao 6º ano?
- tem fonte?
- tem exemplo concreto?
- tem pergunta de verificação?
- tem atividade ativa?
- tem linguagem clara?
- evita resposta pronta?
- cita BNCC só quando houver confiança?
- indica vídeos confiáveis?
- gera próximo passo?

## 15. Qualidade visual

Direção:

- app calmo e premium;
- sem excesso de cores;
- cards úteis, não decorativos;
- foco em estudo;
- boa leitura;
- mobile first;
- botões claros;
- ícones;
- estados vazios úteis;
- feedback imediato;
- carregamento amigável.

Páginas não devem parecer landing page. A primeira tela deve ser o produto funcionando.

## 16. Métricas de sucesso

Métricas de aprendizagem:

- domínio por habilidade;
- retenção após 7, 15 e 30 dias;
- redução de erros recorrentes;
- taxa de revisão concluída;
- melhora entre simulado 1 e 2;
- quantidade de respostas justificadas.

Métricas de produto:

- busca por tema usada;
- materiais gerados;
- flashcards revisados;
- sessões com professor IA;
- PDFs exportados;
- tempo de estudo produtivo;
- retorno semanal.

Métricas de segurança:

- tentativas de dados pessoais bloqueadas;
- conteúdos sinalizados;
- relatórios sem fonte bloqueados;
- uso excessivo detectado;
- revisão por responsável/professor.

## 17. Riscos e prevenção

### Risco: IA dar resposta pronta

Prevenção:

- prompt socrático;
- exigir tentativa;
- níveis de pista;
- registrar quando resposta direta for usada.

### Risco: fonte inventada

Prevenção:

- salvar fontes reais;
- validar URL;
- bloquear relatório sem fonte;
- separar fonte usada de fonte sugerida.

### Risco: app virar só gerador de texto

Prevenção:

- todo resumo gera atividade;
- revisão espaçada;
- quiz;
- caderno de erros;
- plano de reforço.

### Risco: dados de criança

Prevenção:

- minimização;
- consentimento;
- bloqueio de dados pessoais no chat;
- exclusão de conta.

### Risco: estudo passivo

Prevenção:

- recuperação ativa;
- perguntas;
- justificativa;
- prática intercalada;
- autoexplicação.

## 18. Como usar este plano com vibe coding

Use uma fase por vez.

Para cada fase:

1. cole o prompt da fase;
2. peça para criar arquivos e componentes;
3. rode o app;
4. teste manualmente;
5. peça correção;
6. só depois passe para a próxima fase.

Não tente construir tudo em um prompt só. O app é grande demais para isso.

Ordem recomendada no vibe coding:

```text
1. "Crie a base do app"
2. "Crie o schema do banco"
3. "Crie dashboard"
4. "Implemente busca e resumo"
5. "Implemente professor IA"
6. "Implemente flashcards"
7. "Implemente quiz"
8. "Implemente caderno de erros"
9. "Implemente PDF"
10. "Implemente simulado"
11. "Implemente painel responsável"
12. "Implemente painel professor"
```

## 19. Primeira semana de trabalho sugerida

### Dia 1

- criar projeto;
- layout;
- navegação;
- dashboard mockado.

### Dia 2

- Supabase;
- auth;
- schema inicial;
- perfis.

### Dia 3

- busca por tema;
- página de estudo;
- resumo mockado/IA.

### Dia 4

- fontes e vídeos;
- validação de relatório;
- salvar resumo.

### Dia 5

- professor IA socrático;
- chat;
- segurança básica.

### Dia 6

- flashcards;
- revisão espaçada;
- fila diária.

### Dia 7

- quiz;
- caderno de erros inicial;
- primeiro teste completo.

## 20. Definição de pronto da primeira versão

A primeira versão estará pronta quando:

- aluno consegue entrar;
- pesquisar um tema;
- receber resumo com fontes;
- estudar na página do tema;
- conversar com professor IA socrático;
- gerar flashcards;
- revisar cards;
- fazer quiz;
- errar e receber correção;
- gerar PDF;
- responsável ver progresso básico.

## 21. Próxima evolução técnica

Depois da primeira versão:

- migrar funções JS para TypeScript;
- criar testes automatizados;
- melhorar RLS no Supabase;
- adicionar banco BNCC real;
- adicionar busca web controlada;
- adicionar geração de mapas mentais;
- adicionar simulados completos;
- adicionar painel professor;
- adicionar OCR;
- adicionar modo mobile/app.
