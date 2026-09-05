-- Per-question personal notes (rich text, auto-saved).
--
-- The `question_notes` table was first defined in migration_002_phase0.sql.
-- This migration re-declares it idempotently so the notes feature — a
-- collapsible rich-text note on every question, plus the "Review my notes"
-- link on the dashboard — has a guaranteed home even if 002 was never applied.
-- Safe to run more than once.
--
-- Run in Supabase Dashboard -> SQL Editor -> New query -> paste -> Run.

create table if not exists question_notes (
  user_id uuid not null references auth.users(id) on delete cascade,
  question_id text not null references questions(id) on delete cascade,
  note text not null default '',
  updated_at timestamptz not null default now(),
  primary key (user_id, question_id)
);

alter table question_notes enable row level security;

-- Owner-only: a user can see and change nothing but their own notes.
drop policy if exists "question_notes_owner" on question_notes;
create policy "question_notes_owner" on question_notes for all to authenticated
  using (user_id = auth.uid()) with check (user_id = auth.uid());

-- Fast "all of this user's noted questions" lookup (dashboard count + notes review).
create index if not exists question_notes_user_idx on question_notes (user_id);
