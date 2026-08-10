// Shared Supabase client — included on every page that needs accounts or database access.
// The publishable key is safe to expose publicly: it can only do what Row Level
// Security (see supabase/schema.sql) allows for the current signed-in user.
const SUPABASE_URL = 'https://vxlxcxqyankqugwiypac.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_YldSebxWkpviAWIdWghULA_Q4qvYtVy';

const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
