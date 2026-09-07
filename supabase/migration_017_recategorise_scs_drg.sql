-- migration_017_recategorise_scs_drg.sql
-- Move the two neurostimulation MTFs from batch 5 into Physics & Clinical
-- Measurement (they were seeded as Physiology / Clinical Pain):
--   q_mtf_scs_mechanism_001   Spinal cord stimulation — mechanism of action
--   q_mtf_drg_stimulation_001 Dorsal root ganglion (DRG) stimulation
--
-- Assumes one category per question. Safe to run directly in the Supabase SQL
-- Editor and idempotent — re-running it is a no-op.

-- drop any existing category link for these two that isn't the target category
delete from question_categories
  where question_id in ('q_mtf_scs_mechanism_001', 'q_mtf_drg_stimulation_001')
    and category_id <> (select id from categories where name = 'Physics & Clinical Measurement');

-- add the target category link if it isn't there yet
insert into question_categories (question_id, category_id)
  select 'q_mtf_scs_mechanism_001', id from categories where name = 'Physics & Clinical Measurement'
  on conflict do nothing;
insert into question_categories (question_id, category_id)
  select 'q_mtf_drg_stimulation_001', id from categories where name = 'Physics & Clinical Measurement'
  on conflict do nothing;
