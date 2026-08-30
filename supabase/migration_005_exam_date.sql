-- Adds an exam date to profiles, so the dashboard can show a countdown.
-- Run this in Supabase Dashboard -> SQL Editor -> New query -> paste -> Run.

alter table profiles add column exam_date date;
