// Selectrucks Zapata — section components (part 1: Nav, Hero, Search)

const fmtMXN = (n) => '$' + n.toLocaleString('es-MX');
const fmtMXNnoDec = (n) => '$' + Math.round(n).toLocaleString('es-MX');

// ─── Animated counter that fires once on viewport entry ──────
function AnimatedCounter({ target, suffix = '', decimals = 0 }) {
  const [count, setCount] = React.useState(0);
  const ref = React.useRef(null);
  const done = React.useRef(false);
  React.useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || done.current) return;
      done.current = true;
      const duration = 1400;
      const fps = 60;
      const steps = (duration / 1000) * fps;
      const increment = target / steps;
      let current = 0;
      const timer = setInterval(() => {
        current = Math.min(current + increment, target);
        setCount(decimals ? parseFloat(current.toFixed(decimals)) : Math.floor(current));
        if (current >= target) clearInterval(timer);
      }, 1000 / fps);
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, decimals]);
  return <span ref={ref}>{count}{suffix}</span>;
}

// ─────────────────────────────────────────────────────────── icons
const Icon = {
  Check:  () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>,
  Arrow:  () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
  Chev:   () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="6 9 12 15 18 9"/></svg>,
  Heart:  (p) => <svg width="16" height="16" viewBox="0 0 24 24" fill={p.filled?"currentColor":"none"} stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
  Phone:  () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
  Mail:   () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16"/><polyline points="22,6 12,13 2,6"/></svg>,
  Pin:    () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  Menu:   () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
  Close:  () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="6"/></svg>,
  Truck:  () => <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="1" y="6" width="13" height="10"/><path d="M14 9h4l3 3v4h-7z"/><circle cx="5.5" cy="18" r="2"/><circle cx="17.5" cy="18" r="2"/></svg>,
  Search: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  Shield: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  Wa:     () => <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.1-1.7-.8-1.9-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.3-1.5-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.4.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5 0-.2 0-.4-.1-.5-.1-.1-.7-1.7-.9-2.3-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4 0 1.4 1 2.8 1.2 3 .1.2 2 3 4.8 4.2.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.6-.1 1.7-.7 1.9-1.3.2-.7.2-1.2.2-1.3 0-.2-.2-.3-.5-.4zM12 2a10 10 0 0 0-8.6 15l-1.4 5 5.1-1.4A10 10 0 1 0 12 2z"/></svg>,
  Instagram: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="3"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>,
  Fb: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12a10 10 0 1 0-11.6 9.87v-6.99H7.9V12h2.5V9.8c0-2.47 1.47-3.83 3.72-3.83 1.08 0 2.21.19 2.21.19v2.43h-1.24c-1.23 0-1.61.76-1.61 1.54V12h2.73l-.44 2.89h-2.29v6.99A10 10 0 0 0 22 12z"/></svg>,
  Yt: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.5 12 4.5 12 4.5s-7 0-8.9.6A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12 31 31 0 0 0 1 16.8a3 3 0 0 0 2.1 2.1c1.9.6 8.9.6 8.9.6s7 0 8.9-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 23.5 12 31 31 0 0 0 23 7.2zM9.75 15.58v-7.16L15.82 12z"/></svg>,
  Gear: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
};

// ─────────────────────────────────────────────────────────── Navbar
function Navbar({ onContact, onBranch }) {
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <>
      <header className="nav" style={{ background: scrolled ? 'rgba(10,10,10,0.95)' : 'rgba(17,17,17,0.92)' }}>
        <div className="wrap nav__inner">
          <a href="#" className="nav__logo" aria-label="Selectrucks Zapata">
            <img src="assets/logo-selectrucks.png" alt="SelecTrucks | Zapata" />
          </a>
          <nav className="nav__links hide-mobile">
            <a href="index.html">Inicio</a>
            <a href="Selectrucks%20Zapata%20-%20Inventario.html">Inventario</a>
            <a href="Selectrucks%20Zapata%20-%20Financiamiento.html">Financiamiento</a>
            <a href="Selectrucks%20Zapata%20-%20Nosotros.html">Nosotros</a>
            <a href="Selectrucks%20Zapata%20-%20Contacto.html">Contacto</a>
          </nav>
          <div className="nav__cta">
            <div className="nav__tel hide-mobile">
              <Icon.Phone />
              <strong>800 ZAPATA 1</strong>
            </div>
            <a className="btn btn--red" href="Selectrucks%20Zapata%20-%20Inventario.html">
              Ver unidades
            </a>
            <button className="nav__burger show-mobile" onClick={() => setOpen(!open)} aria-label="Menú">
              {open ? <Icon.Close /> : <Icon.Menu />}
            </button>
          </div>
        </div>
      </header>
      <div className={`mobile-menu ${open ? 'is-open' : ''}`}>
        <a href="index.html" onClick={() => setOpen(false)}>Inicio</a>
        <a href="Selectrucks%20Zapata%20-%20Inventario.html" onClick={() => setOpen(false)}>Inventario</a>
        <a href="Selectrucks%20Zapata%20-%20Financiamiento.html" onClick={() => setOpen(false)}>Financiamiento</a>
        <a href="Selectrucks%20Zapata%20-%20Nosotros.html" onClick={() => setOpen(false)}>Nosotros</a>
        <a href="Selectrucks%20Zapata%20-%20Contacto.html" onClick={() => setOpen(false)}>Contacto</a>
      </div>
    </>
  );
}

// ─────────────────────────────────────────────────────────── Hero
// Scroll-driven truck assembly animation (Nate Herk / Apple technique)
// Frames extracted from: selectrucks-zapata web design/Despiece camion rojo.mp4
// To update FRAME_COUNT: run extraction script, then count files in frames-camion-rojo/
const HERO_FRAME_COUNT = 76;
const HERO_FRAMES_PATH = 'frames-camion-rojo/';

function Hero({ onContact }) {
  const sectionRef  = React.useRef(null);
  const canvasRef   = React.useRef(null);
  const imagesRef   = React.useRef([]);
  const rafRef      = React.useRef(null);
  const lastFrame   = React.useRef(-1);

  const [loaded,   setLoaded]   = React.useState(false);
  const [loadPct,  setLoadPct]  = React.useState(0);
  const [progress, setProgress] = React.useState(0);

  // ── Preload all frames
  React.useEffect(() => {
    const imgs = [];
    let done = 0;
    for (let i = 1; i <= HERO_FRAME_COUNT; i++) {
      const img = new Image();
      const padded = String(i).padStart(4, '0');
      img.src = HERO_FRAMES_PATH + 'frame_' + padded + '.webp';
      img.onload = () => {
        done++;
        setLoadPct(Math.round((done / HERO_FRAME_COUNT) * 100));
        if (done === HERO_FRAME_COUNT) setLoaded(true);
      };
      img.onerror = () => {
        done++;
        if (done === HERO_FRAME_COUNT) setLoaded(true);
      };
      imgs.push(img);
    }
    imagesRef.current = imgs;
    return () => imagesRef.current = [];
  }, []);

  // ── Draw a specific frame on canvas — cover mode (sin barras negras)
  const drawFrame = React.useCallback((index) => {
    if (index === lastFrame.current) return;
    lastFrame.current = index;
    const canvas = canvasRef.current;
    const img = imagesRef.current[index];
    if (!canvas || !img || !img.complete) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const cW = canvas.width, cH = canvas.height;
    const iW = img.naturalWidth || 1920, iH = img.naturalHeight || 1076;
    // Cover: escala para llenar el canvas completamente (sin barras negras)
    const scale = Math.max(cW / iW, cH / iH);
    const dW = iW * scale, dH = iH * scale;
    const dx = (cW - dW) / 2, dy = (cH - dH) / 2;
    ctx.drawImage(img, dx, dy, dW, dH);
  }, []);

  // ── Scroll handler
  React.useEffect(() => {
    if (!loaded) return;

    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const section = sectionRef.current;
        if (!section) return;
        const sectionTop  = section.getBoundingClientRect().top + window.scrollY;
        const scrollable  = section.offsetHeight - window.innerHeight;
        const prog        = Math.max(0, Math.min(1, (window.scrollY - sectionTop) / scrollable));
        setProgress(prog);
        const frameIndex = Math.min(Math.floor(prog * HERO_FRAME_COUNT), HERO_FRAME_COUNT - 1);
        drawFrame(frameIndex);
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // draw initial frame
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [loaded, drawFrame]);

  // ── Resize canvas to match display size
  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      if (loaded) drawFrame(lastFrame.current);
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [loaded, drawFrame]);

  const scrollToInventory = (e) => {
    e.preventDefault();
    document.getElementById('inventario').scrollIntoView({ behavior: 'smooth' });
  };

  // ── Animación de entrada del TEXTO sincronizada con el scroll ──
  // El texto arranca invisible/desplazado y llega a su posición en los primeros 30% del scroll.
  // Cada elemento tiene un desfase (stagger) para dar sensación de cascada.
  const ease = (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; // easeInOut

  const eyebrowP = ease(Math.min(1, progress / 0.20));
  const h1P      = ease(Math.min(1, Math.max(0, (progress - 0.06) / 0.22)));
  const btnP     = ease(Math.min(1, Math.max(0, (progress - 0.12) / 0.20)));

  const eyebrowStyle = {
    opacity:   eyebrowP,
    transform: 'translateX(' + ((1 - eyebrowP) * -36) + 'px)',
  };
  const h1Style = {
    opacity:   h1P,
    transform: 'translateY(' + ((1 - h1P) * 28) + 'px)',
  };
  const btnStyle = {
    opacity:   btnP,
    transform: 'translateY(' + ((1 - btnP) * 16) + 'px)',
  };

  // ── Marquee: desliza desde la parte superior hacia su posición final (abajo) ──
  // El sticky section tiene overflow:hidden → actúa como clip durante el viaje.
  // Al inicio (progress=0) el marquee está ~87vh más arriba que su posición natural (bottom:0).
  // Al terminar (progress=1) translateY=0 → reposa en la parte inferior.
  const marqueeY = (1 - progress) * -87;

  // Scroll hint desaparece en el primer movimiento
  const hintOpacity = progress < 0.06 && loaded ? 1 - progress / 0.06 : 0;

  return (
    <section ref={sectionRef} className="hero-scroll">

      {/* Barra de progreso */}
      <div
        className="hero-scroll__progress-bar"
        style={{ transform: 'scaleX(' + progress + ')' }}
        aria-hidden="true"
      />

      <div className="hero-scroll__sticky">
        <div className="hero__bg-grid" aria-hidden="true" />

        {/* ── Dos columnas: texto izquierda | camión derecha ── */}
        <div className="hero-scroll__layout">

          {/* IZQUIERDA: texto animado sincronizado con el scroll */}
          <div className="hero-scroll__left">
            <div className="hero-scroll__eyebrow" style={eyebrowStyle}>
              <span className="dot" />
              <span>Más de 300 unidades disponibles</span>
            </div>
            <h1 style={h1Style}>
              Tu próximo camión,<br />
              listo para <span className="hl">trabajar</span> hoy.
            </h1>
            <a
              className="btn btn--premium"
              href="#inventario"
              onClick={scrollToInventory}
              style={btnStyle}
            >
              Ver inventario <Icon.Arrow />
            </a>
          </div>

          {/* DERECHA: canvas con el camión (cover, sin barras negras) */}
          <div className="hero-scroll__right">
            <canvas
              ref={canvasRef}
              className="hero-canvas"
              aria-label="Animación de ensamblaje del camión rojo"
            />
            {!loaded && (
              <div className="hero-scroll__loader" aria-live="polite">
                <span>Cargando · {loadPct}%</span>
                <div
                  className="hero-scroll__loader-bar"
                  role="progressbar"
                  aria-valuenow={loadPct}
                  aria-valuemin="0"
                  aria-valuemax="100"
                />
              </div>
            )}
            {loaded && (
              <div
                className="hero-scroll__hint"
                style={{ opacity: hintOpacity }}
                aria-hidden="true"
              >
                <div className="hero-scroll__hint-arrow" />
                <span>Scroll</span>
              </div>
            )}
          </div>
        </div>

        {/* MARQUEE — absoluto, desliza desde arriba hasta su reposo al fondo */}
        <div
          className="hero__marquee"
          aria-hidden="true"
          style={{ transform: 'translateY(' + marqueeY + 'vh)' }}
        >
          <div className="hero__marquee-track">
            <span>
              <img src="assets/logos/freightliner.png" alt="Freightliner" /><b>///</b>
              <img src="assets/logos/kenworth.png" alt="Kenworth" /><b>///</b>
              <img src="assets/logos/international.png" alt="International" /><b>///</b>
              <img src="assets/logos/volvo.png" alt="Volvo" /><b>///</b>
              <img src="assets/logos/peterbilt.png" alt="Peterbilt" /><b>///</b>
              <img src="assets/logos/mack.png" alt="Mack" /><b>///</b>
              <img src="assets/logos/mercedes-benz.png" alt="Mercedes-Benz" /><b>///</b>
              <img src="assets/logos/scania.png" alt="Scania" /><b>///</b>
              <img src="assets/logos/freightliner.png" alt="Freightliner" /><b>///</b>
              <img src="assets/logos/kenworth.png" alt="Kenworth" /><b>///</b>
              <img src="assets/logos/international.png" alt="International" /><b>///</b>
              <img src="assets/logos/volvo.png" alt="Volvo" /><b>///</b>
              <img src="assets/logos/peterbilt.png" alt="Peterbilt" /><b>///</b>
              <img src="assets/logos/mack.png" alt="Mack" /><b>///</b>
              <img src="assets/logos/mercedes-benz.png" alt="Mercedes-Benz" /><b>///</b>
              <img src="assets/logos/scania.png" alt="Scania" /><b>///</b>
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────── Search bar
function SearchBar({ filters, setFilters, resultsCount }) {
  const [open, setOpen] = React.useState(null); // which dropdown
  const ref = React.useRef(null);
  React.useEffect(() => {
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(null); };
    document.addEventListener('click', onDoc);
    return () => document.removeEventListener('click', onDoc);
  }, []);

  const brandCounts = React.useMemo(() => {
    const c = {};
    BRANDS.forEach(b => c[b] = UNITS.filter(u => u.brand === b).length);
    return c;
  }, []);
  const typeCounts = React.useMemo(() => {
    const c = {};
    TYPES.forEach(t => c[t] = UNITS.filter(u => u.type === t).length);
    return c;
  }, []);
  const branchCounts = React.useMemo(() => {
    const c = {};
    BRANCHES.forEach(b => c[b.name] = UNITS.filter(u => u.branch === b.name).length);
    return c;
  }, []);

  const fieldVal = (key, pretty) => filters[key] ? pretty(filters[key]) : 'Todas';
  const submit = () => {
    document.getElementById('inventario').scrollIntoView({ behavior: 'smooth' });
  };
  const chips = [
    { key: 'featured', label: 'Destacadas', count: UNITS.filter(u => u.featured).length },
    { key: 'new',      label: 'Nuevo ingreso', count: UNITS.filter(u => u.status === 'Nuevo ingreso').length },
    { key: 'offer',    label: 'En oferta', count: UNITS.filter(u => u.status === 'Oferta').length },
    { key: 'warranty', label: 'Con garantía', count: UNITS.filter(u => u.warranty).length },
  ];

  return (
    <section className="search" ref={ref} id="buscador">
      <div className="wrap">
        <div className="search__head">
          <div>
            <div className="eyebrow" style={{ color: 'var(--red)', marginBottom: 10 }}>— Encuentra tu unidad</div>
            <h3 className="search__title">Buscador <em>rápido</em></h3>
          </div>
          <div className="search__count">
            <span className="live"></span>
            <span><strong>{resultsCount}</strong> unidades disponibles hoy</span>
          </div>
        </div>
        <div className="search__grid">
          {/* Brand */}
          <div className={`search__field ${open === 'brand' ? 'is-open' : ''}`} onClick={(e) => { e.stopPropagation(); setOpen(open === 'brand' ? null : 'brand'); }}>
            <label>Marca</label>
            <div className="value">
              <span>{fieldVal('brand', v => v)}</span>
              <span className="chev"><Icon.Chev /></span>
            </div>
            <div className="search__dropdown" onClick={(e) => e.stopPropagation()}>
              <button className={!filters.brand ? 'is-selected' : ''} onClick={() => { setFilters({ ...filters, brand: null }); setOpen(null); }}>
                <span>Todas las marcas</span><span className="count">{UNITS.length}</span>
              </button>
              {BRANDS.map(b => (
                <button key={b} className={filters.brand === b ? 'is-selected' : ''} onClick={() => { setFilters({ ...filters, brand: b }); setOpen(null); }}>
                  <span>{b}</span><span className="count">{brandCounts[b]}</span>
                </button>
              ))}
            </div>
          </div>
          {/* Type */}
          <div className={`search__field ${open === 'type' ? 'is-open' : ''}`} onClick={(e) => { e.stopPropagation(); setOpen(open === 'type' ? null : 'type'); }}>
            <label>Tipo</label>
            <div className="value">
              <span>{fieldVal('type', v => v)}</span>
              <span className="chev"><Icon.Chev /></span>
            </div>
            <div className="search__dropdown" onClick={(e) => e.stopPropagation()}>
              <button className={!filters.type ? 'is-selected' : ''} onClick={() => { setFilters({ ...filters, type: null }); setOpen(null); }}>
                <span>Todos los tipos</span><span className="count">{UNITS.length}</span>
              </button>
              {TYPES.map(t => (
                <button key={t} className={filters.type === t ? 'is-selected' : ''} onClick={() => { setFilters({ ...filters, type: t }); setOpen(null); }}>
                  <span>{t}</span><span className="count">{typeCounts[t] || 0}</span>
                </button>
              ))}
            </div>
          </div>
          {/* Price */}
          <div className={`search__field ${open === 'price' ? 'is-open' : ''}`} onClick={(e) => { e.stopPropagation(); setOpen(open === 'price' ? null : 'price'); }}>
            <label>Precio</label>
            <div className="value">
              <span>{filters.price ? filters.price.label : 'Todos'}</span>
              <span className="chev"><Icon.Chev /></span>
            </div>
            <div className="search__dropdown" onClick={(e) => e.stopPropagation()}>
              <button className={!filters.price ? 'is-selected' : ''} onClick={() => { setFilters({ ...filters, price: null }); setOpen(null); }}>
                <span>Cualquier precio</span><span className="count">{UNITS.length}</span>
              </button>
              {PRICES.map(p => (
                <button key={p.label} className={filters.price?.label === p.label ? 'is-selected' : ''} onClick={() => { setFilters({ ...filters, price: p }); setOpen(null); }}>
                  <span>{p.label}</span>
                  <span className="count">{UNITS.filter(u => u.price >= p.min && u.price < p.max).length}</span>
                </button>
              ))}
            </div>
          </div>
          {/* Branch */}
          <div className={`search__field ${open === 'branch' ? 'is-open' : ''}`} onClick={(e) => { e.stopPropagation(); setOpen(open === 'branch' ? null : 'branch'); }}>
            <label>Sucursal</label>
            <div className="value">
              <span>{fieldVal('branch', v => v)}</span>
              <span className="chev"><Icon.Chev /></span>
            </div>
            <div className="search__dropdown" onClick={(e) => e.stopPropagation()}>
              <button className={!filters.branch ? 'is-selected' : ''} onClick={() => { setFilters({ ...filters, branch: null }); setOpen(null); }}>
                <span>Todas las sucursales</span><span className="count">{UNITS.length}</span>
              </button>
              {BRANCHES.map(b => (
                <button key={b.id} className={filters.branch === b.name ? 'is-selected' : ''} onClick={() => { setFilters({ ...filters, branch: b.name }); setOpen(null); }}>
                  <span>{b.name}</span><span className="count">{branchCounts[b.name] || 0}</span>
                </button>
              ))}
            </div>
          </div>
          <button className="search__submit" onClick={submit}>
            <Icon.Search />
            Buscar unidades
          </button>
        </div>
        <div className="search__chips">
          <span className="eyebrow" style={{ color: 'var(--fog)', alignSelf: 'center', marginRight: 6 }}>Filtros rápidos:</span>
          {chips.map(c => (
            <button key={c.key} className={`search__chip ${filters.quick === c.key ? 'is-active' : ''}`}
              onClick={() => setFilters({ ...filters, quick: filters.quick === c.key ? null : c.key })}>
              {c.label} <span className="count">({c.count})</span>
            </button>
          ))}
          {(filters.brand || filters.type || filters.price || filters.branch || filters.quick) && (
            <button className="search__chip" onClick={() => setFilters({})}>
              × Limpiar todo
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

window.Icon = Icon;
window.Navbar = Navbar;
window.Hero = Hero;
window.SearchBar = SearchBar;
window.fmtMXN = fmtMXN;
window.fmtMXNnoDec = fmtMXNnoDec;
window.AnimatedCounter = AnimatedCounter;
