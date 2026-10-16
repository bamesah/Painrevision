-- Member feedback form + single-use reward code.
-- One row per member (lifetime): UNIQUE (user_id) is what makes the reward
-- idempotent — a refresh, double-click or retry can never mint a second code.
-- All writes come from api/submit-feedback.js using the service-role key
-- (which bypasses RLS). The code is generated server-side only, so members get
-- SELECT on their own row but NO insert/update/delete grant or policy: a
-- client-side insert would let someone invent their own code.
--
-- Run in Supabase Dashboard -> SQL Editor -> New query -> paste -> Run.

create table if not exists feedback_submissions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users(id) on delete cascade,
  answers jsonb not null,
  code text not null unique,                 -- e.g. FB-7K2M-9QXD, also the Stripe promotion code
  stripe_promotion_code_id text,             -- set once the Stripe promotion code exists
  emailed_at timestamptz,                    -- set once the reward email was sent
  created_at timestamptz not null default now()
);

alter table feedback_submissions enable row level security;

grant select on feedback_submissions to authenticated;

drop policy if exists "feedback_select_own" on feedback_submissions;
create policy "feedback_select_own" on feedback_submissions
  for select to authenticated
  using (user_id = auth.uid());
