# Novas funcoes premium para estudo, aprendizado, memorizacao e PDF ilustrado

## 1. Objetivo

Adicionar ao app funcoes de estudo realmente uteis, baseadas em:

- ciencia da aprendizagem;
- apps lideres de estudo;
- boas praticas de IA educacional;
- estudo ativo;
- fontes verificaveis;
- seguranca para criancas;
- experiencia premium.

Estas funcoes devem entrar na V1 completa.

## 2. Referencias usadas

## 2.1. Evidencia de aprendizagem

### The Learning Scientists

Estrategias principais:

- pratica espacada;
- pratica de recuperacao;
- elaboracao;
- intercalacao;
- exemplos concretos;
- codificacao dupla.

Aplicacao no app:

- cada resumo vira treino de recuperacao;
- revisao e agendada;
- conceitos sao explicados com exemplos;
- temas parecidos sao comparados;
- mapas e imagens acompanham texto.

Fonte: https://www.learningscientists.org/blog/2016/8/18-1

### What Works Clearinghouse / IES

Recomendacoes relevantes:

- espaciar aprendizagem ao longo do tempo;
- intercalar exemplos resolvidos com problemas;
- combinar graficos com descricao verbal;
- conectar representacoes abstratas e concretas;
- usar quizzes para reexpor conteudos importantes.

Aplicacao no app:

- trilha de revisao;
- problemas guiados;
- PDF com imagens e diagramas;
- quiz frequente;
- exemplos concretos antes de abstrair.

Fonte: https://ies.ed.gov/ncee/wwc/PracticeGuide/1

### Education Endowment Foundation

Metacognicao e autorregulacao tem alto impacto quando alunos aprendem a planejar, monitorar e avaliar o proprio estudo.

Aplicacao no app:

- diario rapido de estudo;
- perguntas "o que eu ja sei?", "onde travei?", "como vou revisar?";
- professor IA modelando raciocinio;
- checklist antes/depois da atividade.

Fonte: https://educationendowmentfoundation.org.uk/education-evidence/teaching-learning-toolkit/metacognition-and-self-regulation

## 2.2. Apps e produtos de referencia

### Quizlet

Recursos relevantes:

- IA transforma materiais em flashcards;
- cria guias de estudo;
- cria testes praticos;
- modos de estudo variados.

Como fica no nosso app:

- busca vira resumo, flashcards, quiz, prova e PDF;
- aluno escolhe dificuldade e formato;
- professor pode gerar material para turma.

Fontes:

- https://quizlet.com/features/ai-flashcard-generator
- https://quizlet.com/features/study-guides
- https://quizlet.com/features/study-modes

### Anki

Recursos relevantes:

- active recall;
- repeticao espacada;
- suporte a imagens, audio e video.

Como fica no nosso app:

- flashcards com imagens ilustrativas;
- fila de revisao diaria;
- cards de erro;
- cards de procedimento.

Fonte: https://docs.ankiweb.net/background.html

### RemNote

Recursos relevantes:

- flashcards dentro das notas;
- repeticao espacada;
- image occlusion;
- gerar cards de PDFs e notas.

Como fica no nosso app:

- resumo analitico ja permite criar cards;
- PDF pode gerar cards;
- imagens do PDF podem virar cards com partes ocultas.

Fontes:

- https://www.remnote.com/feature/spaced-repetition
- https://help.remnote.com/en/articles/6511625-image-occlusion-cards

### Brainscape

Recursos relevantes:

- repeticao baseada em confianca;
- cards que o aluno domina aparecem menos;
- cards fracos aparecem mais.

Como fica no nosso app:

- aluno avalia confianca de 1 a 5;
- app calcula proxima revisao;
- "cards criticos" aparecem no painel.

Fonte: https://brainscape.zendesk.com/hc/en-us/articles/13103043051149-How-does-Brainscape-s-spaced-repetition-algorithm-work-i-e-Confidence-Based-Repetition

### NotebookLM

Recursos relevantes:

- respostas ancoradas em fontes;
- citacoes;
- guias de estudo;
- FAQs;
- audio overview;
- mapas mentais;
- descoberta de fontes.

Como fica no nosso app:

- busca gera relatorio com fontes;
- fontes sao exibidas e verificadas;
- resumo analitico cita de onde veio;
- app cria audio/roteiro e mapa mental.

Fontes:

- https://google-40.mintlify.app/
- https://blog.google/technology/google-labs/notebooklm-discover-sources/

### Microsoft Learning Accelerators

Recursos relevantes:

- Reading Coach;
- Search Coach;
- Math Progress;
- Speaker Coach;
- analytics para professor.

Como fica no nosso app:

- leitura em voz alta;
- orientador de pesquisa confiavel;
- progresso de matematica;
- apresentacao oral;
- painel professor/responsavel.

Fonte: https://www.microsoft.com/en-us/education/learning-tools/learning-accelerators

### StudyFetch, Knowt, Crammi, Cramly, Cram Whiz

Padrao de mercado:

- upload ou entrada de qualquer material;
- gerar notas, flashcards, quizzes, mapas mentais;
- tutor IA;
- estudo personalizado;
- PDFs, imagens, audio e video como entrada.

Como fica no nosso app:

- busca por tema tambem vira um "pacote de estudo";
- no futuro, o aluno podera enviar PDF, foto, audio ou link;
- V1 ja deve nascer preparada para multiplas entradas.

Fontes:

- https://www.studyfetch.com/features/chat
- https://knowt.com/ai-notes
- https://www.crammi.com/
- https://www.cramly.app/
- https://cramwhiz.app/

## 3. Novas funcoes que entram no app

## 3.1. Resumo analitico do resultado da busca

Nome no app:

**Resumo Analitico**

O que faz:

- pega o resultado da busca;
- identifica os topicos mais importantes;
- destaca conceitos-chave;
- explica cada topico;
- mostra exemplos;
- mostra erros comuns;
- mostra relacao com BNCC;
- mostra "o que memorizar";
- mostra "o que entender";
- mostra perguntas provaveis de prova;
- lista fontes e videos.

Como aparece:

Na pagina de estudo, dentro da aba **Resumo**, havera botoes:

- Resumo simples;
- Resumo robusto;
- **Resumo analitico**;
- Resumo para prova;
- Resumo em mapa.

Estrutura do resumo analitico:

```text
1. Ideia central
2. Topicos mais importantes
3. Conceitos que preciso entender
4. Coisas que preciso memorizar
5. Exemplos do cotidiano
6. Erros comuns
7. Como isso pode cair em prova
8. Perguntas de verificacao
9. Mini plano de estudo
10. Fontes e videos
```

## 3.2. PDF ilustrado com imagens e salvamento no dispositivo

Nome no app:

**PDF Ilustrado**

O que faz:

- usa o resultado da busca;
- gera resumo didatico;
- cria imagens ilustrativas ou seleciona imagens seguras/licenciadas;
- inclui diagramas, tabelas e mapas;
- inclui fontes;
- inclui videos recomendados;
- gera PDF;
- permite salvar no armazenamento do dispositivo.

Tipos:

- PDF de estudo;
- PDF de revisao para prova;
- PDF com mapa mental;
- PDF de exercicios;
- PDF professor com gabarito;
- PDF responsavel com orientacoes.

Como aparece:

Na aba **PDF**, o aluno escolhe:

- tipo do PDF;
- incluir imagens: sim/nao;
- incluir exercicios: sim/nao;
- incluir gabarito: sim/nao;
- nivel de detalhes;
- salvar no dispositivo.

Politica de imagens:

- usar imagens educativas;
- gerar ilustrações proprias quando possivel;
- evitar imagens com direitos autorais sem licenca;
- sempre ter texto alternativo;
- sempre ter legenda;
- imagens devem ajudar a entender, nao apenas decorar.

Salvamento:

- no navegador moderno: `showSaveFilePicker`;
- fallback universal: gerar Blob + link de download;
- no mobile/PWA: usar compartilhamento nativo quando disponivel;
- no app nativo futuro: salvar via API do sistema operacional.

## 3.3. Modo "Estudo Ativo"

O que faz:

Depois do resumo, o app nao deixa o aluno apenas ler. Ele guia:

1. leia um trecho curto;
2. feche o resumo;
3. responda uma pergunta;
4. confira;
5. corrija;
6. gere flashcard se errou.

Como aparece:

Botao: **Estudar ativamente**

## 3.4. Modo "Eu explico, voce corrige"

O que faz:

- aluno explica o tema com suas palavras;
- professor IA avalia clareza, conceito e exemplo;
- IA nao humilha;
- IA aponta lacunas;
- IA pede uma segunda tentativa.

Base:

- tecnica de Feynman;
- metacognicao;
- autoexplicacao.

Como aparece:

Botao: **Explicar com minhas palavras**

## 3.5. Modo "Recuperar da memoria"

O que faz:

- app mostra apenas o titulo do tema;
- aluno escreve tudo que lembra;
- app compara com o resumo;
- mostra lacunas;
- cria revisao.

Como aparece:

Botao: **Tentar lembrar antes de reler**

## 3.6. Intercalacao inteligente

O que faz:

- mistura questoes parecidas, mas nao iguais;
- ajuda aluno a escolher estrategia;
- evita decorar mecanicamente.

Exemplo:

Em Matematica, mistura:

- fracoes equivalentes;
- comparacao de fracoes;
- soma de fracoes;
- problemas com fracoes.

Como aparece:

Botao: **Treino misturado**

## 3.7. Exemplos resolvidos com retirada gradual

O que faz:

- primeiro mostra exemplo completo;
- depois exemplo com uma lacuna;
- depois com duas lacunas;
- depois o aluno resolve sozinho.

Como aparece:

Na aba **Como Resolver**, modo **Passo a passo guiado**.

## 3.8. Codificacao dupla

O que faz:

- transforma texto em tabela, esquema ou desenho;
- depois pede ao aluno explicar o visual.

Como aparece:

Botao: **Ver como esquema**

## 3.9. Image occlusion educativo

O que faz:

- pega imagem/diagrama;
- oculta partes;
- aluno precisa lembrar;
- revela resposta.

Exemplos:

- partes de uma celula;
- camadas da Terra;
- mapa;
- circuito simples;
- ciclo da agua.

Como aparece:

Dentro de Flashcards: **Card com imagem escondida**.

## 3.10. Diario metacognitivo

O que faz:

Ao fim de cada sessao, pergunta:

- o que aprendi?
- onde travei?
- que erro quero evitar?
- quando vou revisar?

Como aparece:

Tela final de estudo: **Fechar sessao**.

## 3.11. Modo "Vespera de prova"

O que faz:

- prioriza cards fracos;
- gera simulado curto;
- resume pontos essenciais;
- evita aprender tema novo demais;
- foca revisao.

Como aparece:

Botao: **Tenho prova em breve**.

## 3.12. Orientador de pesquisa confiavel

O que faz:

- ensina aluno a avaliar fonte;
- mostra se e oficial, educacional, opinativa ou fraca;
- pede justificativa sobre por que usar aquela fonte.

Inspirado em:

- Microsoft Search Coach;
- NotebookLM com fontes.

Como aparece:

Aba **Fontes e Videos** com selo:

- Alta confianca;
- Media confianca;
- Revisar com professor.

## 3.13. Resumo por nivel de profundidade

Opcoes:

- rapido;
- completo;
- analitico;
- para prova;
- para explicar oralmente;
- com analogias;
- com exemplos do cotidiano.

## 3.14. Cartoes de erro

O que faz:

- quando aluno erra, gera flashcard especial;
- frente: "qual erro evitar?";
- verso: explicacao e exemplo.

## 3.15. Plano de 7 dias

O que faz:

Depois da busca, o app gera:

- dia 1: entender;
- dia 2: recuperar;
- dia 3: praticar;
- dia 4: revisar cards;
- dia 5: quiz;
- dia 6: simulado;
- dia 7: explicar com palavras proprias.

## 4. Como isso fica no fluxo do nosso app

Fluxo completo:

1. aluno pesquisa "misturas homogeneas";
2. app gera resumo robusto com fontes;
3. aluno escolhe **Resumo Analitico**;
4. app destaca topicos mais importantes;
5. aluno clica **PDF Ilustrado**;
6. app cria PDF com imagens, legendas e fontes;
7. aluno salva no dispositivo;
8. app sugere flashcards;
9. app agenda revisoes;
10. aluno faz quiz;
11. erros viram caderno de erros;
12. professor IA guia nova tentativa;
13. responsavel/professor ve progresso.

## 5. Funcionalidades premium adicionais recomendadas

## 5.1. Entrada multimodal futura

Entradas:

- pesquisa digitada;
- PDF;
- foto do livro;
- foto do caderno;
- audio de aula;
- link de video;
- link de pagina;
- texto colado.

V1 pode comecar com pesquisa digitada e PDF gerado. A arquitetura deve estar pronta para as outras entradas.

## 5.2. Biblioteca curada

O app deve ter uma biblioteca interna:

- temas frequentes do 6o ano;
- resumos revisados;
- fontes aprovadas;
- videos aprovados;
- provas modelo;
- mapas prontos.

## 5.3. Modo offline/PWA

Permitir:

- baixar PDF;
- salvar flashcards locais;
- revisar cards sem internet;
- sincronizar depois.

## 5.4. Audio de revisao

Gerar roteiro de audio:

- 3 minutos;
- 5 minutos;
- 10 minutos;
- modo "indo para a escola";
- modo "antes da prova".

## 5.5. Apresentacao oral

O aluno grava explicacao:

- app avalia clareza;
- app sugere melhorar organizacao;
- app gera rubrica simples.

## 5.6. Leitura guiada

Para alunos com dificuldade de leitura:

- dividir texto em blocos;
- destacar termos;
- ler em voz alta;
- perguntar entendimento depois de cada bloco.

## 5.7. Professor humano no loop

O professor pode:

- aprovar materiais;
- marcar fonte confiavel;
- editar resumo;
- enviar para turma;
- ver se a turma entendeu.

## 6. Funcoes implementadas

O arquivo `funcoes-aprendizado-avancadas.js` implementa:

- catalogo de tecnicas comprovadas;
- selecao de tecnicas por tema/desempenho;
- geracao de resumo analitico;
- geracao de plano de estudo ativo;
- especificacao de PDF ilustrado;
- plano de imagens educativas;
- salvamento de PDF no dispositivo;
- geracao de cards com imagem oculta;
- modo Feynman;
- modo recuperar da memoria;
- diario metacognitivo;
- modo vespera de prova;
- orientador de fontes;
- pacote completo de estudo apos busca.

