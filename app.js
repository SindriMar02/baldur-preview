/* ==========================================================================
   BALDUR KRISTJÁNS — the widening frame. No framework, no scroll library.
   ONE rAF loop: every rect is READ first, then every custom property is
   WRITTEN, so the loop never sits on the layout-thrash path (ledger #51).
   ========================================================================== */
(() => {
  'use strict';

  const doc = document;
  const $ = (s, r = doc) => r.querySelector(s);
  const $$ = (s, r = doc) => Array.from(r.querySelectorAll(s));
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const clamp = (v, a = 0, b = 1) => (v < a ? a : v > b ? b : v);

  /* ---------------------------------------------------- 0. the reveal
     THE ELADIODIESTE DEVICE (memory: eladiodieste-opening-reveal). Gate the
     3s CSS timeline on a real image DECODE, never a bare timer — the source
     site's own "preloader" is `img.decode()`, not a spinner or a fake percent.
     Unlock scroll 0.8s before the timeline visually ends (the reference's own
     ratio) so the last beat plays under the visitor's first scroll instead of
     a dead pause, and always finish on a hard failsafe regardless of decode. */
  const load = $('#load');
  const loadImg = $('#loadImg');
  const loadIn = $('.bk-load-in');
  // measure the REAL landing text block and pin the overlay's copy to its
  // exact top, so the handoff crossfade overlaps two pixel-identical blocks
  // instead of two copies offset by however far the two layout schemes drift
  const alignLoadToLanding = () => {
    const landIn = $('.bk-land-in');
    if (!loadIn || !landIn) return;
    loadIn.style.setProperty('--load-y', landIn.getBoundingClientRect().top + 'px');
  };
  alignLoadToLanding();
  if (doc.fonts && doc.fonts.ready) doc.fonts.ready.then(alignLoadToLanding);
  addEventListener('resize', alignLoadToLanding);
  const DUR = 3000, FADE = 550;
  let doneCalled = false;
  // bk-load-done means "safe to interact": it fires once the overlay is
  // FULLY GONE, not on the reference's own -0.8s early-release ratio. That
  // trick only works there because the reference's hero stays PINNED through
  // the tail, so releasing scroll early lets the visitor's first scroll drive
  // the ALREADY-VISIBLE pinned section rather than move away from it. This
  // page has no pinned hero, so an early release just lets a scrolled-away
  // page show up underneath a still-fading position:fixed ghost layer.
  const unlockScroll = () => {
    doc.body.classList.remove('bk-loading');
    doc.body.classList.add('bk-load-done');
  };
  const finish = () => {
    if (!load || doneCalled) return;
    doneCalled = true;
    load.classList.add('is-out');
    setTimeout(() => { load.remove(); unlockScroll(); }, FADE);
  };
  const armAndRun = () => {
    load.classList.add('is-armed');           // the 3s timeline starts
    setTimeout(finish, DUR);
  };
  if (!load) {
    doc.body.classList.remove('bk-loading');
    doc.body.classList.add('bk-load-done');
  } else if (reduced.matches) {
    load.remove();
    doc.body.classList.remove('bk-loading');
    doc.body.classList.add('bk-load-done');
  } else {
    const decoded = loadImg && loadImg.decode ? loadImg.decode().catch(() => {}) : Promise.resolve();
    const floor = new Promise((res) => setTimeout(res, 120));   // never arm on the same frame as paint
    Promise.race([Promise.all([decoded, floor]), new Promise((res) => setTimeout(res, 1400))]).then(armAndRun);
    setTimeout(() => { unlockScroll(); finish(); }, 5200);      // absolute failsafe (also sets bk-load-done)
  }

  /* ---------------------------------------------------- 0b. the rotation
     Six of his frames, cross-fading full bleed, with the register naming what
     is on screen. Only the LIVE frame animates, and the whole thing stops when
     the tab is hidden so it never burns cycles nobody sees. */
  const rot = $('#rot');
  if (rot && !reduced.matches) {
    const figs = $$('.bk-rot-f', rot);
    const regs = $$('.bk-reg-i');
    const ticks = $$('.bk-rot-tk');
    const HOLD = 5600;
    let cur = 0, timer = 0;
    const show = (n) => {
      const prev = cur;
      cur = (n + figs.length) % figs.length;
      if (cur === prev) return;
      [figs, regs, ticks].forEach((set) => {
        set[prev]?.classList.remove('is-on');
        set[cur]?.classList.add('is-on');
      });
      // restart the drift and the tick cleanly on the new frame
      const img = figs[cur].querySelector('img');
      if (img) { img.style.animation = 'none'; void img.offsetWidth; img.style.animation = ''; }
      const bar = ticks[cur]?.querySelector('span');
      if (bar) { bar.style.animation = 'none'; void bar.offsetWidth; bar.style.animation = ''; }
      // the next frame is fetched while this one is on screen
      figs[(cur + 1) % figs.length]?.querySelector('img')?.setAttribute('loading', 'eager');
    };
    const tick = () => { show(cur + 1); timer = setTimeout(tick, HOLD); };
    const start = () => { clearTimeout(timer); timer = setTimeout(tick, HOLD); };
    const stop = () => clearTimeout(timer);
    start();
    doc.addEventListener('visibilitychange', () => (doc.hidden ? stop() : start()));
    // the rotation is decoration, so it pauses whenever it is off screen
    if ('IntersectionObserver' in window) {
      new IntersectionObserver((es) => es.forEach((e) => (e.isIntersecting ? start() : stop())),
        { threshold: 0.05 }).observe(rot);
    }
  }

  /* ---------------------------------------------------- 1. word reveals */
  const revs = $$('.bk-rev');
  if (reduced.matches) {
    revs.forEach((r) => r.classList.add('is-in'));
  } else if (revs.length) {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } }),
      { rootMargin: '0px 0px -10% 0px', threshold: 0.2 }
    );
    revs.forEach((r) => io.observe(r));
  }

  /* ---------------------------------------------------- 2. mobile menu */
  const burger = $('#burger');
  const menu = $('#menu');
  if (burger && menu) {
    let open = false;
    const set = (v) => {
      open = v;
      burger.setAttribute('aria-expanded', String(v));
      if (v) {
        menu.hidden = false;
        requestAnimationFrame(() => menu.classList.add('is-open'));
        doc.body.style.overflow = 'hidden';
      } else {
        menu.classList.remove('is-open');
        doc.body.style.overflow = '';
        setTimeout(() => { if (!open) menu.hidden = true; }, 420);
      }
    };
    burger.addEventListener('click', () => set(!open));
    menu.addEventListener('click', (e) => {
      const a = e.target.closest('a');
      if (!a) return;
      set(false);
      if (a.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const t = $(a.getAttribute('href'));
        requestAnimationFrame(() => t?.scrollIntoView({ behavior: reduced.matches ? 'auto' : 'smooth' }));
      }
    });
    addEventListener('keydown', (e) => { if (e.key === 'Escape' && open) { set(false); burger.focus(); } });
  }

  if (reduced.matches) return;

  /* ---------------------------------------------------- 3. the scroll loop
     THE SIGNATURE. Each frame's --fp runs 0 to 1 across its own entrance:
     the window widens from a portrait slot centred ON THE SUBJECT to the full
     photograph, while the image pulls back from 1.55x to 1x. Every value is
     derived from position, so scrolling back UNDOES it, which is the only
     proof a reveal is scrubbed rather than a one-shot. */
  const frames = $$('.bk-fr');
  const hdr = $('#hdr');
  const navA = $$('.bk-hdr-nav a');
  const secs = navA.map((a) => $(a.getAttribute('href'))).filter(Boolean);

  // the tight window, as a fraction of the frame's width
  const TIGHT = 0.46;

  let raf = 0;
  const frame = () => {
    raf = 0;
    const vh = innerHeight;
    const y = scrollY;

    /* ---- READ PASS ---- */
    const frRects = frames.map((f) => f.getBoundingClientRect());
    const secRects = secs.map((el) => el.getBoundingClientRect());

    /* ---- WRITE PASS ---- */
    frames.forEach((f, i) => {
      const r = frRects[i];
      // opens as the frame rises through the lower two thirds of the viewport
      const fp = clamp((vh * 0.92 - r.top) / (vh * 0.66));
      f.style.setProperty('--fp', fp.toFixed(4));

      // the tight window is centred on the SUBJECT, not on the frame, so the
      // crop lands on the person wherever they stand in the photograph
      const fx = (Number(f.dataset.fx) || 50) / 100;
      const w = TIGHT + (1 - TIGHT) * fp;
      const left = clamp(fx - w / 2, 0, 1 - w);
      f.style.setProperty('--cl', (left * 100).toFixed(2) + '%');
      f.style.setProperty('--cr', ((1 - left - w) * 100).toFixed(2) + '%');
      f.style.setProperty('--fx', String(Number(f.dataset.fx) || 50));
      f.style.setProperty('--fy', String(Number(f.dataset.fy) || 50));
    });

    if (hdr) hdr.classList.toggle('is-stuck', y > 8);

    if (secRects.length) {
      let on = -1;
      secRects.forEach((r, i) => { if (r.top <= vh * 0.35) on = i; });
      navA.forEach((a, i) => a.classList.toggle('is-on', i === on));
    }
  };
  const wake = () => { if (!raf) raf = requestAnimationFrame(frame); };

  addEventListener('scroll', wake, { passive: true });
  addEventListener('resize', wake);
  // a hidden pane pauses rAF; re-sync when it returns (craft ledger #93)
  addEventListener('visibilitychange', wake);
  frame();
  addEventListener('load', frame, { once: true });
})();
