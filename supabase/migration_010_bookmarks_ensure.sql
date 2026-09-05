-- Bookmark a question for later review.
--
-- The `bookmarks` table was first defined in migration_002_phase0.sql. This
-- migration re-declares it idempotently so the bookmark feature (a bookmark
-- icon on every question in a practice set / mock exam, plus the "Bookmarked
-- Questions" card on the dashboard) has a guaranteed home even if 002 was
-- never applied. Safe to run more than once.
--
-- Run in Supabase Dashboard -> SQL Editor -> New query -> paste -> Run.

create table if not exists bookmarks (
  user_id uuid not null references auth.users(id) on delete cascade,
  question_id text not null references questions(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, question_id)
);

alter table bookmarks enable row level security;

-- Owner-only: a user can see and change nothing but their own bookmarks.
drop policy if exists "bookmarks_owner" on bookmarks;
create policy "bookmarks_owner" on bookmarks for all to authenticated
  using (user_id = auth.uid()) with check (user_id = auth.uid());

-- Fast "all of this user's bookmarks" lookup (dashboard count + bookmarks set).
create index if not exists bookmarks_user_idx on bookmarks (user_id);
