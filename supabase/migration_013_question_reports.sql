-- migration_013_question_reports.sql
-- "Report a problem" feature: a candidate flags a question they think contains
-- a mistake and leaves a comment; admins triage the reports in admin-reports.html.
--
-- Idempotent — safe to run more than once.
-- Run in Supabase Dashboard -> SQL Editor -> New query -> paste -> Run.

create extension if not exists "pgcrypto";

create table if not exists question_reports (
  id uuid primary key default gen_random_uuid(),
  question_id text not null references questions(id) on delete cascade,
  user_id uuid references auth.users(id) on delete set null,
  reason text,
  comment text,
  suggested_category text,
  status text not null default 'open' check (status in ('open','reviewed','resolved')),
  created_at timestamptz not null default now()
);

alter table question_reports enable row level security;

-- Triage reads the list filtered by status, newest first.
create index if not exists question_reports_status_created_idx
  on question_reports (status, created_at desc);

-- PostgREST needs the row-level grant; RLS below is what actually restricts.
grant insert on question_reports to anon, authenticated;
grant select, update, delete on question_reports to authenticated;

-- Anyone can file a report, signed in or not. A signed-in user stamps their own
-- id (or leaves it null); an anonymous visitor always leaves it null.
drop policy if exists "question_reports_insert" on question_reports;
drop policy if exists "question_reports_insert_anon" on question_reports;
create policy "question_reports_insert" on question_reports
  for insert to anon, authenticated
  with check (user_id is null or user_id = auth.uid());

-- A reporter can see their own reports; admins see every report.
drop policy if exists "question_reports_select" on question_reports;
create policy "question_reports_select" on question_reports
  for select to authenticated
  using (user_id = auth.uid() or is_admin());

-- Only admins change a report's status.
drop policy if exists "question_reports_update" on question_reports;
create policy "question_reports_update" on question_reports
  for update to authenticated
  using (is_admin()) with check (is_admin());

-- Only admins delete a report (used to clear out resolved ones).
drop policy if exists "question_reports_delete" on question_reports;
create policy "question_reports_delete" on question_reports
  for delete to authenticated
  using (is_admin());
