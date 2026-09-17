// One-off admin script: email every PainRevision user via Resend.
// Not deployed — run manually, locally, with SUPABASE_SERVICE_ROLE_KEY and
// RESEND_API_KEY set in the environment (pull them from the Vercel project).
//
// Usage:
//   node scripts/broadcast-email.mjs --subject "..." --body-file scripts/broadcasts/foo.html            (dry run)
//   node scripts/broadcast-email.mjs --subject "..." --body-file scripts/broadcasts/foo.html --test=you@example.com
//   node scripts/broadcast-email.mjs --subject "..." --body-file scripts/broadcasts/foo.html --send      (real send)
import { readFileSync } from 'fs';
import { createClient } from '@supabase/supabase-js';
import { sendBroadcastEmail } from '../api/_lib/email.js';

const SUPABASE_URL = 'https://vxlxcxqyankqugwiypac.supabase.co';
// Resend's default rate limit is ~2 requests/sec — send one at a time with a
// delay rather than firing many concurrent requests that would just 429.
const SEND_DELAY_MS = 600;

function parseArgs(argv) {
  const args = { send: false, test: null, subject: null, bodyFile: null };
  for (const arg of argv) {
    if (arg === '--send') args.send = true;
    else if (arg.startsWith('--test=')) args.test = arg.slice('--test='.length);
    else if (arg === '--subject') args._nextSubject = true;
    else if (args._nextSubject) { args.subject = arg; args._nextSubject = false; }
    else if (arg.startsWith('--subject=')) args.subject = arg.slice('--subject='.length);
    else if (arg === '--body-file') args._nextBodyFile = true;
    else if (args._nextBodyFile) { args.bodyFile = arg; args._nextBodyFile = false; }
    else if (arg.startsWith('--body-file=')) args.bodyFile = arg.slice('--body-file='.length);
  }
  return args;
}

async function listAllUsers(supabaseAdmin) {
  const recipients = [];
  for (let page = 1; page <= 20; page++) {
    const { data, error } = await supabaseAdmin.auth.admin.listUsers({ page, perPage: 1000 });
    if (error) throw error;
    for (const u of data.users) {
      if (u.email) recipients.push({ email: u.email, firstName: u.user_metadata?.first_name || null });
    }
    if (data.users.length < 1000) break;
  }
  return recipients;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  const args = parseArgs(process.argv.slice(2));

  if (!args.subject || !args.bodyFile) {
    console.error('Usage: node scripts/broadcast-email.mjs --subject "..." --body-file <path> [--test=email] [--send]');
    process.exit(1);
  }
  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY is not set in the environment.');
    process.exit(1);
  }

  const bodyHtml = readFileSync(args.bodyFile, 'utf8');

  if (args.test) {
    console.log(`Sending test email to ${args.test}...`);
    await sendBroadcastEmail({ to: args.test, firstName: null, subject: args.subject, bodyHtml });
    console.log('Test email sent.');
    return;
  }

  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.error('SUPABASE_SERVICE_ROLE_KEY is not set in the environment.');
    process.exit(1);
  }
  const supabaseAdmin = createClient(SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
  const recipients = await listAllUsers(supabaseAdmin);

  console.log(`Found ${recipients.length} user(s).`);
  console.log('Sample:', recipients.slice(0, 5).map(r => r.email).join(', '));

  if (!args.send) {
    console.log('\nDry run — no emails sent. Re-run with --send to email everyone, or --test=<email> to preview one.');
    return;
  }

  let sent = 0;
  const failed = [];
  for (let i = 0; i < recipients.length; i++) {
    const r = recipients[i];
    try {
      await sendBroadcastEmail({ to: r.email, firstName: r.firstName, subject: args.subject, bodyHtml });
      sent++;
    } catch (err) {
      failed.push({ email: r.email, error: err.message || String(err) });
    }
    if ((i + 1) % 25 === 0 || i === recipients.length - 1) {
      console.log(`Progress: ${i + 1}/${recipients.length} (${sent} sent, ${failed.length} failed)`);
    }
    if (i < recipients.length - 1) await sleep(SEND_DELAY_MS);
  }

  console.log(`\nDone. Sent: ${sent}. Failed: ${failed.length}.`);
  if (failed.length) {
    console.log('Failed recipients:');
    for (const f of failed) console.log(`  ${f.email}: ${f.error}`);
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
