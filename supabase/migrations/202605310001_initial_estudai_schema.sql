create extension if not exists pgcrypto;

create schema if not exists private;

create or replace function private.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  role text not null default 'student' check (role in ('student', 'guardian', 'teacher', 'admin')),
  grade_level text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.study_summaries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  topic text not null,
  subject text,
  grade_level text,
  curriculum_scope text not null default 'fundamental_ii',
  bncc_skill_codes text[] not null default '{}',
  summary jsonb not null default '{}'::jsonb,
  analytical_summary jsonb not null default '{}'::jsonb,
  key_concepts jsonb not null default '[]'::jsonb,
  examples jsonb not null default '[]'::jsonb,
  common_mistakes jsonb not null default '[]'::jsonb,
  study_methods jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.study_sources (
  id uuid primary key default gen_random_uuid(),
  summary_id uuid not null references public.study_summaries(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  url text not null,
  source_type text not null default 'web' check (source_type in ('web', 'video', 'book', 'official', 'article')),
  credibility_score numeric(3,2) check (credibility_score is null or (credibility_score >= 0 and credibility_score <= 1)),
  created_at timestamptz not null default now()
);

create table if not exists public.flashcard_decks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  summary_id uuid references public.study_summaries(id) on delete set null,
  title text not null,
  subject text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.flashcards (
  id uuid primary key default gen_random_uuid(),
  deck_id uuid not null references public.flashcard_decks(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  front text not null,
  back text not null,
  hint text,
  card_type text not null default 'qa' check (card_type in ('qa', 'cloze', 'true_false', 'concept_example', 'error_correction', 'step')),
  difficulty int not null default 3 check (difficulty between 1 and 5),
  confidence int not null default 0 check (confidence between 0 and 5),
  interval_days int not null default 0 check (interval_days >= 0),
  ease numeric(4,2) not null default 2.50 check (ease >= 1.30),
  lapses int not null default 0 check (lapses >= 0),
  next_review_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.quizzes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  summary_id uuid references public.study_summaries(id) on delete set null,
  title text not null,
  mode text not null default 'quiz' check (mode in ('quiz', 'simulado', 'prova', 'diagnostico')),
  difficulty text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.questions (
  id uuid primary key default gen_random_uuid(),
  quiz_id uuid not null references public.quizzes(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  prompt text not null,
  question_type text not null default 'multiple_choice' check (question_type in ('multiple_choice', 'true_false', 'short_answer', 'justify', 'cloze')),
  options jsonb not null default '[]'::jsonb,
  correct_answer text,
  explanation text,
  skill_codes text[] not null default '{}',
  created_at timestamptz not null default now()
);

create table if not exists public.answer_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  question_id uuid not null references public.questions(id) on delete cascade,
  answer text,
  is_correct boolean not null default false,
  confidence int check (confidence is null or confidence between 1 and 5),
  hints_used int not null default 0 check (hints_used >= 0),
  response_time_sec int check (response_time_sec is null or response_time_sec >= 0),
  error_type text check (error_type is null or error_type in ('leitura', 'conceito', 'procedimento', 'calculo', 'unidade', 'sinal', 'interpretacao', 'chute', 'formula', 'comunicacao')),
  created_at timestamptz not null default now()
);

create table if not exists public.error_notebook_entries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  source_type text not null default 'quiz' check (source_type in ('quiz', 'simulado', 'problema', 'tutor', 'diagnostico')),
  topic text not null,
  subject text,
  error_type text not null check (error_type in ('leitura', 'conceito', 'procedimento', 'calculo', 'unidade', 'sinal', 'interpretacao', 'chute', 'formula', 'comunicacao')),
  prompt text,
  wrong_answer text,
  correction text,
  recommended_action jsonb not null default '{}'::jsonb,
  next_review_at timestamptz,
  resolved_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.tutor_conversations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  mode text not null default 'socratico',
  topic text,
  subject text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.tutor_messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.tutor_conversations(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null check (role in ('user', 'assistant', 'system')),
  content text not null,
  safety_flags jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.learning_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  subject text not null,
  skill_code text not null,
  mastery numeric(4,3) not null default 0 check (mastery >= 0 and mastery <= 1),
  attempts int not null default 0 check (attempts >= 0),
  last_studied_at timestamptz,
  next_review_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, subject, skill_code)
);

create table if not exists public.study_plans (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  goal text,
  grade_level text,
  exam_target text,
  starts_on date,
  ends_on date,
  settings jsonb not null default '{}'::jsonb,
  blocks jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.generated_pdfs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  summary_id uuid references public.study_summaries(id) on delete set null,
  title text not null,
  storage_path text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists study_summaries_user_id_created_at_idx on public.study_summaries(user_id, created_at desc);
create index if not exists study_summaries_topic_idx on public.study_summaries using gin(to_tsvector('portuguese', topic));
create index if not exists study_sources_summary_id_idx on public.study_sources(summary_id);
create index if not exists study_sources_user_id_idx on public.study_sources(user_id);
create index if not exists flashcard_decks_user_id_idx on public.flashcard_decks(user_id);
create index if not exists flashcards_deck_id_idx on public.flashcards(deck_id);
create index if not exists flashcards_user_id_next_review_idx on public.flashcards(user_id, next_review_at);
create index if not exists quizzes_user_id_idx on public.quizzes(user_id);
create index if not exists questions_quiz_id_idx on public.questions(quiz_id);
create index if not exists questions_user_id_idx on public.questions(user_id);
create index if not exists answer_attempts_user_id_created_at_idx on public.answer_attempts(user_id, created_at desc);
create index if not exists answer_attempts_question_id_idx on public.answer_attempts(question_id);
create index if not exists error_notebook_user_id_next_review_idx on public.error_notebook_entries(user_id, next_review_at);
create index if not exists tutor_conversations_user_id_idx on public.tutor_conversations(user_id);
create index if not exists tutor_messages_conversation_id_idx on public.tutor_messages(conversation_id, created_at);
create index if not exists tutor_messages_user_id_idx on public.tutor_messages(user_id);
create index if not exists learning_progress_user_id_idx on public.learning_progress(user_id);
create index if not exists study_plans_user_id_idx on public.study_plans(user_id);
create index if not exists generated_pdfs_user_id_idx on public.generated_pdfs(user_id);

create or replace function private.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, display_name, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'display_name', split_part(new.email, '@', 1)),
    coalesce(new.raw_app_meta_data ->> 'role', 'student')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function private.handle_new_user();

create trigger profiles_set_updated_at before update on public.profiles
for each row execute function private.set_updated_at();
create trigger study_summaries_set_updated_at before update on public.study_summaries
for each row execute function private.set_updated_at();
create trigger flashcard_decks_set_updated_at before update on public.flashcard_decks
for each row execute function private.set_updated_at();
create trigger flashcards_set_updated_at before update on public.flashcards
for each row execute function private.set_updated_at();
create trigger quizzes_set_updated_at before update on public.quizzes
for each row execute function private.set_updated_at();
create trigger error_notebook_set_updated_at before update on public.error_notebook_entries
for each row execute function private.set_updated_at();
create trigger tutor_conversations_set_updated_at before update on public.tutor_conversations
for each row execute function private.set_updated_at();
create trigger learning_progress_set_updated_at before update on public.learning_progress
for each row execute function private.set_updated_at();
create trigger study_plans_set_updated_at before update on public.study_plans
for each row execute function private.set_updated_at();

alter table public.profiles enable row level security;
alter table public.study_summaries enable row level security;
alter table public.study_sources enable row level security;
alter table public.flashcard_decks enable row level security;
alter table public.flashcards enable row level security;
alter table public.quizzes enable row level security;
alter table public.questions enable row level security;
alter table public.answer_attempts enable row level security;
alter table public.error_notebook_entries enable row level security;
alter table public.tutor_conversations enable row level security;
alter table public.tutor_messages enable row level security;
alter table public.learning_progress enable row level security;
alter table public.study_plans enable row level security;
alter table public.generated_pdfs enable row level security;

create policy profiles_owner_select on public.profiles
for select to authenticated using ((select auth.uid()) = id);
create policy profiles_owner_update on public.profiles
for update to authenticated using ((select auth.uid()) = id) with check ((select auth.uid()) = id);

create policy study_summaries_owner_all on public.study_summaries
for all to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy study_sources_owner_all on public.study_sources
for all to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy flashcard_decks_owner_all on public.flashcard_decks
for all to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy flashcards_owner_all on public.flashcards
for all to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy quizzes_owner_all on public.quizzes
for all to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy questions_owner_all on public.questions
for all to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy answer_attempts_owner_all on public.answer_attempts
for all to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy error_notebook_owner_all on public.error_notebook_entries
for all to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy tutor_conversations_owner_all on public.tutor_conversations
for all to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy tutor_messages_owner_all on public.tutor_messages
for all to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy learning_progress_owner_all on public.learning_progress
for all to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy study_plans_owner_all on public.study_plans
for all to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy generated_pdfs_owner_all on public.generated_pdfs
for all to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
