-- Adds first name + last name to profiles, so the dashboard can greet users
-- by name instead of their (often handle-style) username.
-- Run this in Supabase Dashboard -> SQL Editor -> New query -> paste -> Run.

alter table profiles add column first_name text;
alter table profiles add column last_name text;

-- Re-point the signup trigger to also capture first_name/last_name from the
-- metadata signup.html now sends alongside username.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, username, first_name, last_name, role)
  values (new.id, new.raw_user_meta_data->>'username', new.raw_user_meta_data->>'first_name', new.raw_user_meta_data->>'last_name', 'user');
  return new;
end;
$$;
