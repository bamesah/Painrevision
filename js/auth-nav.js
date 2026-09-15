// Injects an account control into the site nav (desktop + mobile drawer) on
// any page that includes this script: a "Log in" button when the visitor is
// signed out, or an orange "Account" dropdown (Dashboard / My profile / My
// progress / Log out) when they're signed in. Also redirects any "Question
// bank" links to the dashboard for signed-in visitors, since they already
// have access. Self-contained (ships its own styles) so pages don't need
// extra CSS just for this. Requires js/supabase-client.js loaded first.
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
    .nav-account{position:relative;display:inline-flex;align-items:center;margin-left:6px}
    .nav-account-btn{font-family:var(--san,inherit);font-size:13.5px;font-weight:700;color:#fff;background:var(--coral,#F0623C);padding:8px 16px;border-radius:999px;border:none;cursor:pointer;display:inline-flex;align-items:center;gap:6px;white-space:nowrap;transition:background .18s,transform .18s,box-shadow .18s;-webkit-tap-highlight-color:transparent}
    .nav-account-btn:hover{background:var(--coral-deep,#D2491F);transform:translateY(-1px);box-shadow:0 6px 16px -6px rgba(240,98,60,.5)}
    .nav-account-btn:focus-visible{outline:2px solid var(--coral-deep,#D2491F);outline-offset:2px}
    .nav-account-chevron{width:11px;height:11px;stroke:currentColor;fill:none;stroke-width:2.5;stroke-linecap:round;stroke-linejoin:round;transition:transform .22s cubic-bezier(.2,.7,.2,1)}
    .nav-account.open .nav-account-chevron{transform:rotate(180deg)}
    .nav-account-menu{position:absolute;top:100%;right:0;padding-top:8px;opacity:0;pointer-events:none;transition:opacity .2s;z-index:200}
    .nav-account.open .nav-account-menu{opacity:1;pointer-events:all}
    @media (hover:hover) and (pointer:fine){
      .nav-account:hover .nav-account-menu{opacity:1;pointer-events:all}
    }
    .nav-account-menu-inner{min-width:190px;background:var(--cream,#FBF5EE);border:1px solid var(--border,#EDE3D7);border-radius:14px;padding:6px;box-shadow:0 1px 2px rgba(36,27,22,.04),0 18px 40px -22px rgba(36,27,22,.22);transform:translateY(-6px);transition:transform .22s cubic-bezier(.2,.7,.2,1)}
    .nav-account.open .nav-account-menu-inner{transform:translateY(0)}
    @media (hover:hover) and (pointer:fine){
      .nav-account:hover .nav-account-menu-inner{transform:translateY(0)}
    }
    .nav-account-menu a,.nav-account-menu button{display:flex;align-items:center;width:100%;gap:10px;padding:10px 14px;border-radius:10px;font-size:14px;font-weight:500;color:var(--stone,#7C7068);background:none;border:none;cursor:pointer;text-align:left;font-family:var(--san,inherit);transition:background .15s,color .15s;white-space:nowrap}
    .nav-account-menu a:hover,.nav-account-menu button:hover{background:var(--surface-warm,#FFFAF4);color:var(--ink,#241B16)}
    .nav-account-divider{height:1px;background:var(--border,#EDE3D7);margin:6px 4px}
    .nav-drawer-panel .nav-account-drawer-link{font-size:15px;font-weight:600;color:var(--ink,#241B16);padding:9px 12px;border-radius:10px;display:block}
    .nav-drawer-panel .nav-account-drawer-link:hover{background:rgba(36,27,22,.06)}
  `;

  const ACCOUNT_LINKS = [
    { href: 'dashboard.html', label: 'Dashboard' },
    { href: 'my-profile.html', label: 'My profile' },
    { href: 'my-progress.html', label: 'My progress' },
  ];

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

  function closeAllMenus(except) {
    document.querySelectorAll('.nav-account.open').forEach(wrap => {
      if (wrap === except) return;
      wrap.classList.remove('open');
      const btn = wrap.querySelector('.nav-account-btn');
      if (btn) btn.setAttribute('aria-expanded', 'false');
    });
  }

  function addAccountMenu() {
    injectStyle();

    document.querySelectorAll('.nav-links').forEach(container => {
      if (container.querySelector('.nav-account')) return;
      const wrap = document.createElement('div');
      wrap.className = 'nav-account';
      wrap.innerHTML = `
        <button type="button" class="nav-account-btn" aria-haspopup="true" aria-expanded="false">
          Account
          <svg class="nav-account-chevron" viewBox="0 0 24 24" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="nav-account-menu">
          <div class="nav-account-menu-inner" role="menu">
            ${ACCOUNT_LINKS.map(l => `<a href="${l.href}" role="menuitem">${l.label}</a>`).join('')}
            <div class="nav-account-divider"></div>
            <button type="button" class="nav-account-logout" role="menuitem">Log out</button>
          </div>
        </div>
      `;
      container.appendChild(wrap);

      const btn = wrap.querySelector('.nav-account-btn');
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const willOpen = !wrap.classList.contains('open');
        closeAllMenus();
        wrap.classList.toggle('open', willOpen);
        btn.setAttribute('aria-expanded', String(willOpen));
      });
      wrap.querySelector('.nav-account-logout').addEventListener('click', logout);
    });

    document.querySelectorAll('.nav-drawer-panel').forEach(container => {
      if (container.querySelector('.nav-account-drawer-link')) return;
      ACCOUNT_LINKS.forEach(l => {
        const a = document.createElement('a');
        a.className = 'nav-account-drawer-link';
        a.href = l.href;
        a.textContent = l.label;
        container.appendChild(a);
      });
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'nav-logout-btn';
      btn.textContent = 'Log out';
      btn.addEventListener('click', logout);
      container.appendChild(btn);
    });

    document.addEventListener('click', () => closeAllMenus());
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeAllMenus();
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

  function redirectQuestionBankLinks() {
    // Signed-in visitors already have full access — send them straight to
    // the dashboard instead of the question-bank sales/preview page.
    document.querySelectorAll('a[href="question-bank.html"]').forEach(a => {
      a.href = 'dashboard.html';
    });
  }

  async function init() {
    if (typeof sb === 'undefined') return;
    const { data: { session } } = await sb.auth.getSession();
    if (session) {
      addAccountMenu();
      redirectQuestionBankLinks();
    } else {
      addLoginButtons();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
