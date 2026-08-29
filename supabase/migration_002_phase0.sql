-- Phase 0 + engagement groundwork.
-- Run this in Supabase Dashboard -> SQL Editor -> New query -> paste -> Run,
-- AFTER schema.sql and seed.sql have already been run once.

-- =========================================================
-- 1. Open published-question reads to anonymous visitors.
--    questions.html is a public taster page (no login required) and now
--    reads live from these tables instead of the static questions.json.
--    The original policies were `to authenticated` only, which would have
--    silently returned zero rows for logged-out visitors.
-- =========================================================

drop policy if exists "categories_select" on categories;
create policy "categories_select" on categories for select using (true);

drop policy if exists "questions_select" on questions;
create policy "questions_select" on questions for select using (status = 'published' or is_admin());

drop policy if exists "question_categories_select" on question_categories;
create policy "question_categories_select" on question_categories for select using (true);

-- =========================================================
-- 2. Bookmarks — flag a question for later review, independent of
--    right/wrong. Owner-only.
-- =========================================================

create table bookmarks (
  user_id uuid not null references auth.users(id) on delete cascade,
  question_id text not null references questions(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, question_id)
);

alter table bookmarks enable row level security;
create policy "bookmarks_owner" on bookmarks for all to authenticated
  using (user_id = auth.uid()) with check (user_id = auth.uid());

-- =========================================================
-- 3. Per-question personal notes. Owner-only.
-- =========================================================

create table question_notes (
  user_id uuid not null references auth.users(id) on delete cascade,
  question_id text not null references questions(id) on delete cascade,
  note text not null default '',
  updated_at timestamptz not null default now(),
  primary key (user_id, question_id)
);

alter table question_notes enable row level security;
create policy "question_notes_owner" on question_notes for all to authenticated
  using (user_id = auth.uid()) with check (user_id = auth.uid());

-- =========================================================
-- 4. Confidence rating, captured alongside each answer.
-- =========================================================

alter table attempt_answers
  add column confidence text check (confidence in ('sure','unsure','guess'));

-- =========================================================
-- 5. Community difficulty stats — aggregate only (never exposes who
--    answered what), readable by anyone so "X% of users got this right"
--    can show even to logged-out visitors.
-- =========================================================

create table question_stats (
  question_id text primary key references questions(id) on delete cascade,
  times_answered int not null default 0,
  times_correct int not null default 0
);

alter table question_stats enable row level security;
create policy "question_stats_select" on question_stats for select using (true);

create or replace function public.bump_question_stats()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into question_stats (question_id, times_answered, times_correct)
  values (new.question_id, 1, case when new.is_correct then 1 else 0 end)
  on conflict (question_id) do update
    set times_answered = question_stats.times_answered + 1,
        times_correct = question_stats.times_correct + case when new.is_correct then 1 else 0 end;
  return new;
end;
$$;

create trigger on_attempt_answer_insert
  after insert on attempt_answers
  for each row execute procedure public.bump_question_stats();
