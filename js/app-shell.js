/* ===== APP SHELL: left navigation rail =====
   Shared by dashboard.html, my-progress.html and my-profile.html so the three
   pages keep one nav. A page opts in by giving its <main> this structure:

     <div class="wrap app-shell">
       <aside class="app-rail" id="app-rail" data-active="progress"></aside>
       <div class="app-shell-content"> …page content… </div>
     </div>

   and loading this file after js/supabase-client.js. The rail markup, styling
   (including the edge-to-edge topbar/content width) and the Bookmarked / Notes
   counts are all owned here. data-active is one of: dashboard | progress
   (anything else — e.g. the profile page — leaves no item highlighted).

   AppShell.refreshCounts() re-pulls the badge counts (call it after something
   that changes them, e.g. a progress reset). */
(function (global) {
  const ITEMS = [
    { key: 'dashboard', label: 'Dashboard', href: 'dashboard.html',
      icon: '<path d="M3 11.5 12 4l9 7.5"/><path d="M5 10v10h14V10"/>' },
    { key: 'progress', label: 'My Progress', href: 'my-progress.html',
      icon: '<line x1="6" y1="20" x2="6" y2="13"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="18" y1="20" x2="18" y2="9"/>' },
    { key: 'bookmarks', label: 'Bookmarked', href: 'practice.html?mode=bookmarks',
      icon: '<path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>', count: 'bm' },
    { key: 'notes', label: 'Review my Notes', href: 'practice.html?mode=notes',
      icon: '<path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/>', count: 'notes' }
  ];

  function injectStyles() {
    if (document.getElementById('app-shell-styles')) return;
    const s = document.createElement('style');
    s.id = 'app-shell-styles';
    s.textContent = `
    .app-topbar-in{max-width:1440px;margin:0;padding:14px clamp(20px,3.5vw,48px)}
    .app-shell{max-width:1440px;margin:0;padding:0 clamp(20px,3.5vw,48px);display:grid;grid-template-columns:204px minmax(0,1fr);gap:40px;align-items:start}
    .app-shell-content{min-width:0}
    .app-rail .side-nav{position:sticky;top:88px;display:flex;flex-direction:column;gap:3px}
    .side-nav-label{font-family:var(--mono);font-size:10px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;color:var(--stone-light);padding:0 14px 8px}
    .side-nav a{display:flex;align-items:center;gap:11px;padding:10px 14px;border-radius:12px;font-size:14px;font-weight:600;color:var(--stone);transition:color .16s,background .16s}
    .side-nav a svg{width:18px;height:18px;stroke:currentColor;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;flex-shrink:0}
    .side-nav a:hover{background:var(--surface-warm);color:var(--ink)}
    .side-nav a:focus-visible{outline:2px solid var(--coral);outline-offset:2px}
    .side-nav a.active{background:rgba(36,27,22,.06);color:var(--ink)}
    .side-nav a .nav-count{margin-left:auto;font-family:var(--mono);font-size:10.5px;font-weight:700;color:var(--coral-deep);background:var(--coral-faint);border:1px solid rgba(240,98,60,.22);border-radius:999px;padding:1px 7px;min-width:21px;text-align:center}
    .side-nav a .nav-count:empty{display:none}
    @media(max-width:900px){
      .app-shell{grid-template-columns:1fr;gap:22px}
      .app-rail{order:-1}
      .app-rail .side-nav{position:static;flex-direction:row;flex-wrap:wrap;gap:8px}
      .side-nav-label{display:none}
      .side-nav a{flex:0 0 auto;border:1px solid var(--border);padding:9px 14px}
      .side-nav a.active{border-color:var(--border-strong)}
    }`;
    document.head.appendChild(s);
  }

  function renderRail(mount, active) {
    mount.innerHTML =
      '<nav class="side-nav" aria-label="Sections"><span class="side-nav-label">Menu</span>' +
      ITEMS.map(it => {
        const on = it.key === active ? ' class="active" aria-current="page"' : '';
        const badge = it.count ? `<span class="nav-count" data-count="${it.count}"></span>` : '';
        return `<a href="${it.href}"${on}><svg viewBox="0 0 24 24" aria-hidden="true">${it.icon}</svg>${it.label}${badge}</a>`;
      }).join('') +
      '</nav>';
  }

  function setCount(which, n) {
    const el = document.querySelector(`.nav-count[data-count="${which}"]`);
    if (el) el.textContent = n ? String(n) : '';
  }

  async function refreshCounts() {
    if (typeof sb === 'undefined') return;
    let uid = null;
    try {
      const { data } = await sb.auth.getUser();
      uid = data && data.user && data.user.id;
    } catch (_) {}
    if (!uid) return;
    const [bmRes, notesRes] = await Promise.all([
      sb.from('bookmarks').select('*', { count: 'exact', head: true }).eq('user_id', uid),
      sb.from('question_notes').select('*', { count: 'exact', head: true }).eq('user_id', uid).neq('note', '')
    ]);
    if (!bmRes.error) setCount('bm', bmRes.count);
    if (!notesRes.error) setCount('notes', notesRes.count);
  }

  function boot() {
    const mount = document.getElementById('app-rail');
    if (!mount) return;
    injectStyles();
    renderRail(mount, mount.getAttribute('data-active'));
    refreshCounts();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();

  global.AppShell = { refreshCounts };
})(window);
