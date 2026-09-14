-- migration_019_case_insensitive_auth.sql
-- Case-insensitive uniqueness for usernames and emails, plus RPCs the
-- signup page can call (pre-submit) to show a clean "already in use"
-- error instead of a raw database error.
-- Run this in Supabase Dashboard -> SQL Editor -> New query -> paste -> Run.

-- Replace the case-sensitive unique constraint on profiles.username with a
-- case-insensitive one, so 'Ann_Smith' and 'ann_smith' collide.
alter table profiles drop constraint if exists profiles_username_key;
create unique index if not exists profiles_username_lower_idx on profiles (lower(username));

-- Pre-submit availability checks (security definer so anon/unauthenticated
-- visitors on the signup page can call them despite RLS on profiles, and so
-- the email check can read auth.users which is not otherwise exposed).
create or replace function public.username_available(p_username text)
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select not exists (
    select 1 from profiles where lower(username) = lower(p_username)
  );
$$;

create or replace function public.email_available(p_email text)
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select not exists (
    select 1 from auth.users where lower(email) = lower(p_email)
  );
$$;

grant execute on function public.username_available(text) to anon, authenticated;
grant execute on function public.email_available(text) to anon, authenticated;
