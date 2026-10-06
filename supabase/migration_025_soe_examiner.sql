-- migration_025_soe_examiner.sql
-- SOE mock exam examiner section: candidate folders + per-station scoring.
-- Exam content itself (long case / SCQ / clinical science text) lives in
-- js/soe-data.js, not the database — only candidates and their scores are stored here.
--
-- examiner.html has no login or password at all (link-accessible only, per user's
-- choice), so these tables are opened to the anon role, the same trust model already
-- used for e.g. question_reports. Anyone holding the anon publishable key (visible in
-- any page's JS) can technically read/write these rows directly via the REST API.
--
-- Idempotent — safe to run more than once.
-- Run in Supabase Dashboard -> SQL Editor -> New query -> paste -> Run.

create extension if not exists "pgcrypto";

create table if not exists soe_candidates (
  id uuid primary key default gen_random_uuid(),
  course_key text not null,
  name text not null,
  created_at timestamptz not null default now()
);

create table if not exists soe_scores (
  id uuid primary key default gen_random_uuid(),
  candidate_id uuid not null references soe_candidates(id) on delete cascade,
  mock_key text not null,
  station_key text not null,
  part_key text not null,
  score smallint check (score in (0,1,2)),
  feedback text,
  criteria jsonb not null default '{}'::jsonb,
  examiner_name text,
  submitted boolean not null default false,
  updated_at timestamptz not null default now(),
  unique (candidate_id, mock_key, station_key, part_key)
);

create index if not exists soe_scores_candidate_idx on soe_scores (candidate_id);

alter table soe_candidates enable row level security;
alter table soe_scores enable row level security;

grant select, insert, update, delete on soe_candidates to anon, authenticated;
grant select, insert, update, delete on soe_scores to anon, authenticated;

drop policy if exists "soe_candidates_all" on soe_candidates;
create policy "soe_candidates_all" on soe_candidates for all to anon, authenticated using (true) with check (true);

drop policy if exists "soe_scores_all" on soe_scores;
create policy "soe_scores_all" on soe_scores for all to anon, authenticated using (true) with check (true);

-- Seed the October 14 course's candidate list (idempotent — skips names already present).
insert into soe_candidates (course_key, name)
select 'oct14-nov-soe', name from (values
  ('Aashish Koirala'), ('Ahsan Kamran'), ('Benjamin Griffiths'), ('Gabrielle Scarlett'),
  ('James Smith'), ('Katie Ramm'), ('Mohammed Metwally'), ('Mostafa Kodous'),
  ('Mrida Jhingan'), ('Samriti Sharma'), ('Satish Singh'), ('Zhi Jiun Yap')
) as seed(name)
where not exists (
  select 1 from soe_candidates c where c.course_key = 'oct14-nov-soe' and c.name = seed.name
);
