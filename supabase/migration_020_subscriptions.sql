-- Paid access to the full question bank. One row per user; a repeat/renewal
-- purchase upserts (extends) the same row rather than creating a new one.
-- `plan` is a free-text identifier so future recurring plans can reuse this
-- table without a schema change — nothing here assumes "one-time" only.
--
-- Run in Supabase Dashboard -> SQL Editor -> New query -> paste -> Run.

create table if not exists subscriptions (
  user_id uuid primary key references auth.users(id) on delete cascade,
  status text not null default 'inactive'
    check (status in ('inactive','active','cancelled','expired')),
  plan text not null,                 -- e.g. 'launch_offer_2026_oct', later 'monthly', 'annual'
  expires_at timestamptz,             -- null = no expiry (future use); offer rows always set this
  stripe_customer_id text,
  stripe_checkout_session_id text,
  stripe_payment_intent_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table subscriptions enable row level security;

-- PostgREST needs the row-level grant; RLS below is what actually restricts.
-- No insert/update/delete grant for anon/authenticated: all writes come from
-- the Stripe webhook using the service-role key, which bypasses RLS entirely
-- at the Postgres level — so no write policy is needed or created here.
grant select on subscriptions to authenticated;

drop policy if exists "subscriptions_select_own" on subscriptions;
create policy "subscriptions_select_own" on subscriptions
  for select to authenticated
  using (user_id = auth.uid());

create index if not exists subscriptions_expires_at_idx on subscriptions (expires_at);
