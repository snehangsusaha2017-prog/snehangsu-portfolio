document.addEventListener('DOMContentLoaded', () => {

  // ── THEME ───────────────────────────────────────────────────
  const toggleBtns = document.querySelectorAll('.theme-toggle-btn');
  const stored = localStorage.getItem('sn-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = stored || (prefersDark ? 'dark' : 'light');
  applyTheme(theme);

  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      localStorage.setItem('sn-theme', next);
    });
  });

  function applyTheme(t) {
    document.documentElement.setAttribute('data-theme', t);
    toggleBtns.forEach(btn => {
      const icon = btn.querySelector('i');
      if (icon) icon.className = t === 'dark' ? 'fa-regular fa-sun' : 'fa-regular fa-moon';
    });
  }

  // ── HOMEPAGE ACTIVITY REVEAL ─────────────────────────────────
  const isHome = document.body.classList.contains('homepage');
  if (isHome) {
    const events = ['mousemove', 'click', 'scroll', 'keydown', 'touchstart'];
    const activate = () => {
      document.body.classList.add('active-state');
      events.forEach(e => window.removeEventListener(e, activate));
    };
    events.forEach(e => window.addEventListener(e, activate));
  }

  // ── MOBILE MENU ──────────────────────────────────────────────
  const mobileMenuBtn  = document.getElementById('mobileMenuBtn');
  const mobileCloseBtn = document.getElementById('mobileCloseBtn');
  const mobileDrawer   = document.getElementById('mobileNavDrawer');

  if (mobileMenuBtn && mobileDrawer) {
    mobileMenuBtn.addEventListener('click', () => mobileDrawer.classList.add('open'));
    mobileCloseBtn.addEventListener('click', () => mobileDrawer.classList.remove('open'));
  }

  // ── SCROLLSPY (sidebar nav for subpages) ─────────────────────
  const sections  = document.querySelectorAll('.module-section');
  const sideItems = document.querySelectorAll('.sidebar-item');

  if (sections.length && sideItems.length) {
    const spy = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          sideItems.forEach(item => {
            const a = item.querySelector('a');
            if (a && a.getAttribute('href') === `#${id}`) {
              item.classList.add('active');
            } else {
              item.classList.remove('active');
            }
          });
        }
      });
    }, { rootMargin: '-20% 0px -60% 0px', threshold: 0 });

    sections.forEach(s => spy.observe(s));
  }

  // ── FLOATING TOC BUTTON (mobile) ─────────────────────────────
  const floatBtn  = document.querySelector('.floating-toc-btn');
  const sidebarEl = document.querySelector('.sidebar-nav');

  if (floatBtn && sidebarEl) {
    floatBtn.addEventListener('click', e => {
      e.stopPropagation();
      sidebarEl.classList.toggle('open');
      const icon = floatBtn.querySelector('i');
      if (icon) icon.className = sidebarEl.classList.contains('open') ? 'fa-solid fa-xmark' : 'fa-solid fa-list-ul';
    });

    // Close when clicking a link
    sidebarEl.querySelectorAll('.sidebar-item a').forEach(link => {
      link.addEventListener('click', () => {
        sidebarEl.classList.remove('open');
        const icon = floatBtn.querySelector('i');
        if (icon) icon.className = 'fa-solid fa-list-ul';
      });
    });

    // Close when clicking outside
    document.addEventListener('click', e => {
      if (sidebarEl.classList.contains('open') && !sidebarEl.contains(e.target) && e.target !== floatBtn) {
        sidebarEl.classList.remove('open');
        const icon = floatBtn.querySelector('i');
        if (icon) icon.className = 'fa-solid fa-list-ul';
      }
    });
  }

  // ── CONTACT MODAL ────────────────────────────────────────────
  const triggers   = document.querySelectorAll('.contact-me-trigger');
  const modal      = document.getElementById('contactModal');
  const closeModal = document.querySelector('.modal-close-btn');

  if (modal) {
    triggers.forEach(t => t.addEventListener('click', e => { e.preventDefault(); modal.classList.add('open'); }));
    closeModal?.addEventListener('click', () => modal.classList.remove('open'));
    modal.addEventListener('click', e => { if (e.target === modal) modal.classList.remove('open'); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') modal.classList.remove('open'); });
  }

});
