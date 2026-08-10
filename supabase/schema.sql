-- PainRevision question bank — core schema
-- Run this once in Supabase Dashboard → SQL Editor → New query → paste → Run

create extension if not exists "pgcrypto";

-- ===== Categories (topics), supports nesting =====
create table categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  parent_id uuid references categories(id) on delete set null,
  created_at timestamptz not null default now()
);

-- ===== Questions =====
-- Keeps the existing human-readable ids (e.g. 'q_beta_arrestin_001').
-- `data` holds everything type-specific (choices/correct/explanation for
-- SBA & MTF, or lead/options/sub-questions for EMQ) so the shape stays
-- close to the current questions.json and admin.html doesn't need a rewrite.
create table questions (
  id text primary key,
  type text not null check (type in ('SBA','MTF','EMQ')),
  data jsonb not null,
  status text not null default 'published' check (status in ('draft','published')),
  created_by uuid references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ===== Question <-> Category (many-to-many: one or more categories each) =====
create table question_categories (
  question_id text references questions(id) on delete cascade,
  category_id uuid references categories(id) on delete cascade,
  primary key (question_id, category_id)
);

-- ===== Profiles (extends Supabase auth.users with role) =====
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique,
  role text not null default 'user' check (role in ('user','admin')),
  created_at timestamptz not null default now()
);

-- auto-create a profile row whenever someone signs up
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, username, role)
  values (new.id, new.raw_user_meta_data->>'username', 'user');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ===== Question sets (fixed sets & mock exams) =====
create table question_sets (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  type text not null check (type in ('fixed','mock_exam')),
  time_limit_mins int,
  created_by uuid references auth.users(id),
  created_at timestamptz not null default now()
);

create table question_set_items (
  set_id uuid references question_sets(id) on delete cascade,
  question_id text references questions(id) on delete cascade,
  position int not null,
  primary key (set_id, question_id)
);

-- ===== Attempts (a practice/timed/mock session) =====
create table attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  set_id uuid references question_sets(id),
  mode text not null check (mode in ('practice','timed','mock','random')),
  started_at timestamptz not null default now(),
  completed_at timestamptz,
  score numeric
);

create table attempt_answers (
  id uuid primary key default gen_random_uuid(),
  attempt_id uuid not null references attempts(id) on delete cascade,
  question_id text not null references questions(id),
  answer jsonb not null,
  is_correct boolean,
  time_spent_secs int,
  flagged boolean not null default false,
  created_at timestamptz not null default now()
);

-- ===== Question reports (report question / suggest better category) =====
create table question_reports (
  id uuid primary key default gen_random_uuid(),
  question_id text not null references questions(id),
  user_id uuid references auth.users(id),
  reason text,
  comment text,
  suggested_category text,
  status text not null default 'open' check (status in ('open','reviewed','resolved')),
  created_at timestamptz not null default now()
);

-- =========================================================
-- Row Level Security
-- =========================================================

alter table categories enable row level security;
alter table questions enable row level security;
alter table question_categories enable row level security;
alter table profiles enable row level security;
alter table question_sets enable row level security;
alter table question_set_items enable row level security;
alter table attempts enable row level security;
alter table attempt_answers enable row level security;
alter table question_reports enable row level security;

create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1 from profiles where id = auth.uid() and role = 'admin'
  );
$$;

-- categories: readable by any signed-in user, writable only by admins
create policy "categories_select" on categories for select to authenticated using (true);
create policy "categories_write" on categories for all to authenticated using (is_admin()) with check (is_admin());

-- questions: signed-in users see published questions, admins see everything and write
create policy "questions_select" on questions for select to authenticated using (status = 'published' or is_admin());
create policy "questions_insert" on questions for insert to authenticated with check (is_admin());
create policy "questions_update" on questions for update to authenticated using (is_admin()) with check (is_admin());
create policy "questions_delete" on questions for delete to authenticated using (is_admin());

-- question_categories: same pattern
create policy "question_categories_select" on question_categories for select to authenticated using (true);
create policy "question_categories_write" on question_categories for all to authenticated using (is_admin()) with check (is_admin());

-- profiles: users see/update their own row, admins see/update all
create policy "profiles_select" on profiles for select to authenticated using (id = auth.uid() or is_admin());
create policy "profiles_update_self" on profiles for update to authenticated using (id = auth.uid()) with check (id = auth.uid());
create policy "profiles_update_admin" on profiles for update to authenticated using (is_admin()) with check (is_admin());

-- question_sets / question_set_items: readable by all signed-in users, admin-writable
create policy "question_sets_select" on question_sets for select to authenticated using (true);
create policy "question_sets_write" on question_sets for all to authenticated using (is_admin()) with check (is_admin());
create policy "question_set_items_select" on question_set_items for select to authenticated using (true);
create policy "question_set_items_write" on question_set_items for all to authenticated using (is_admin()) with check (is_admin());

-- attempts / attempt_answers: users manage their own only (admins can view all)
create policy "attempts_owner" on attempts for all to authenticated
  using (user_id = auth.uid() or is_admin())
  with check (user_id = auth.uid());

create policy "attempt_answers_owner" on attempt_answers for all to authenticated
  using (exists (select 1 from attempts a where a.id = attempt_answers.attempt_id and (a.user_id = auth.uid() or is_admin())))
  with check (exists (select 1 from attempts a where a.id = attempt_answers.attempt_id and a.user_id = auth.uid()));

-- question_reports: any signed-in user can file one and see their own, admins see/update all
create policy "question_reports_insert" on question_reports for insert to authenticated with check (user_id = auth.uid());
create policy "question_reports_select" on question_reports for select to authenticated using (user_id = auth.uid() or is_admin());
create policy "question_reports_update" on question_reports for update to authenticated using (is_admin()) with check (is_admin());
