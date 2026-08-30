// Injects a "Log out" control into the site nav (desktop + mobile drawer)
// on any page that includes this script, but only if the visitor turns out
// to be logged in. Self-contained (ships its own styles) so pages don't
// need extra CSS just for this. Requires js/supabase-client.js loaded first.
(function () {
  const STYLE = `
    .nav-logout-btn{font-family:var(--san,inherit);font-size:14.5px;font-weight:500;color:var(--stone,#7C7068);padding:8px 14px;border-radius:999px;background:none;border:none;cursor:pointer;transition:color .18s,background .18s;-webkit-tap-highlight-color:transparent}
    .nav-links .nav-logout-btn:hover{color:var(--ink,#241B16);background:var(--surface-warm,#FFFAF4)}
    .nav-drawer-panel .nav-logout-btn{font-size:15px;font-weight:600;color:var(--ink,#241B16);padding:9px 12px;border-radius:10px;text-align:left;width:100%;display:block}
    .nav-drawer-panel .nav-logout-btn:hover{background:rgba(36,27,22,.06)}
  `;

  async function logout() {
    await sb.auth.signOut();
    window.location.href = 'index.html';
  }

  async function init() {
    if (typeof sb === 'undefined') return;
    const { data: { session } } = await sb.auth.getSession();
    if (!session) return;

    const styleEl = document.createElement('style');
    styleEl.textContent = STYLE;
    document.head.appendChild(styleEl);

    document.querySelectorAll('.nav-links, .nav-drawer-panel').forEach(container => {
      if (container.querySelector('.nav-logout-btn')) return;
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'nav-logout-btn';
      btn.textContent = 'Log out';
      btn.addEventListener('click', logout);
      container.appendChild(btn);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
