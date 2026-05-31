# Auditoria Tecnica Completa - EstudAI

Data: 2026-05-31  
Escopo auditado: aplicacao Next.js/Electron/Capacitor no diretorio do projeto.

## Resumo Executivo

O projeto compila e possui uma interface visual rica, mas ainda nao esta pronto para producao. A aplicacao hoje e um prototipo funcional com muitas funcionalidades aparentes, persistencia local, APIs abertas e varias integracoes de IA sem controle de autenticacao, autorizacao, rate limit, custo, auditoria ou seguranca infantil efetiva.

Notas:

| Area | Nota | Diagnostico |
|---|---:|---|
| Arquitetura | 4/10 | Produto grande concentrado em `src/app/page.tsx`, sem camadas reais de dominio, auth ou persistencia. |
| Front-end | 5/10 | UI forte, mas fluxos incompletos, estados hardcoded e componentes mortos. |
| Back-end | 3/10 | Rotas existem e respondem, mas sem auth, rate limit, schema validado ou persistencia. |
| Banco de dados | 1/10 | Nao existe banco transacional; apenas JSON local e `localStorage`. |
| Seguranca | 2/10 | Secrets locais, APIs abertas, dependencias vulneraveis, XSS possivel e custo IA exposto. |
| UX | 5/10 | Boa direcao visual, mas login falso, mobile sem botao claro de busca e ferramentas bloqueadas por alerta. |
| UI | 7/10 | Visual premium consistente, mas depende de cards/status mockados e alguns labels/textos precisam revisao. |
| Escalabilidade | 2/10 | Sem usuarios, filas, cache, storage, banco, observabilidade ou controle de custo. |

Verificacoes executadas:

- `npm.cmd run build`: passou.
- `npm.cmd run lint`: passou com 74 warnings.
- `npm.cmd audit --json`: 6 vulnerabilidades, sendo 2 high e 4 moderate.
- Teste local de rotas: `/`, `/login`, `/api/search`, `/api/current-affairs`, `/api/chat`, `/api/english-tutor`, `/api/generate/*`, `/api/evaluate/blank-page` e `/api/tts`.
- Teste responsivo no navegador integrado: desktop, notebook, tablet, Android e iPhone.

## 1. Estrutura Geral

### O que existe

- Next.js App Router com 2 paginas: `src/app/page.tsx` e `src/app/login/page.tsx`.
- 11 rotas de API em `src/app/api`.
- Componentes organizados em `components/auth`, `dashboard`, `layout`, `study` e `ui`.
- Electron e Capacitor presentes.
- Dados educacionais em JSON local: `banco_dados_enciclopedico.json` e `database_educacional_completo.json`.

### Problemas

1. **God component no app principal**  
   `src/app/page.tsx` concentra estado global, navegacao, busca, PDF, flashcards, caderno de erros, tabs, persistencia local e UI. Isso prejudica manutencao, testes e escala.

2. **Sem arquitetura de produto real**  
   Nao ha camadas claras para:
   - usuario;
   - autenticacao;
   - autorizacao;
   - banco;
   - pagamentos;
   - storage;
   - turmas;
   - professor/responsavel;
   - auditoria;
   - billing/custos de IA.

3. **Builds nativos misturados ao repo**  
   A pasta `android/app/build` entra no lint e gera warnings. `dist_electron` tem mais de 1.5 GB. Esses artefatos nao deveriam estar no escopo normal de lint/auditoria.

4. **Capacitor desatualizado com marca antiga**  
   `capacitor.config.ts` ainda usa `appId: 'com.estudia.app'` e `appName: 'EstudIA'`, alem de apontar para URL remota Vercel. Isso conflita com o rename para EstudAI e com o app local.

Status por maturidade:

| Maturidade | Status |
|---|---|
| MVP local | Parcialmente adequado |
| Producao | Nao adequado |
| Grande escala | Nao adequado |

## 2. Front-End

### Telas existentes

| Tela | Arquivo | Funciona | Parece funcionar | Incompleto/mockado |
|---|---|---|---|---|
| Home/Dashboard | `src/app/page.tsx`, `DashboardPage.tsx` | Renderiza e busca via API | Cards de progresso, XP, aluno, materias | Perfil, XP, streak, progresso e rankings sao hardcoded |
| Login | `src/app/login/page.tsx`, `LoginForm.tsx` | Redireciona para `/` | Parece autenticar | Nao valida usuario/senha; Google e cadastro nao fazem nada |
| Cadastro | inexistente | Nao | Link existe | `href="#"` |
| Perfil | `UserProfileCard.tsx` | Mostra card | Parece perfil real | Nome "Aluno" e "7º ano" hardcoded |
| Configuracoes | `sidebarItems.ts` aponta para dashboard | Nao | Item existe | Sem tela |
| Assinaturas/Planos | sidebar mostra plano gratuito | Nao | Card existe | Sem billing, planos ou pagamento |
| IA/Tutor | `ChatTutor.tsx`, `/api/chat` | Responde via IA | Tutor especialista | Sem output moderation, sem memoria persistente, sem seguranca forte |
| Admin | inexistente | Nao | Nao | Nao implementado |
| Atualidades | `CurrentAffairsHub.tsx`, `/api/current-affairs` | Funciona com feeds/fallback | Curadoria atualizada | Sem moderacao editorial ou persistencia |
| Planejador | `InteractiveStudyPlanner.tsx` | Funciona localmente | Plano profissional | Salva so em localStorage |
| PDF | `PrintablePDF.tsx` | Usa print do navegador | Parece exportador | Sem geracao server-side, sem storage, imagem externa/custo |
| Flashcards | `FlashcardContainer.tsx` | Gera via API e revisa | SRS basico | Sem banco, sem usuario, sem FSRS real |
| Quiz | `QuizContainer.tsx` | Gera via API | Correcao basica | Sem banco, sem anti-alucinacao, sem avaliacao robusta |

### Componentes orfaos ou mortos

- `AppLayout.tsx`: nao encontrado em uso.
- `GlassCard.tsx`: nao encontrado em uso.
- `StudyTechniques.tsx`: importado em `page.tsx`, mas nao renderizado.
- `IllustratedPdf.tsx`: importado em `page.tsx`, mas nao renderizado.
- `sidebarOpen`/`setSidebarOpen`: estado declarado e nao usado.
- `cancelSearch`: funcao declarada e nao usada.
- Muitos icones importados em `page.tsx` nao sao usados.

### Responsividade

Testado em:

- Desktop 1440x900: sem overflow horizontal.
- Notebook 1280x720: sem overflow horizontal.
- Tablet 768x1024: sem overflow horizontal.
- Android 412x915: sem overflow horizontal.
- iPhone 390x844: sem overflow horizontal.

Problemas encontrados:

1. **Busca mobile sem botao visivel de buscar**  
   Em mobile, o botao `Buscar` fica `hidden sm:block`; o usuario ve somente o botao de filtros. Pressionar Enter no teste nao acionou claramente o fluxo. Isso explica a percepcao anterior de "clicar em buscar e nada acontece" em telas pequenas.

2. **Botao de filtros sem funcao**  
   `SearchBar.tsx` renderiza um botao de filtros, mas ele nao tem handler real.

3. **Bottom nav corta texto**  
   Em iPhone/Android, labels como `Perfil` e itens longos podem truncar. Nao quebra layout, mas reduz clareza.

4. **Alertas nativos para fluxo bloqueado**  
   `alert("Pesquise um tema primeiro...")` quebra a experiencia premium.

UX: 5/10  
UI: 7/10

## 3. Back-End / APIs

Rotas encontradas:

| Rota | Metodo | Status testado | Observacao |
|---|---|---:|---|
| `/api/search` | GET | 200 | Gera pacote de estudo; tem fallback local |
| `/api/chat` | POST | 200 | Tutor IA sem auth e sem output moderation |
| `/api/english-tutor` | POST | 200 | Tutor ingles sem auth |
| `/api/current-affairs` | GET | 200 | Busca feeds RSS e fallback |
| `/api/generate/flashcards` | POST | 200 | Depende de LLM; sem rate limit |
| `/api/generate/quiz` | POST | 200 | Depende de LLM; sem rate limit |
| `/api/generate/creative` | POST | 200 | Depende de LLM; sem rate limit |
| `/api/generate/summary` | POST | Nao testado nesta bateria final | Depende de LLM; retorna texto longo |
| `/api/evaluate/blank-page` | POST | 200 | Avalia recall via LLM |
| `/api/proxy-image` | GET | Nao testado nesta bateria final | Proxy para Pollinations |
| `/api/tts` | POST | 200 | Retorna audio OpenAI |

### Problemas de API

1. **Todas as APIs estao sem autenticacao**
   Qualquer cliente pode chamar geracao de IA, TTS, imagens, chat, quiz e flashcards.

2. **Sem autorizacao**
   Nao existe papel de aluno, professor, responsavel, admin, coach, moderador ou qualquer RBAC/ABAC.

3. **Sem rate limiting**
   Rotas de IA e TTS podem gerar custo rapidamente.

4. **Sem schema validation**
   Dados recebidos sao validados manualmente e superficialmente. Nao ha Zod, limites de tamanho, normalizacao forte ou validacao de arrays.

5. **Sem limites de payload**
   Rotas como `/api/chat`, `/api/generate/summary`, `/api/evaluate/blank-page` aceitam texto arbitrario e podem gerar custo/DoS.

6. **Sem timeout/circuit breaker**
   Chamadas externas podem travar experiencia ou consumir recursos.

7. **Prompt injection**
   O conteudo do usuario entra diretamente nos prompts. Nao ha camada de policy, guardrails ou separacao confiavel entre fonte e instrucao.

8. **Seguranca infantil so via prompt**
   No teste real, `/api/chat` respondeu pedindo nome/nivel do aluno; `/api/english-tutor` perguntou "What is your name?". Isso contradiz a regra de nao coletar dados pessoais.

## 4. Banco de Dados

### Estado atual

Nao ha banco de dados transacional implementado.

Evidencias:

- Sem Prisma.
- Sem Supabase client.
- Sem migrations.
- Sem schema SQL.
- Sem tabelas.
- Sem indices.
- Sem chaves estrangeiras.
- Sem RLS.
- Sem relacionamento usuario/conteudo/progresso.

Dados existentes:

| Arquivo | Registros | Uso |
|---|---:|---|
| `banco_dados_enciclopedico.json` | 133 | Fonte local enciclopedica |
| `database_educacional_completo.json` | 463 | Fonte BNCC/local |
| `vector_db.json` | inexistente | Esperado pelo RAG, mas nao existe |
| `localStorage` | variavel por navegador | Erros, flashcards, stats e planner |

Problemas:

- Dados do aluno ficam no navegador, sem conta e sem backup.
- Nao existe consistencia entre dispositivo, aluno, professor e responsavel.
- `vectorStore.ts` espera `vector_db.json`, mas o arquivo nao existe; RAG fica silenciosamente vazio.
- `package.json` inclui `vector_db.json` no build Electron, mas o arquivo nao existe.
- Nao ha como auditar, excluir dados por usuario, gerar relatorios reais ou cumprir privacidade infantil.

## 5. Autenticacao

Status: **nao implementada**.

Evidencias:

- `LoginForm.tsx` apenas faz `window.location.href = "/"`.
- Campo de email e senha nao tem `name`, nao sao lidos, nao sao enviados.
- Botao "Entrar com Google" nao tem handler.
- "Criar conta" e "Esqueci minha senha" usam `href="#"`.
- "Sair" apenas redireciona para `/login`.
- Nao ha sessao, cookie, JWT, refresh token, OAuth, Supabase Auth, NextAuth ou middleware.

Impacto:

- Qualquer pessoa entra.
- Nao ha logout real.
- Nao ha protecao de rotas.
- Nao ha identidade de aluno/responsavel/professor.

## 6. Autorizacao

Status: **nao implementada**.

Roles solicitados pelo produto mas ausentes:

- Admin.
- Usuario comum.
- Moderador.
- Coach.
- Personal trainer.
- Aluno.
- Professor.
- Responsavel.

Nao ha:

- RBAC.
- Claims.
- Middleware.
- Permissoes por rota.
- Ownership de recurso.
- Politicas por idade.
- Consentimento parental.

## 7. Seguranca OWASP

### CRITICO

1. **Secrets locais presentes no workspace**  
   `.env` contem chaves de provedores IA e `.env.local` contem token Vercel/OIDC. Mesmo com `.gitignore`, isso e material sensivel no projeto local. Rotacionar imediatamente.

2. **Login/autenticacao falsa**  
   O app aparenta ter login, mas qualquer envio entra no produto.

3. **APIs de custo abertas**  
   IA, TTS e imagem podem ser chamadas sem login/rate limit. Isso permite abuso financeiro e DoS.

### ALTO

1. **XSS via Markdown/HTML nao sanitizado**  
   `marked.parse` + `dangerouslySetInnerHTML` aparece em:
   - `src/app/page.tsx`
   - `src/components/study/PrintablePDF.tsx`
   - `src/components/study/WorkedExamples.tsx`
   
   Como o conteudo vem de LLM e entradas do usuario, ha risco de HTML malicioso, prompt injection e payloads renderizados.

2. **Dependencia Next vulneravel**
   `npm audit` reportou `next@16.2.4` com advisories high, incluindo DoS, SSRF e bypasses relacionados a Middleware/Proxy/App Router. Fix recomendado: `next@16.2.6`.

3. **Sem protecao infantil efetiva**
   O prompt diz para nao pedir dados pessoais, mas o teste de API mostrou o tutor pedindo nome. Falta filtro de entrada/saida.

4. **Sem CSRF/abuse controls**
   Rotas POST executam acoes custosas sem sessao, CSRF token, origin check, captcha ou rate limit.

### MEDIO

1. **Mermaid vulneravel**
   `npm audit` reportou vulnerabilidades moderate de CSS/HTML injection e DoS em `mermaid@11.14.0`.

2. **PostCSS/brace-expansion/tmp/uuid com advisories**
   Dependencias transitivas possuem vulnerabilidades moderate/high.

3. **Logs podem vazar detalhes de erro**
   Provedores IA logam falhas e textos de erro externos.

4. **Proxy de imagem sem limites**
   `/api/proxy-image` aceita `width`, `height` e `prompt` sem limite. Host e fixo, entao nao e SSRF classico, mas e vetor de custo/DoS.

### BAIXO

1. Muitos warnings de lint.
2. `console.log` em servicos.
3. Artefatos buildados Android entram no lint.
4. Placeholders e strings hardcoded reduzem confiabilidade.

## 8. IA e Automacoes

Provedores:

- DeepSeek.
- OpenAI.
- Kimi/Moonshot.
- Pollinations para imagens.
- OpenAI TTS.

Problemas:

- Sem controle de custo.
- Sem limites de tokens por usuario.
- Sem fallback consistente em todas as rotas.
- Sem moderacao de entrada/saida.
- Sem tracing por usuario.
- Sem cache.
- Sem retry/backoff padronizado.
- Sem protecao contra prompt injection.
- Sem separacao entre conteudo educacional, comando de sistema e fonte externa.
- Modelos hardcoded, incluindo `gpt-4o-mini`, sem configuracao por ambiente.

## 9. Deteccao de Mocks/Falsos

| Funcionalidade | Arquivo | Status | Impacto |
|---|---|---|---|
| Login | `LoginForm.tsx` | Falso | Usuario entra sem autenticar |
| Google Login | `LoginForm.tsx` | Falso | Botao nao faz OAuth |
| Cadastro | `LoginForm.tsx` | Falso | Link `#` |
| Recuperacao de senha | `LoginForm.tsx` | Falso | Link `#` |
| Logout | `Sidebar.tsx`, `MobileDrawer.tsx` | Falso | Apenas redireciona |
| Perfil | `UserProfileCard.tsx` | Mockado | Nome/ano hardcoded |
| XP/streak | `DashboardHeader.tsx`, `page.tsx` | Mockado | Nao mede progresso real |
| Plano educacional gratuito | `Sidebar.tsx` | Mockado | Sem billing/plano |
| Rankings | `sidebarItems.ts` | Falso | Aponta para dashboard |
| Conquistas | `sidebarItems.ts` | Falso | Aponta para dashboard |
| Configuracoes | `sidebarItems.ts` | Falso | Aponta para dashboard |
| Favoritos/Historico | `sidebarItems.ts` | Falso | Apontam para dashboard |
| Banco vetorial | `vectorStore.ts` | Incompleto | `vector_db.json` nao existe |
| Progresso por habilidade | `page.tsx` | Mockado | `knowledgeMap` hardcoded |
| Caderno de erros | `page.tsx` | Local only | Sem usuario/banco |
| Flashcards SRS | `page.tsx` | Parcial | Algoritmo simples/localStorage |
| PDF premium | `PrintablePDF.tsx` | Parcial | Usa print do browser, nao storage |
| Atualidades | `current-affairs` | Parcial | Feeds/fallback, sem curadoria humana |
| Admin | inexistente | Nao existe | Sem moderacao/admin |
| Assinaturas/pagamento | inexistente | Nao existe | Sem monetizacao real |
| Turmas/professor/responsavel | inexistente | Nao existe | Produto escolar incompleto |

## 10. Fluxos Ponta a Ponta

| Fluxo | Resultado |
|---|---|
| Cadastro -> Banco -> Login -> Dashboard | Quebrado: cadastro e banco nao existem |
| Login -> Sessao -> Permissoes | Quebrado: sem sessao/permissao |
| Assinatura -> Pagamento -> Liberacao | Inexistente |
| IA prompt -> API -> Resposta -> Interface | Funciona em varias rotas, mas sem auth, custo, moderacao ou seguranca |
| Criacao de treino/plano -> salvamento -> execucao | Parcial: plano local em `localStorage`; sem banco |
| Perfil editar -> persistir -> atualizar | Inexistente |
| Busca -> estudo | Funciona, mas mobile nao tem botao buscar visivel e pode depender de Enter |
| PDF -> salvar dispositivo | Parcial: print/download via navegador, nao armazenamento gerenciado |

## 11. Performance

### Front-end

- `src/app/page.tsx` importa muitos componentes e icones no mesmo client bundle.
- Pouco lazy loading por aba.
- `marked`, `mermaid`, PDF, chat, planner e varias ferramentas entram no mesmo fluxo principal.
- Imagens do PDF sao pre-carregadas quando `data.tema` muda, mesmo antes do usuario pedir PDF.
- `localStorage` e estados globais podem crescer sem limite.

### Back-end

- Rotas chamam LLM diretamente sem fila, cache, rate limit ou timeout central.
- `searchSimilar` calcula similaridade em memoria sobre JSON; se o vetor crescer, escala mal.
- `vector_db.json` ausente torna RAG inoperante.

### Build/artefatos

- `.next`: ~829 MB.
- `dist_electron`: ~1.5 GB.
- `node_modules`: ~912 MB.

## 12. Codigo Morto e Duplicacao

Principais evidencias:

- `AppLayout.tsx` sem uso.
- `GlassCard.tsx` sem uso.
- `StudyTechniques.tsx` importado mas nao usado.
- `IllustratedPdf.tsx` importado mas nao usado.
- Importacoes mortas em `page.tsx`.
- Estados/funcoes mortos: `sidebarOpen`, `setSidebarOpen`, `cancelSearch`.
- Logica de gerar imagens para PDF duplicada em preload e no handler de download.
- Varios fallbacks educacionais duplicados em frontend e API.

## 13. Problemas Criticos

1. Secrets reais/locais no workspace. Rotacionar imediatamente.
2. Login falso e ausencia total de auth.
3. APIs de IA/TTS/imagem abertas sem auth/rate limit.
4. Sem banco de dados, sem persistencia multiusuario, sem compliance infantil.

## 14. Problemas Altos

1. XSS por Markdown/HTML sem sanitizacao.
2. Dependencias vulneraveis: Next high advisories.
3. Prompts de seguranca infantil nao impedem coleta de nome/dados.
4. Mobile sem acao clara de busca.
5. Capacitor ainda aponta marca antiga/URL remota.
6. RAG prometido, mas `vector_db.json` nao existe.

## 15. Problemas Medios

1. Muitos mocks/hardcoded.
2. Componentes mortos.
3. Lint com 74 warnings.
4. Sem testes unitarios/integracao/E2E.
5. Sem observabilidade.
6. Sem cache de respostas IA.
7. Sem politica de erro/loading uniforme.

## 16. Problemas Baixos

1. Nomes internos `estuda_ai` e `LogoEstudia` permanecem, embora nao sejam visiveis.
2. Algumas strings sem acento por escolha ASCII.
3. Uso de `alert`.
4. `<img>` em vez de `next/image` em alguns pontos.

## 17. Plano de Correcao

### Fase 1 - Criticas

1. Rotacionar todas as chaves expostas.
2. Remover `.env`/`.env.local` do pacote e criar `.env.example`.
3. Implementar auth real: Supabase Auth ou NextAuth.
4. Proteger todas as rotas de API com sessao e ownership.
5. Implementar rate limit por IP/usuario para IA, TTS e imagens.
6. Sanitizar Markdown com DOMPurify/rehype-sanitize ou bloquear HTML.
7. Atualizar `next` para versao corrigida e rodar novo `npm audit`.
8. Corrigir busca mobile com botao visivel e handler claro.

### Fase 2 - Altas

1. Criar banco Postgres/Supabase com schema real.
2. Tabelas: users/profiles/study_summaries/sources/flashcards/quizzes/attempts/progress/error_notebook/tutor_messages/consents.
3. RLS por usuario e papel.
4. Implementar consentimento de responsavel.
5. Output moderation para tutor infantil.
6. Corrigir Capacitor para EstudAI e ambiente correto.
7. Criar `vector_db.json` ou substituir por vector store real.

### Fase 3 - Otimizacoes

1. Quebrar `page.tsx` em rotas/abas lazy-loaded.
2. Remover componentes mortos.
3. Reduzir imports e bundle.
4. Criar testes unitarios para funcoes de estudo e API.
5. Criar Playwright E2E para login, busca, quiz, tutor e PDF.
6. Padronizar estados de loading/error/empty.

### Fase 4 - Escalabilidade

1. Fila de jobs para IA/PDF/TTS.
2. Cache por tema/nivel/fonte.
3. Observabilidade: logs estruturados, tracing, alertas de custo.
4. Painel admin real para curadoria.
5. Billing/planos se o produto for SaaS.
6. Multi-tenant para escolas/turmas.

## 18. Conclusao

O EstudAI tem uma boa base visual e um conjunto ambicioso de componentes educacionais. Entretanto, tecnicamente ele ainda e um prototipo local com integracoes IA expostas e varias funcionalidades simuladas. A prioridade nao deve ser adicionar novas ferramentas agora; deve ser transformar a fundacao em produto real: autenticacao, banco, autorizacao, seguranca infantil, rate limit, sanitizacao e persistencia.

