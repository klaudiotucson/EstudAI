# Supabase Setup - EstudAI

Esta pasta prepara a base real de Auth e banco. O CLI do Supabase nao estava instalado nesta maquina, entao a migracao foi criada como SQL versionado para ser aplicada quando o projeto Supabase estiver conectado.

## Variaveis

Preencha no `.env.local` local e na Vercel:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

Nao use `SUPABASE_SERVICE_ROLE_KEY` no frontend. Ela existe apenas para tarefas administrativas no servidor.

## Auth URLs

No painel Supabase, abra `Authentication > URL Configuration`.

Para desenvolvimento local:

```text
Site URL:
http://localhost:3000

Redirect URLs:
http://localhost:3000/auth/confirm
http://localhost:3000/auth/callback
http://localhost:3000/auth/reset-password
http://localhost:3000/login
```

Para producao, adicione as mesmas rotas usando o dominio real:

```text
https://SEU-DOMINIO/auth/confirm
https://SEU-DOMINIO/auth/callback
https://SEU-DOMINIO/auth/reset-password
https://SEU-DOMINIO/login
```

## Providers recomendados

- `Email`: habilitado.
- Confirmacao de e-mail: recomendada para producao.
- Password minimum length: use pelo menos 8 caracteres.
- Google OAuth: habilite apenas depois de configurar o client ID/secret do Google Cloud e adicionar `/auth/callback` como redirect permitido.

## Aplicar schema

Quando o Supabase CLI estiver instalado:

```powershell
supabase link --project-ref SEU_PROJECT_REF
supabase db push
```

Ou aplique o arquivo SQL no editor SQL do Supabase:

```text
supabase/migrations/202605310001_initial_estudai_schema.sql
```

## Politicas de seguranca

Todas as tabelas publicas criadas nesta migracao possuem RLS ligado. As politicas atuais isolam dados por `auth.uid() = user_id` ou `auth.uid() = profiles.id`.

Autorizacao por papel ainda deve ser evoluida usando `app_metadata`, nao `user_metadata`, porque `user_metadata` e editavel pelo usuario.
