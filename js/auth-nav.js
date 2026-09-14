// Injects a "Log out" control into the site nav (desktop + mobile drawer) on
// any page that includes this script when the visitor is logged in, or an
// orange "Log in" button when they're not. Self-contained (ships its own
// styles) so pages don't need extra CSS just for this. Requires
// js/supabase-client.js loaded first.
(function () {
  const STYLE = `
    .nav-logout-btn{font-family:var(--san,inherit);font-size:14.5px;font-weight:500;color:var(--stone,#7C7068);padding:8px 14px;border-radius:999px;background:none;border:none;cursor:pointer;transition:color .18s,background .18s;-webkit-tap-highlight-color:transparent}
    .nav-links .nav-logout-btn:hover{color:var(--ink,#241B16);background:var(--surface-warm,#FFFAF4)}
    .nav-drawer-panel .nav-logout-btn{font-size:15px;font-weight:600;color:var(--ink,#241B16);padding:9px 12px;border-radius:10px;text-align:left;width:100%;display:block}
    .nav-drawer-panel .nav-logout-btn:hover{background:rgba(36,27,22,.06)}
    .nav-links .nav-login-btn{font-family:var(--san,inherit);font-size:13.5px;font-weight:700;color:#fff;background:var(--coral,#F0623C);padding:8px 18px;border-radius:999px;margin-left:6px;transition:background .18s,transform .18s,box-shadow .18s;display:inline-flex;align-items:center;white-space:nowrap}
    .nav-links .nav-login-btn:hover{background:var(--coral-deep,#D2491F);transform:translateY(-1px);box-shadow:0 6px 16px -6px rgba(240,98,60,.5)}
    .nav-drawer-panel .nav-login-btn{font-size:15px;font-weight:700;color:#fff;background:var(--coral,#F0623C);padding:10px 12px;border-radius:10px;text-align:center;width:100%;display:block;margin-top:8px}
    .nav-drawer-panel .nav-login-btn:hover{background:var(--coral-deep,#D2491F)}
  `;

  async function logout() {
    await sb.auth.signOut();
    window.location.href = 'index.html';
  }

  function injectStyle() {
    if (document.getElementById('auth-nav-styles')) return;
    const styleEl = document.createElement('style');
    styleEl.id = 'auth-nav-styles';
    styleEl.textContent = STYLE;
    document.head.appendChild(styleEl);
  }

  function addLogoutButtons() {
    injectStyle();
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

  function addLoginButtons() {
    // Not shown on the login page itself.
    if (/(^|\/)login\.html$/i.test(window.location.pathname)) return;
    injectStyle();
    document.querySelectorAll('.nav-links, .nav-drawer-panel').forEach(container => {
      // Skip if a login link already exists (e.g. signup.html's own nav item).
      if (container.querySelector('a[href="login.html"], .nav-login-btn')) return;
      const link = document.createElement('a');
      link.className = 'nav-login-btn';
      link.href = 'login.html';
      link.textContent = 'Log in';
      container.appendChild(link);
    });
  }

  async function init() {
    if (typeof sb === 'undefined') return;
    const { data: { session } } = await sb.auth.getSession();
    if (session) addLogoutButtons();
    else addLoginButtons();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
