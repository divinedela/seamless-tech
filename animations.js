(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  /* ── HERO: add keyframe classes to first-viewport elements ── */
  const HERO_MAP = [
    ['.hero-eyebrow',                            'ha-1'],
    ['.hero-title, .hero-h1',                    'ha-2'],
    ['.hero-sub',                                'ha-3'],
    ['.hero-actions, .hero-search',              'ha-4'],
    ['.hero-trust, .hero-stats, .hero-badges',   'ha-5'],
  ];
  HERO_MAP.forEach(([sel, cls]) =>
    document.querySelectorAll(sel).forEach(el => {
      el.classList.add(cls);
      el.dataset.animated = '1'; // exclude from scroll reveal
    })
  );

  /* ── SCROLL REVEAL ── */
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add('in');
      io.unobserve(e.target);
    });
  }, { rootMargin: '0px 0px -48px 0px', threshold: 0.08 });

  function observe(el, delay) {
    if (el.dataset.animated) return;
    el.dataset.animated = '1';
    el.classList.add('reveal');
    if (delay) el.style.transitionDelay = delay + 'ms';
    // Clean up after transition so hover transforms aren't blocked
    el.addEventListener('transitionend', function handler(e) {
      if (e.propertyName !== 'opacity') return;
      el.removeEventListener('transitionend', handler);
      el.classList.remove('reveal', 'in');
      el.style.removeProperty('transition-delay');
    });
    io.observe(el);
  }

  /* Stagger siblings of the same selector within their shared parent */
  function stagger(sel, baseDelay) {
    document.querySelectorAll(sel).forEach(el => {
      const siblings = Array.from(el.parentElement.querySelectorAll(':scope > ' + sel));
      const idx = siblings.indexOf(el);
      observe(el, idx * baseDelay);
    });
  }

  /* Cascade section headings slightly */
  document.querySelectorAll('.eyebrow').forEach(el => observe(el, 0));
  document.querySelectorAll('.section-title').forEach(el => observe(el, 60));
  document.querySelectorAll('.section-sub').forEach(el => observe(el, 100));

  /* Card grids — stagger siblings */
  stagger('.svc-card',     80);
  stagger('.why-card',     70);
  stagger('.testi-card',   90);
  stagger('.value-card',   75);
  stagger('.team-card',    80);
  stagger('.milestone',    90);
  stagger('.stat-item',    80);
  stagger('.contact-card', 80);
  stagger('.faq-item',     60);
  stagger('.proc-step',    80);
  stagger('.dash-stat',    70);
  stagger('.quick-action', 60);
  stagger('.cert-card',    80);
  stagger('.ft-col',       80);
  stagger('.svc-detail',   0);

  /* Single-instance blocks */
  ['.cta-inner', '.page-header-inner', '.brand-panel',
   '.auth-panel', '.checkout-summary', '.checkout-form-wrap'].forEach(sel =>
    document.querySelectorAll(sel).forEach(el => observe(el, 0))
  );

  /* Dynamic grids (JS-rendered children) — watch container */
  function animateGrid(grid) {
    Array.from(grid.children).forEach((child, i) => {
      if (child.dataset.animated) return;
      child.dataset.animated = '1';
      child.classList.add('reveal');
      child.style.transitionDelay = (i * 70) + 'ms';
      child.addEventListener('transitionend', function handler(e) {
        if (e.propertyName !== 'opacity') return;
        child.removeEventListener('transitionend', handler);
        child.classList.remove('reveal', 'in');
        child.style.removeProperty('transition-delay');
      });
      io.observe(child);
    });
  }

  ['.products-grid', '.courses-grid'].forEach(sel => {
    document.querySelectorAll(sel).forEach(grid => {
      if (grid.children.length) {
        animateGrid(grid);
      } else {
        const mo = new MutationObserver(() => {
          if (grid.children.length) { mo.disconnect(); animateGrid(grid); }
        });
        mo.observe(grid, { childList: true });
      }
    });
  });
}());
