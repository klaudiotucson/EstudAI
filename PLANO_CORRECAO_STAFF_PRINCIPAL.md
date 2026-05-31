# Plano de Correcao Staff/Principal - EstudAI

Data: 2026-05-31  
Base: auditoria tecnica realizada sobre o codigo real do projeto.

## Execucao Iniciada - 2026-05-31

Status da primeira rodada de Fase 1:

- Next atualizado para `16.2.6`, removendo os achados altos anteriores reportados pelo `npm audit`.
- Criado `.env.example` sem chaves reais.
- Markdown agora passa por sanitizacao com DOMPurify antes de `dangerouslySetInnerHTML`.
- APIs de IA e geracao ganharam validacao Zod, limite de tamanho de payload e rate limit basico em memoria.
- Professor IA e tutor de ingles ganharam instrucao de seguranca infantil e pos-processamento para evitar pedido de dados pessoais.
- Barra de busca mobile corrigida: botao de busca fica acessivel e filtro falso foi desabilitado/ocultado no mobile.
- Branding Capacitor corrigido de `EstudIA` para `EstudAI`.
- Lint deixou de varrer artefatos gerados Android/build.

Validacao executada:

- `npm.cmd run build`: passou.
- `npm.cmd run lint`: passou com 10 avisos restantes, sem erros.
- `npm.cmd audit --omit=dev --json`: 0 criticos, 0 altos, 4 moderados restantes.
- Smoke test HTTP do app: `GET /` respondeu 200 em `localhost:3000`.
- Smoke test HTTP de busca: `GET /api/search?q=matematica` respondeu 200 com corpo de resposta gerado.

Pendencias criticas ainda abertas:

- Rotacionar secrets reais fora do codigo. Este item exige acao manual no provedor das chaves.
- Conectar o projeto Supabase real e preencher variaveis de ambiente.
- Trocar persistencia `localStorage` por tabelas Supabase ja modeladas.
- Resolver vulnerabilidades moderadas restantes (`mermaid`, `uuid` transitive, `postcss` via Next).
- Substituir rate limit em memoria por Redis/Upstash/Supabase em ambiente distribuido.
- Criar testes automatizados de contrato para busca, chat, sanitizacao e seguranca infantil.

## Execucao Continuada - Auth e Banco - 2026-05-31

Entregas adicionadas:

- Instalados `@supabase/supabase-js` e `@supabase/ssr`.
- Criada camada Supabase em `src/lib/supabase/*` com cliente browser, cliente server e atualizacao de sessao no proxy.
- Criado `src/proxy.ts` para proteger app e APIs quando Supabase estiver configurado.
- Criadas rotas `/auth/confirm` e `/auth/sign-out`.
- Login deixou de ser redirecionamento falso: agora usa Supabase Auth quando configurado e mostra modo demonstracao quando nao configurado.
- Logout da sidebar chama rota real de sign-out.
- Criada migracao inicial `supabase/migrations/202605310001_initial_estudai_schema.sql` com RLS para perfis, resumos, fontes, flashcards, quizzes, tentativas, caderno de erros, tutor, progresso, planos de estudo e PDFs.
- Criado guia `docs/supabase-setup.md`.

Validacao executada:

- `npm.cmd run build`: passou.
- `npm.cmd run lint`: passou com 10 avisos restantes, sem erros.
- `npm.cmd audit --omit=dev --json`: 0 criticos, 0 altos, 4 moderados restantes.
- Smoke HTTP: `/login` respondeu 200.
- Smoke HTTP: `/` respondeu 200 no ambiente atual sem Supabase configurado, mantendo modo demonstracao.

Observacao:

- O Supabase CLI nao esta instalado nesta maquina, entao a migracao foi versionada como SQL e ainda nao foi aplicada em banco remoto.

## Premissas de Engenharia

Este plano assume que o EstudAI deve sair de prototipo local para produto minimamente publicavel. Portanto, antes de novas features, a prioridade e corrigir fundacao:

- identidade;
- autenticacao;
- autorizacao;
- banco;
- seguranca;
- protecao infantil;
- controle de custo de IA;
- persistencia;
- testes;
- observabilidade.

Nada abaixo deve ser considerado pronto apenas por existir visualmente. Cada item tem criterio de aceite.

## Fase 1 - Correcoes Criticas

Objetivo: remover riscos que impedem qualquer uso em producao.

### 1. Rotacionar secrets e limpar ambiente

Evidencia:

- `.env` contem chaves de IA.
- `.env.local` contem token Vercel/OIDC.

Acao:

1. Revogar/rotacionar chaves DeepSeek, OpenAI, Kimi e Vercel.
2. Remover secrets do workspace compartilhavel.
3. Criar `.env.example` sem valores reais.
4. Validar que `.env*` segue ignorado.
5. Garantir que nenhum pacote Electron/Capacitor inclua `.env`.

Arquivos envolvidos:

- `.env`
- `.env.local`
- `.gitignore`
- `package.json`
- `electron/main.js`

Criterio de aceite:

- `rg -n "sk-|OPENAI_API_KEY=.+|DEEPSEEK_API_KEY=.+|KIMI_API_KEY=.+|VERCEL_OIDC_TOKEN=.+" . -g "!node_modules" -g "!.next"` nao retorna secrets reais.
- App ainda sobe com variaveis via ambiente.

Prioridade: P0.

### 2. Implementar autenticacao real

Evidencia:

- `src/components/auth/LoginForm.tsx` faz apenas `window.location.href = "/"`.
- Nao existe sessao, cookie, JWT, OAuth ou provider.

Acao recomendada:

1. Escolher Supabase Auth ou NextAuth.
2. Criar login real por email/senha.
3. Implementar cadastro real.
4. Implementar logout real.
5. Implementar recuperacao de senha.
6. Implementar Google OAuth somente se houver provider configurado.
7. Bloquear `/` para usuario anonimo, exceto telas publicas.

Arquivos provaveis:

- `src/components/auth/LoginForm.tsx`
- `src/app/login/page.tsx`
- `src/app/layout.tsx`
- `src/middleware.ts`
- `src/lib/auth/*`
- `src/app/api/auth/*`

Criterio de aceite:

- Usuario invalido nao entra.
- Usuario valido entra e cria sessao.
- Recarregar pagina mantem sessao.
- Logout invalida sessao.
- Acesso anonimo a rotas privadas redireciona para `/login`.
- Teste E2E cobre login, logout e acesso privado.

Prioridade: P0.

### 3. Proteger todas as APIs

Evidencia:

- Todas as rotas em `src/app/api/*/route.ts` respondem sem autenticacao.
- Rotas de IA e TTS geram custo.

Rotas a proteger:

- `/api/search`
- `/api/chat`
- `/api/english-tutor`
- `/api/generate/summary`
- `/api/generate/flashcards`
- `/api/generate/quiz`
- `/api/generate/creative`
- `/api/evaluate/blank-page`
- `/api/proxy-image`
- `/api/tts`
- `/api/current-affairs`

Acao:

1. Criar helper server-side `requireUser()`.
2. Aplicar em todas as rotas privadas.
3. Adicionar validacao de role quando existir professor, responsavel, admin.
4. Retornar `401` sem sessao.
5. Retornar `403` sem permissao.

Criterio de aceite:

- Chamada anonima para rota privada retorna `401`.
- Chamada autenticada retorna `200` quando autorizada.
- Testes de API cobrem anonimo/autenticado.

Prioridade: P0.

### 4. Rate limit e controle de custo IA

Evidencia:

- IA/TTS/imagem sao chamadas diretamente.
- Nao ha limite por IP, usuario, plano ou dia.

Acao:

1. Criar tabela `ai_usage_events`.
2. Criar middleware/helper de rate limit.
3. Limitar por usuario, IP, rota e plano.
4. Registrar tokens estimados, provider, modelo e custo aproximado.
5. Bloquear abuso com `429`.

Rotas criticas:

- `/api/chat`
- `/api/search`
- `/api/tts`
- `/api/proxy-image`
- `/api/generate/*`

Criterio de aceite:

- 101 chamadas seguidas em rota IA passam a retornar `429` conforme limite configurado.
- Dashboard admin consegue ver uso por usuario/rota.

Prioridade: P0.

### 5. Sanitizar Markdown e HTML

Evidencia:

- `src/app/page.tsx` usa `marked.parse` + `dangerouslySetInnerHTML`.
- `src/components/study/PrintablePDF.tsx` idem.
- `src/components/study/WorkedExamples.tsx` idem.

Risco:

- XSS via resposta de LLM, prompt injection ou conteudo malicioso.

Acao:

1. Adicionar sanitizador robusto, por exemplo `isomorphic-dompurify` ou pipeline `remark/rehype-sanitize`.
2. Bloquear HTML bruto por padrao.
3. Permitir somente tags seguras.
4. Remover atributos `on*`, `style`, `srcdoc`, `javascript:`.
5. Testar payloads XSS.

Criterio de aceite:

- Payload `<img src=x onerror=alert(1)>` nao executa.
- Payload `<script>alert(1)</script>` nao aparece/executa.
- Links `javascript:` sao removidos.

Prioridade: P0.

### 6. Corrigir protecao infantil real

Evidencia:

- Teste real de `/api/chat` pediu nome/nivel do aluno.
- Teste real de `/api/english-tutor` perguntou "What is your name?".
- A regra de seguranca esta apenas no prompt.

Acao:

1. Criar filtro de saida para PII infantil.
2. Criar classificador simples para bloquear pedidos de nome, telefone, CPF, endereco, escola, senha.
3. Forcar substituicao por pergunta neutra: "use um apelido se quiser".
4. Logar evento de seguranca.
5. Adicionar testes automatizados.

Criterio de aceite:

- Nenhum tutor pergunta nome completo, telefone, endereco, CPF, escola ou senha.
- Testes com prompts adversariais continuam bloqueando coleta.

Prioridade: P0.

### 7. Atualizar dependencias vulneraveis

Evidencia:

- `npm audit` reportou 6 vulnerabilidades.
- `next@16.2.4` tem advisories high e fix em `16.2.6`.

Acao:

1. Atualizar Next para `16.2.6` ou superior compativel.
2. Atualizar Mermaid para versao corrigida quando disponivel.
3. Rodar `npm audit`.
4. Rodar build/lint.
5. Validar telas principais.

Criterio de aceite:

- `npm audit --omit=dev` sem high/critical.
- Build passa.
- Home, login e busca continuam funcionando.

Prioridade: P0.

### 8. Corrigir busca mobile

Evidencia:

- Em mobile o botao `Buscar` esta `hidden sm:block`.
- O usuario ve o botao de filtros, que nao tem funcao.

Acao:

1. Tornar botao de buscar visivel no mobile como icone/lupa.
2. Separar filtros em botao real com drawer/modal ou remover ate implementar.
3. Garantir submit via Enter e click.
4. Testar iPhone/Android.

Arquivo:

- `src/components/ui/SearchBar.tsx`

Criterio de aceite:

- No viewport 390x844, o usuario ve botao de busca.
- Clique no botao muda a tela para resultado/dashboard.
- Botao de filtros nao aparece sem funcao.

Prioridade: P0.

## Fase 2 - Correcoes Altas

Objetivo: transformar o prototipo em produto com dados reais, ownership e fluxos persistentes.

### 1. Implementar banco de dados real

Evidencia:

- Sem Prisma, Supabase client, schema, migrations ou tabelas.
- Persistencia atual e `localStorage`.

Acao recomendada:

1. Adotar Supabase Postgres.
2. Criar migrations versionadas.
3. Ativar RLS.
4. Criar client server-side e browser-side com seguranca.

Tabelas minimas:

- `profiles`
- `students`
- `guardians`
- `teachers`
- `classes`
- `study_topics`
- `study_summaries`
- `study_sources`
- `flashcard_decks`
- `flashcards`
- `review_schedules`
- `quizzes`
- `questions`
- `answer_attempts`
- `error_notebook_entries`
- `tutor_conversations`
- `tutor_messages`
- `learning_progress`
- `ai_usage_events`
- `consent_records`

Criterio de aceite:

- Dados persistem apos logout/login.
- Usuario A nao acessa dados do usuario B.
- RLS testada.

Prioridade: P1.

### 2. Migrar localStorage para banco

Evidencia:

- `src/app/page.tsx` salva `estuda_ai_errors`, `estuda_ai_flashcards`, `estuda_ai_stats`.
- `InteractiveStudyPlanner.tsx` salva plano em `localStorage`.

Acao:

1. Criar API/queries para salvar progresso.
2. Migrar caderno de erros.
3. Migrar flashcards e revisoes.
4. Migrar plano de estudos.
5. Manter localStorage apenas como cache opcional.

Criterio de aceite:

- Progresso aparece em outro navegador/dispositivo apos login.
- Limpar localStorage nao apaga dados persistidos.

Prioridade: P1.

### 3. Corrigir RAG e banco vetorial

Evidencia:

- `src/lib/vectorStore.ts` espera `vector_db.json`.
- `vector_db.json` nao existe.
- `package.json` tenta empacotar `vector_db.json`.

Acao:

1. Gerar `vector_db.json` no build ou remover dependencia.
2. Preferivel: usar pgvector/Supabase Vector.
3. Criar index de embeddings.
4. Implementar fallback explicito quando RAG estiver indisponivel.

Criterio de aceite:

- `searchSimilar()` retorna resultados reais para tema existente.
- Logs mostram quando RAG foi usado.

Prioridade: P1.

### 4. Criar roles e permissoes

Roles minimos:

- `student`
- `guardian`
- `teacher`
- `admin`

Permissoes:

- Aluno acessa seus dados.
- Responsavel acessa alunos vinculados.
- Professor acessa turmas vinculadas.
- Admin acessa curadoria/seguranca.

Criterio de aceite:

- Testes `403` para acesso cruzado.
- Middleware protege rotas e APIs.

Prioridade: P1.

### 5. Transformar telas falsas em fluxos reais

Fluxos prioritarios:

1. Cadastro real.
2. Recuperacao de senha.
3. Perfil editavel.
4. Configuracoes.
5. Favoritos.
6. Historico.
7. Conquistas.
8. Planos/assinatura ou remover UI de plano.

Criterio de aceite:

- Nenhum item de menu aponta para dashboard se promete tela propria.
- Nenhum botao primario fica sem handler.

Prioridade: P1.

### 6. Corrigir Capacitor/Electron

Evidencia:

- `capacitor.config.ts` ainda usa `com.estudia.app` e `EstudIA`.
- `webDir: 'out'`, mas `out` esta vazio.
- `server.url` aponta para Vercel.

Acao:

1. Atualizar para EstudAI.
2. Definir estrategia mobile: web remoto ou build estatico real.
3. Se usar remoto, remover `cleartext: true` em producao.
4. Atualizar icones Android.
5. Validar build Android.

Criterio de aceite:

- App mobile abre EstudAI correto.
- Sem marca antiga.
- Sem URL errada por ambiente.

Prioridade: P1.

## Fase 3 - Otimizacoes

Objetivo: reduzir divida tecnica, melhorar manutencao e qualidade.

### 1. Quebrar `src/app/page.tsx`

Problema:

- Arquivo concentra responsabilidades demais.

Acao:

1. Criar hooks:
   - `useStudySearch`
   - `useStudyPersistence`
   - `usePdfExport`
   - `useFlashcardReview`
   - `useStudyNavigation`
2. Criar providers/contextos quando necessario.
3. Criar rotas ou lazy components por aba.

Criterio de aceite:

- `page.tsx` fica abaixo de 180 linhas.
- Hooks com testes unitarios.

Prioridade: P2.

### 2. Remover codigo morto

Itens encontrados:

- `AppLayout.tsx`
- `GlassCard.tsx`
- `StudyTechniques.tsx` importado e nao usado
- `IllustratedPdf.tsx` importado e nao usado
- imports mortos em `page.tsx`
- `sidebarOpen`
- `cancelSearch`

Acao:

1. Remover ou integrar.
2. Ajustar lint para falhar em unused em `src`.
3. Excluir build Android do lint.

Criterio de aceite:

- `npm.cmd run lint` sem warnings em `src`.

Prioridade: P2.

### 3. Padronizar validacao

Acao:

1. Adicionar `zod`.
2. Criar schemas por API.
3. Limitar tamanhos:
   - `topic`: max 200 chars.
   - `messages`: max N mensagens e tamanho total.
   - `content`: max definido.
   - `width/height`: range permitido.
4. Retornar erros padronizados.

Criterio de aceite:

- Payload invalido retorna `400`.
- Payload grande retorna `413` ou `400`.

Prioridade: P2.

### 4. Testes automatizados

Adicionar:

- Unit: funcoes de memoria, SRS, classificacao de erro, seguranca infantil.
- Integration: rotas API com auth e rate limit.
- E2E: login, busca, quiz, tutor, PDF, logout.
- Acessibilidade: axe ou Playwright accessibility.

Criterio de aceite:

- Pipeline roda `lint`, `test`, `build`, `e2e smoke`.

Prioridade: P2.

### 5. Melhorar UX/UI

Itens:

1. Substituir `alert` por toast/modal.
2. Criar empty states reais.
3. Criar error states por API.
4. Criar loading por aba.
5. Melhorar legibilidade de mobile.
6. Revisar contraste em textos cinza/azul.
7. Revisar microcopy infantil.

Criterio de aceite:

- Nenhum `alert(` em `src`.
- Fluxos de erro visiveis e recuperaveis.

Prioridade: P2.

## Fase 4 - Escalabilidade

Objetivo: preparar produto para muitos usuarios, escolas e custos controlados.

### 1. Fila de jobs

Usar fila para:

- PDF com imagens.
- TTS.
- resumos longos.
- simulados grandes.
- embeddings.

Criterio de aceite:

- Requisicao retorna job id.
- Usuario acompanha status.
- Falha pode ser reprocessada.

Prioridade: P3.

### 2. Cache de IA

Chave de cache:

- tema;
- ano/trilha;
- disciplina;
- idioma;
- versao do prompt;
- fontes.

Criterio de aceite:

- Busca repetida nao chama LLM novamente quando cache valido.
- Cache invalida por versao de prompt.

Prioridade: P3.

### 3. Observabilidade

Adicionar:

- logs estruturados;
- request id;
- user id;
- rota;
- provider IA;
- tokens/custo;
- latencia;
- erros;
- alertas.

Criterio de aceite:

- Dashboard tecnico mostra erro por rota e custo por dia.

Prioridade: P3.

### 4. Multi-tenant escolar

Modelos:

- escola;
- turma;
- professor;
- aluno;
- responsavel;
- vinculos;
- convites;
- permissoes.

Criterio de aceite:

- Professor de uma escola nao acessa outra.
- Admin escola gerencia apenas sua organizacao.

Prioridade: P3.

### 5. Admin e curadoria

Implementar:

- fila de revisao de conteudos gerados;
- fontes aprovadas/bloqueadas;
- alertas de seguranca infantil;
- auditoria de prompts;
- bloqueio de usuario/rota;
- relatorios de custo.

Criterio de aceite:

- Admin consegue revisar e bloquear conteudo/fonte.
- Logs de seguranca sao consultaveis.

Prioridade: P3.

## Ordem Recomendada de Execucao

1. Rotacionar secrets.
2. Atualizar dependencias vulneraveis.
3. Corrigir busca mobile.
4. Implementar auth real.
5. Proteger APIs.
6. Rate limit.
7. Sanitizacao Markdown.
8. Filtro infantil de entrada/saida.
9. Banco real + RLS.
10. Migrar localStorage.
11. Corrigir RAG.
12. Remover mocks/telas falsas.
13. Testes automatizados.
14. Refatorar arquitetura.
15. Observabilidade e escalabilidade.

## Definicao de Pronto Para Producao

O EstudAI so deve ser considerado pronto para producao quando:

- nao houver secrets no repo/workspace compartilhavel;
- login/cadastro/logout forem reais;
- APIs privadas retornarem `401` sem sessao;
- roles e permissoes estiverem testados;
- dados persistirem em banco com RLS;
- `npm audit --omit=dev` nao tiver high/critical;
- XSS por Markdown estiver bloqueado;
- IA tiver rate limit, custo monitorado e moderacao infantil;
- mobile tiver busca funcional;
- fluxo busca -> resumo -> flashcards -> quiz -> erro -> revisao persistir por usuario;
- CI rodar lint, build, unit, integration e E2E smoke.
