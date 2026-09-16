// Transactional email via Resend's REST API (no SDK needed — plain fetch).
// Requires RESEND_API_KEY in the environment; the domain in FROM must be
// verified in the Resend dashboard before sending will work.
const FROM = 'PainRevision <no-reply@painrevision.com>';

async function send({ to, subject, html }) {
  if (!process.env.RESEND_API_KEY) {
    console.error('sendWelcomeEmail skipped: RESEND_API_KEY not set');
    return;
  }
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ from: FROM, to, subject, html }),
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Resend send failed (${res.status}): ${body}`);
  }
}

export async function sendWelcomeEmail({ email, firstName, username }) {
  const html = `
<div style="font-family:'Plus Jakarta Sans',system-ui,sans-serif;background:#FBF5EE;padding:32px 16px;color:#241B16;">
  <div style="max-width:480px;margin:0 auto;background:#FFFFFF;border:1.5px solid #EDE3D7;border-radius:22px;padding:40px;">
    <div style="font-weight:800;font-size:17px;letter-spacing:-0.03em;margin-bottom:28px;">
      <span style="color:#241B16;">Pain</span><span style="color:#F0623C;">Revision</span>
    </div>
    <p style="font-size:19px;font-weight:800;letter-spacing:-0.02em;margin:0 0 12px;">Welcome, ${firstName}</p>
    <p style="font-size:14px;line-height:1.7;color:#3A2D25;margin:0 0 20px;">
      Your PainRevision account is ready. You're all set to start practicing with your username:
    </p>
    <div style="margin:0 0 20px;">
      <p style="font-family:'IBM Plex Mono',ui-monospace,monospace;font-size:14px;font-weight:600;background:#FBD9CC;color:#D2491F;display:inline-block;padding:8px 14px;border-radius:8px;margin:0;">
        ${username}
      </p>
    </div>
    <div style="margin:0 0 32px;">
      <a href="https://www.painrevision.com/login.html" style="display:inline-block;background:#F0623C;color:#fff;border-radius:999px;padding:12px 26px;font-weight:600;font-size:14px;text-decoration:none;">
        Go to dashboard
      </a>
    </div>
    <p style="font-size:12px;line-height:1.6;color:#7C7068;margin:0;padding-top:20px;border-top:1px solid #EDE3D7;">
      Having trouble? Contact us at <a href="mailto:contact@painrevision.com" style="color:#7C7068;">contact@painrevision.com</a> or by <a href="https://www.painrevision.com/contact.html" style="color:#D2491F;font-weight:600;">clicking here</a>.
    </p>
  </div>
</div>`.trim();

  await send({ to: email, subject: 'Welcome to PainRevision', html });
}
