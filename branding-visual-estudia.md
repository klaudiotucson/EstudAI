# Branding visual EstudIA

## Direcao visual implementada

O EstudIA agora usa a identidade:

- dark premium;
- neon azul e roxo;
- glassmorphism;
- gradientes suaves;
- cards arredondados;
- interface SaaS educacional moderna;
- visual acolhedor para alunos do 6º ao 9º ano.

## Paleta base

Tokens adicionados em `src/styles/theme.css`:

- `--bg-main: #050b1f`;
- `--bg-secondary: #081229`;
- `--bg-card: rgba(13, 25, 55, 0.72)`;
- `--blue-primary: #0b7cff`;
- `--blue-neon: #00c8ff`;
- `--purple-primary: #8b35ff`;
- `--purple-neon: #b832ff`;
- `--green: #2edb88`;
- `--orange: #ff8a2a`;
- `--yellow: #ffd54a`;
- `--red: #ff4d5e`;
- `--text-primary: #ffffff`;
- `--text-secondary: #b9c4d8`;
- `--text-muted: #6f7c96`.

## Componentes criados

Componentes de UI:

- `LogoEstudia`;
- `GlassCard`;
- `GradientButton`;
- `SearchBar`.

Componentes de layout:

- `Sidebar`;
- `SidebarItem`;
- `MobileBottomNav`;
- `MobileDrawer`;
- `AppLayout`;
- `UserProfileCard`.

Componentes de dashboard:

- `DashboardPage`;
- `DashboardHeader`;
- `SubjectCard`;
- `StudyToolCard`;
- `StatsCard`.

Componentes de autenticação:

- `LoginPage`;
- `LoginForm`.

## Telas atualizadas

## Login

Arquivo:

- `src/app/login/page.tsx`

Implementado:

- fundo dark com gradientes azul e roxo;
- card central com glassmorphism;
- logo EstudIA;
- slogan “Seu jeito de aprender começa aqui.”;
- formulário com e-mail, senha, lembrar de mim, esqueci senha;
- botão principal com gradiente azul/roxo;
- botão Google;
- ilustração vetorial de dois alunos com tablet;
- ícones flutuantes;
- frase de Nelson Mandela.

## Dashboard

Arquivo:

- `src/app/page.tsx`

Implementado:

- sidebar desktop com itens do plano;
- dashboard inicial premium;
- header com saudação, sequência, XP e perfil;
- busca grande;
- seletor de ano escolar;
- seção “Explore por matéria”;
- cards de Português, Matemática, Ciências, Geografia e Conhecimentos Gerais;
- seção “Ferramentas de estudo”;
- cards de resumo, explicação fácil, flashcards, quiz, podcast, paródias, técnicas de memorização e PDF;
- mobile drawer;
- bottom navigation mobile.

## Dados estáticos

Arquivos:

- `src/data/subjects.ts`;
- `src/data/studyTools.ts`;
- `src/data/sidebarItems.ts`.

## Validação

- `npm.cmd run lint`: passou com 0 erros.
- `npm.cmd run build`: passou fora do sandbox.
- `http://localhost:3000`: respondeu 200.
- `http://localhost:3000/login`: respondeu 200.
