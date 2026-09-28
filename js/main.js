/* =========================================================
   BAOOL — interacciones y animaciones (GSAP + ScrollTrigger + SplitText + Lenis)
   ========================================================= */
(() => {
  gsap.registerPlugin(ScrollTrigger, SplitText);

  const D = window.BAOOL;
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;

  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  window.scrollTo(0, 0);

  /* ---------------------------------------------------------
     Contenido dinámico
     --------------------------------------------------------- */
  function buildBurgers() {
    const track = $('[data-hs-track]');
    track.innerHTML = D.featured.map((b, i) => `
      <article class="bcard">
        <div class="bcard__media">
          <span class="bcard__num">N.º ${String(i + 1).padStart(2, '0')}</span>
          <span class="bcard__tag">${b.tag}</span>
          <img src="assets/img/${b.img}.webp" alt="Hamburguesa ${b.name}">
        </div>
        <div class="bcard__body">
          <h3 class="bcard__name">${b.name}</h3>
          <p class="bcard__desc">${b.desc}</p>
          <span class="bcard__price">${b.price} €</span>
        </div>
      </article>`).join('') + `
      <a href="#carta" class="bcard bcard--cta">
        <span class="mono">+16 burgers · 2 locales</span>
        <h3 class="bcard__name">Ver toda la carta</h3>
        <span class="arrow">→</span>
      </a>`;
  }

  function buildReviews() {
    const card = ([name, text]) => `
      <figure class="rcard">
        <span class="rcard__stars" aria-label="5 estrellas">★★★★★</span>
        <p>“${text}”</p>
        <cite>${name} · Google</cite>
      </figure>`;
    const rows = $$('[data-marquee]');
    const a = D.reviews.map(card).join('');
    const b = [...D.reviews].reverse().map(card).join('');
    rows[0].innerHTML = a + a;
    rows[1].innerHTML = b + b;
    rows.forEach(r => $$('.rcard', r).slice(D.reviews.length).forEach(el => el.setAttribute('aria-hidden', 'true')));
  }

  function buildBulbs() {
    const path = $('.fairy__wire');
    const g = $('.fairy__bulbs');
    const len = path.getTotalLength();
    const n = 34;
    // halo con degradado radial en vez de filtros: mucho más barato de repintar
    let html = `<defs><radialGradient id="bulb-glow">
      <stop offset="0" stop-color="#ffc98a" stop-opacity=".85"/>
      <stop offset=".35" stop-color="#ffa050" stop-opacity=".35"/>
      <stop offset="1" stop-color="#ff8a3c" stop-opacity="0"/>
    </radialGradient></defs>`;
    for (let i = 0; i < n; i++) {
      const p = path.getPointAtLength((len / (n - 1)) * i);
      const x = p.x.toFixed(1), y = (p.y + 6).toFixed(1);
      html += `<g class="bulb"><circle class="bulb__halo" cx="${x}" cy="${y}" r="22" fill="url(#bulb-glow)"/><circle class="bulb__core" cx="${x}" cy="${y}" r="6"/></g>`;
    }
    g.innerHTML = html;
  }

  buildBurgers();
  buildReviews();
  buildBulbs();

  /* ---------------------------------------------------------
     Abierto / cerrado (hora de Madrid)
     --------------------------------------------------------- */
  const fmt = m => `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;
  const slotsFor = d => (d >= 1 && d <= 3) ? [[1200, 1410]] : [[780, 960], [1200, 1410]];

  function updateStatus() {
    const parts = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Europe/Madrid', weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false
    }).formatToParts(new Date());
    const get = t => parts.find(p => p.type === t).value;
    const wd = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }[get('weekday')];
    const now = (+get('hour') % 24) * 60 + +get('minute');
    const today = slotsFor(wd);
    const open = today.find(([a, b]) => now >= a && now < b);
    const next = today.find(([a]) => now < a);

    let long, short;
    if (open) {
      long = `Abierto ahora · cerramos a las ${fmt(open[1])}`;
      short = 'Abierto ahora';
    } else if (next) {
      long = `Cerrado · abrimos hoy a las ${fmt(next[0])}`;
      short = `Abrimos a las ${fmt(next[0])}`;
    } else {
      const first = slotsFor((wd + 1) % 7)[0][0];
      long = `Cerrado · mañana desde las ${fmt(first)}`;
      short = 'Cerrado ahora';
    }

    $$('[data-status]').forEach(el => {
      el.classList.toggle('is-open', !!open);
      el.classList.toggle('is-closed', !open);
      el.querySelector('span').textContent = el.closest('.nav') ? short : long;
    });
    $$('[data-hours] li').forEach(li => li.classList.toggle('is-today', li.dataset.days.split(',').includes(String(wd))));
  }
  updateStatus();
  setInterval(updateStatus, 60000);
  $$('[data-year]').forEach(el => (el.textContent = new Date().getFullYear()));

  /* ---------------------------------------------------------
     Smooth scroll (Lenis)
     --------------------------------------------------------- */
  let lenis = null;
  if (!reduce) {
    lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1 });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(t => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
    lenis.stop();
  }

  const scrollToTarget = target => {
    if (lenis) lenis.scrollTo(target, { duration: 1.5 });
    else if (target === 0) window.scrollTo({ top: 0, behavior: 'smooth' });
    else target.scrollIntoView({ behavior: 'smooth' });
  };

  $$('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    const target = id === '#inicio' ? 0 : $(id);
    if (target === null) return;
    e.preventDefault();
    closeMenu();
    scrollToTarget(target);
  }));
  // las tarjetas CTA se generan antes, así que ya están cubiertas por el selector

  /* ---------------------------------------------------------
     Menú móvil
     --------------------------------------------------------- */
  const menuBtn = $('[data-menu-toggle]');
  const mobileMenu = $('[data-mobile-menu]');
  let menuOpen = false;

  function openMenu() {
    menuOpen = true;
    menuBtn.setAttribute('aria-expanded', 'true');
    mobileMenu.setAttribute('aria-hidden', 'false');
    lenis && lenis.stop();
    gsap.timeline()
      .set(mobileMenu, { visibility: 'visible' })
      .to(mobileMenu, { clipPath: 'inset(0% 0% 0% 0%)', duration: .8, ease: 'expo.inOut' })
      .from($$('nav a', mobileMenu), { yPercent: 100, opacity: 0, stagger: .06, duration: .7, ease: 'expo.out' }, '-=.35');
  }
  function closeMenu() {
    if (!menuOpen) return;
    menuOpen = false;
    menuBtn.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');
    lenis && lenis.start();
    gsap.to(mobileMenu, {
      clipPath: 'inset(0% 0% 100% 0%)', duration: .7, ease: 'expo.inOut',
      onComplete: () => gsap.set(mobileMenu, { visibility: 'hidden' })
    });
  }
  menuBtn.addEventListener('click', () => (menuOpen ? closeMenu() : openMenu()));

  /* ---------------------------------------------------------
     Botones magnéticos
     --------------------------------------------------------- */
  if (finePointer && !reduce) {
    $$('[data-magnetic]').forEach(el => {
      const xTo = gsap.quickTo(el, 'x', { duration: .6, ease: 'power3' });
      const yTo = gsap.quickTo(el, 'y', { duration: .6, ease: 'power3' });
      el.addEventListener('pointermove', e => {
        const r = el.getBoundingClientRect();
        xTo((e.clientX - r.left - r.width / 2) * .3);
        yTo((e.clientY - r.top - r.height / 2) * .4);
      });
      el.addEventListener('pointerleave', () => {
        gsap.to(el, { x: 0, y: 0, duration: 1, ease: 'elastic.out(1, .35)' });
      });
    });
  }

  /* ---------------------------------------------------------
     INTRO — se encienden las luces
     --------------------------------------------------------- */
  const letters = $$('.sign span');
  const bulbs = $$('.fairy__bulbs .bulb');
  gsap.set(letters, { '--on': 0 });
  gsap.set(bulbs, { opacity: .12 });

  function twinkle() {
    bulbs.forEach(b => {
      gsap.to(b, {
        opacity: gsap.utils.random(.55, .85),
        duration: gsap.utils.random(.6, 1.6),
        repeat: -1, yoyo: true, ease: 'sine.inOut',
        delay: gsap.utils.random(0, 3)
      });
    });
  }

  function heroMouse() {
    if (!finePointer || reduce) return;
    const hero = $('.hero');
    const mx = gsap.quickTo(hero, '--mx', { duration: 1.2, ease: 'power3' });
    const my = gsap.quickTo(hero, '--my', { duration: 1.2, ease: 'power3' });
    hero.addEventListener('pointermove', e => {
      mx((e.clientX / innerWidth - .5) * 2);
      my((e.clientY / innerHeight - .5) * 2);
    });
  }

  function heroScroll() {
    gsap.timeline({
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
    })
      .to('.sign-wrap', { yPercent: 40, scale: .9, ease: 'none' }, 0)
      .to('.polaroid--l', { y: -260, rotate: -14, ease: 'none' }, 0)
      .to('.polaroid--r', { y: -420, rotate: 14, ease: 'none' }, 0)
      .to('.hero__wall', { yPercent: 8, ease: 'none' }, 0)
      .to('.hero__bottom', { opacity: 0, y: -50, ease: 'none' }, 0);
  }

  function navOnScroll() {
    ScrollTrigger.create({
      start: 'top -140',
      end: 'max',
      onUpdate(self) {
        if (menuOpen) return;
        gsap.to('.nav', { yPercent: self.direction === 1 ? -170 : 0, duration: .5, ease: 'power3.out', overwrite: 'auto' });
      },
      onLeaveBack: () => gsap.to('.nav', { yPercent: 0, duration: .5, overwrite: 'auto' })
    });
  }

  function intro() {
    const count = $('[data-count]');
    const counter = { v: 0 };
    const titleSplit = SplitText.create('[data-hero-title]', { type: 'lines', mask: 'lines', linesClass: 'sl' });

    gsap.set(titleSplit.lines, { yPercent: 115 });
    gsap.set('.hero__kicker .line-mask > span', { yPercent: 115 });
    gsap.set('.hero__cta', { opacity: 0, y: 20 });
    gsap.set('.polaroid', { opacity: 0 });

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.to(counter, {
      v: 100, duration: 2.3, ease: 'power2.inOut',
      onUpdate: () => (count.textContent = String(Math.round(counter.v)).padStart(2, '0'))
    }, 0);

    // cada letra se enciende con un pequeño parpadeo, como un cartel de verdad
    letters.forEach((l, i) => {
      const t = .35 + i * .3;
      tl.to(l, { '--on': 1, duration: .04, ease: 'none' }, t)
        .to(l, { '--on': .1, duration: .04, ease: 'none' }, t + .07)
        .to(l, { '--on': .9, duration: .04, ease: 'none' }, t + .13)
        .to(l, { '--on': .3, duration: .03, ease: 'none' }, t + .19)
        .to(l, { '--on': 1, duration: .3, ease: 'power2.out' }, t + .25);
    });

    tl.to(bulbs, { opacity: 1, duration: .15, stagger: { each: .02, from: 'random' } }, 1.7)
      .to('.hero__dark', { opacity: 0, duration: 1.2, ease: 'power2.inOut' }, 2.4)
      .to('.hero__warm', { opacity: 1, duration: 1.6 }, 2.4)
      .to('.loader', { opacity: 0, duration: .5 }, 2.4)
      .fromTo('.polaroid--l',
        { opacity: 0, xPercent: -60, yPercent: 50, rotate: -35 },
        { opacity: 1, xPercent: 0, yPercent: 0, rotate: 0, duration: 1.5, ease: 'expo.out' }, 2.7)
      .fromTo('.polaroid--r',
        { opacity: 0, xPercent: 60, yPercent: 50, rotate: 35 },
        { opacity: 1, xPercent: 0, yPercent: 0, rotate: 0, duration: 1.5, ease: 'expo.out' }, 2.8)
      .to('.hero__kicker .line-mask > span', { yPercent: 0, duration: 1.1, stagger: .1, ease: 'expo.out' }, 2.9)
      .to(titleSplit.lines, { yPercent: 0, duration: 1.2, stagger: .1, ease: 'expo.out' }, 2.95)
      .to('.hero__cta', { opacity: 1, y: 0, duration: 1 }, 3.1)
      .to('.nav', { y: 0, duration: 1.3, ease: 'expo.out' }, 3.0)
      .add(() => {
        document.body.classList.remove('is-loading');
        $('.loader').remove();
        lenis && lenis.start();
        twinkle();
        heroMouse();
        heroScroll();
        navOnScroll();
        ScrollTrigger.refresh();
      }, 3.2);
  }

  function skipIntro() {
    gsap.set(letters, { '--on': 1 });
    gsap.set(bulbs, { opacity: 1 });
    gsap.set('.hero__dark', { opacity: 0 });
    gsap.set('.hero__warm', { opacity: 1 });
    gsap.set('.nav', { y: 0 });
    $('.loader').remove();
    document.body.classList.remove('is-loading');
  }

  /* ---------------------------------------------------------
     Animaciones de scroll
     --------------------------------------------------------- */
  function scrollAnimations() {
    // Títulos por líneas
    $$('[data-split]').forEach(el => {
      SplitText.create(el, {
        type: 'lines', mask: 'lines', linesClass: 'sl', autoSplit: true,
        onSplit: self => gsap.from(self.lines, {
          yPercent: 115, duration: 1.2, stagger: .09, ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true }
        })
      });
    });

    // Reseñas en bucle, aceleran con el scroll
    const marquees = $$('[data-marquee]').map(el => {
      const dir = +el.dataset.marquee;
      const tw = gsap.fromTo(el, { xPercent: dir > 0 ? 0 : -50 }, { xPercent: dir > 0 ? -50 : 0, duration: 70, ease: 'none', repeat: -1 });
      tw.totalTime(tw.duration() * 500);
      return tw;
    });
    const loops = marquees;
    let lastDir = 1;
    ScrollTrigger.create({
      start: 0, end: 'max',
      onUpdate(self) {
        lastDir = self.direction;
        const boost = Math.min(Math.abs(self.getVelocity()) / 400, 4);
        loops.forEach(tw => {
          gsap.to(tw, { timeScale: lastDir * (1 + boost), duration: .2, overwrite: true });
          gsap.to(tw, { timeScale: lastDir, duration: 1.2, delay: .25 });
        });
      }
    });

    // Historia: texto que se "enciende" palabra a palabra
    const big = $('[data-scrub-text]');
    const words = SplitText.create(big, { type: 'words' }).words;
    gsap.fromTo(words, { opacity: .13 }, {
      opacity: 1, stagger: .1, ease: 'none',
      scrollTrigger: { trigger: big, start: 'top 78%', end: 'bottom 45%', scrub: true }
    });
    gsap.from('.pill', {
      scale: 0, duration: 1, ease: 'back.out(2)', stagger: .2,
      scrollTrigger: { trigger: big, start: 'top 70%', once: true }
    });

    // Reveals genéricos
    $$('[data-reveal]').forEach(el => {
      gsap.from(el, {
        y: 60, opacity: 0, duration: 1.2, ease: 'expo.out',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true }
      });
    });
    $$('[data-reveal-img]').forEach(el => {
      const img = $('img', el);
      gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 85%', once: true } })
        .fromTo(el, { clipPath: 'inset(100% 0% 0% 0% round 28px)' }, { clipPath: 'inset(0% 0% 0% 0% round 28px)', duration: 1.4, ease: 'expo.inOut' })
        .from(img, { scale: 1.35, duration: 1.8, ease: 'expo.out' }, 0);
    });

    // Reveal pineado: la foto del local se abre a pantalla completa
    gsap.timeline({
      scrollTrigger: { trigger: '.reveal', start: 'top top', end: '+=150%', pin: true, scrub: 1 }
    })
      .fromTo('.reveal__media',
        { clipPath: 'inset(22% 30% 22% 30% round 32px)' },
        { clipPath: 'inset(0% 0% 0% 0% round 0px)', ease: 'none', duration: 1 }, 0)
      .fromTo('.reveal__media img', { scale: 1.35 }, { scale: 1, ease: 'none', duration: 1 }, 0)
      .from('.reveal__text span', { yPercent: 80, opacity: 0, stagger: .12, duration: .4, ease: 'power2.out' }, .45);

    // Burgers: scroll horizontal (solo escritorio)
    const mm = gsap.matchMedia();
    mm.add('(min-width: 861px)', () => {
      const track = $('[data-hs-track]');
      const dist = () => Math.max(0, track.scrollWidth - document.documentElement.clientWidth);
      const bar = $('[data-hs-progress]');
      const hs = gsap.to(track, {
        x: () => -dist(), ease: 'none',
        scrollTrigger: {
          trigger: '.burgers', start: 'top top', end: () => '+=' + dist(),
          pin: true, scrub: 1, invalidateOnRefresh: true,
          onUpdate: self => gsap.set(bar, { scaleX: self.progress })
        }
      });
      $$('.bcard__media img', track).forEach(img => {
        gsap.fromTo(img, { xPercent: -7 }, {
          xPercent: 7, ease: 'none',
          scrollTrigger: { trigger: img.closest('.bcard'), containerAnimation: hs, start: 'left right', end: 'right left', scrub: true }
        });
      });
      $$('.bcard', track).forEach(card => {
        gsap.from(card, {
          rotate: 4, yPercent: 8, ease: 'none',
          scrollTrigger: { trigger: card, containerAnimation: hs, start: 'left right', end: 'left 60%', scrub: true }
        });
      });
    });

    // TNT
    tntSection();

    // Mural
    gsap.fromTo('[data-parallax]', { yPercent: -7 }, {
      yPercent: 7, ease: 'none',
      scrollTrigger: { trigger: '.mural__wall', start: 'top bottom', end: 'bottom top', scrub: true }
    });
    gsap.fromTo('.mural__card', { y: 120, rotate: 6 }, {
      y: -40, rotate: -2, ease: 'none',
      scrollTrigger: { trigger: '.mural__media', start: 'top bottom', end: 'bottom top', scrub: true }
    });
    gsap.to('[data-spin]', { rotate: 360, duration: 18, repeat: -1, ease: 'none', transformOrigin: '50% 50%' });
    gsap.from('.mural__wall', {
      clipPath: 'inset(15% 15% 15% 15% round 60px)', duration: 1.6, ease: 'expo.out',
      scrollTrigger: { trigger: '.mural__wall', start: 'top 85%', once: true }
    });

    // Galería del local: columnas a distinta velocidad
    $$('.gallery__col').forEach(col => {
      const s = +col.dataset.speed;
      gsap.fromTo(col, { y: -s }, {
        y: s, ease: 'none',
        scrollTrigger: { trigger: '.gallery', start: 'top bottom', end: 'bottom top', scrub: true }
      });
    });
    $$('.gallery figure').forEach(fig => {
      gsap.from(fig, {
        clipPath: 'inset(100% 0% 0% 0% round 22px)', duration: 1.4, ease: 'expo.out',
        scrollTrigger: { trigger: fig, start: 'top 92%', once: true }
      });
    });

    // Reserva: el mantel se "estira"
    gsap.fromTo('[data-book]', { scale: .82, rotate: -4, y: 80 }, {
      scale: 1, rotate: 0, y: 0, ease: 'none',
      scrollTrigger: { trigger: '.book', start: 'top bottom', end: 'center center', scrub: true }
    });
    gsap.fromTo('.book', { backgroundPosition: '0px 0px' }, {
      backgroundPosition: '0px 256px', ease: 'none',
      scrollTrigger: { trigger: '.book', start: 'top bottom', end: 'bottom top', scrub: true }
    });

    // Footer: el cartel sube letra a letra
    gsap.from('[data-footer-word] span', {
      yPercent: 100, stagger: .06, ease: 'none',
      scrollTrigger: { trigger: '[data-footer-word]', start: 'top bottom', end: 'bottom bottom', scrub: 1 }
    });
  }

  /* ---------------------------------------------------------
     TNT — Peta Zetas que explotan
     --------------------------------------------------------- */
  function tntSection() {
    const sec = $('.tnt');
    const cv = $('[data-tnt-canvas]');
    const ctx = cv.getContext('2d');
    const word = $('[data-tnt-word]');
    const wordLetters = $$('span', word);
    const colors = ['#ff4d6d', '#ffd23f', '#3ec1ff', '#7cf29c', '#ff8fd8', '#f2a922', '#ffffff', '#b388ff'];
    let W = 0, H = 0, parts = [], running = false;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = sec.offsetWidth; H = sec.offsetHeight;
      cv.width = W * dpr; cv.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);
    ScrollTrigger.addEventListener('refresh', resize);

    const local = el => {
      const r = el.getBoundingClientRect(), s = sec.getBoundingClientRect();
      return { x: r.left - s.left + r.width / 2, y: r.top - s.top + r.height / 2 };
    };

    function burst(x, y, n = 70, power = 1) {
      for (let i = 0; i < n; i++) {
        const a = Math.random() * Math.PI * 2;
        const sp = (1.5 + Math.random() * 8) * power;
        parts.push({
          x, y,
          vx: Math.cos(a) * sp,
          vy: Math.sin(a) * sp - 2.5 * power,
          r: 1.8 + Math.random() * 4,
          c: colors[(Math.random() * colors.length) | 0],
          life: 1,
          decay: .007 + Math.random() * .014,
          rot: Math.random() * 6.28,
          vr: (Math.random() - .5) * .35,
          shape: (Math.random() * 3) | 0
        });
      }
      if (!running) { running = true; requestAnimationFrame(loop); }
    }

    function loop() {
      ctx.clearRect(0, 0, W, H);
      parts = parts.filter(p => p.life > 0 && p.y < H + 30);
      for (const p of parts) {
        p.vx *= .985; p.vy = p.vy * .985 + .2;
        p.x += p.vx; p.y += p.vy; p.rot += p.vr; p.life -= p.decay;
        ctx.globalAlpha = Math.max(p.life, 0);
        ctx.fillStyle = p.c;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.beginPath();
        if (p.shape === 0) ctx.arc(0, 0, p.r, 0, Math.PI * 2);
        else if (p.shape === 1) ctx.rect(-p.r, -p.r * .55, p.r * 2, p.r * 1.1);
        else { ctx.moveTo(0, -p.r * 1.3); ctx.lineTo(p.r, p.r); ctx.lineTo(-p.r, p.r * .7); ctx.closePath(); }
        ctx.fill();
        ctx.restore();
      }
      ctx.globalAlpha = 1;
      if (parts.length) requestAnimationFrame(loop);
      else { running = false; ctx.clearRect(0, 0, W, H); }
    }

    const shake = () => gsap.fromTo(wordLetters,
      { x: () => gsap.utils.random(-14, 14), y: () => gsap.utils.random(-14, 8), rotate: () => gsap.utils.random(-10, 10), scale: 1.12 },
      { x: 0, y: 0, rotate: 0, scale: 1, duration: 1.1, ease: 'elastic.out(1, .3)', stagger: .04, overwrite: true });

    const boom = () => {
      if (reduce) return;
      wordLetters.forEach((l, i) => setTimeout(() => { const p = local(l); burst(p.x, p.y, 60, 1.1); }, i * 110));
      shake();
    };

    gsap.from(wordLetters, {
      yPercent: 110, rotate: () => gsap.utils.random(-25, 25), opacity: 0,
      duration: 1.2, ease: 'expo.out', stagger: .1,
      scrollTrigger: { trigger: word, start: 'top 80%', once: true, onEnter: () => setTimeout(boom, 550) }
    });

    $('[data-tnt-boom]').addEventListener('click', boom);
    word.addEventListener('click', boom);

    if (finePointer && !reduce) {
      let last = 0;
      word.addEventListener('pointermove', e => {
        const now = performance.now();
        if (now - last < 45) return;
        last = now;
        const s = sec.getBoundingClientRect();
        burst(e.clientX - s.left, e.clientY - s.top, 5, .45);
      });
    }
  }

  /* ---------------------------------------------------------
     CARTA
     --------------------------------------------------------- */
  const list = $('[data-menu-list]');
  const note = $('[data-menu-note]');
  const ink = $('.menu__ink');
  const state = { locale: 'costera', cat: 'burgers' };

  function itemsFor(locale, cat) {
    return D.menu[locale][cat] || D.menu.costera[cat];
  }

  function renderMenu(animate = true) {
    const items = itemsFor(state.locale, state.cat);
    const html = items.map(([name, desc, price, img, tag]) => `
      <li class="menu__item${img ? ' has-img' : ''}"${img ? ` data-img="assets/img/${img}.webp"` : ''}>
        <h3>${name}${tag ? `<span class="menu__tag">${tag}</span>` : ''}</h3>
        <span class="menu__price">${price} €</span>
        ${desc ? `<p>${desc}</p>` : ''}
      </li>`).join('');

    const swap = () => {
      list.innerHTML = html;
      note.textContent = D.notes[state.cat] || '';
      if (animate && !reduce) {
        gsap.fromTo($$('.menu__item', list), { y: 26, opacity: 0 }, { y: 0, opacity: 1, duration: .7, stagger: .025, ease: 'expo.out' });
      }
      ScrollTrigger.refresh();
    };

    if (animate && !reduce && list.children.length) {
      gsap.to(list.children, { y: -14, opacity: 0, duration: .25, stagger: .008, ease: 'power2.in', onComplete: swap });
    } else swap();
  }

  function moveInk(btn, instant) {
    gsap.to(ink, { x: btn.offsetLeft, width: btn.offsetWidth, duration: instant ? 0 : .6, ease: 'expo.out' });
  }

  $$('[data-cat]').forEach(btn => btn.addEventListener('click', () => {
    if (btn.dataset.cat === state.cat) return;
    $$('[data-cat]').forEach(b => { b.classList.toggle('is-active', b === btn); b.setAttribute('aria-selected', b === btn); });
    state.cat = btn.dataset.cat;
    moveInk(btn);
    renderMenu();
  }));
  $$('[data-locale]').forEach(btn => btn.addEventListener('click', () => {
    if (btn.dataset.locale === state.locale) return;
    $$('[data-locale]').forEach(b => { b.classList.toggle('is-active', b === btn); b.setAttribute('aria-selected', b === btn); });
    state.locale = btn.dataset.locale;
    renderMenu();
  }));

  renderMenu(false);
  window.addEventListener('resize', () => moveInk($('[data-cat].is-active'), true));

  // Foto flotante al pasar por la carta
  if (finePointer && !reduce) {
    const prev = $('.menu-preview');
    const prevImg = $('img', prev);
    gsap.set(prev, { scale: .6, rotate: -6 });
    const px = gsap.quickTo(prev, 'x', { duration: .55, ease: 'power3' });
    const py = gsap.quickTo(prev, 'y', { duration: .55, ease: 'power3' });
    let current = null;

    list.addEventListener('pointermove', e => {
      px(e.clientX + 28);
      py(e.clientY - 150);
      const item = e.target.closest('.menu__item.has-img');
      if (item === current) return;
      current = item;
      if (item) {
        prevImg.src = item.dataset.img;
        gsap.to(prev, { opacity: 1, scale: 1, rotate: gsap.utils.random(-5, 5), duration: .5, ease: 'back.out(1.6)', overwrite: 'auto' });
      } else {
        gsap.to(prev, { opacity: 0, scale: .6, duration: .3, overwrite: 'auto' });
      }
    });
    list.addEventListener('pointerleave', () => {
      current = null;
      gsap.to(prev, { opacity: 0, scale: .6, duration: .3, overwrite: 'auto' });
    });
  }

  /* ---------------------------------------------------------
     Arranque
     --------------------------------------------------------- */
  let started = false;
  function start() {
    if (started) return;
    started = true;
    moveInk($('[data-cat].is-active'), true);
    if (reduce) {
      skipIntro();
      return;
    }
    scrollAnimations();
    intro();
  }

  document.fonts.ready.then(start);
  setTimeout(start, 2500);
  window.addEventListener('load', () => ScrollTrigger.refresh());
})();
