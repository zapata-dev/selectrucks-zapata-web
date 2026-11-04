// Selectrucks Zapata — section components (part 1: Nav, Promociones, Search)

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
  Close:  () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
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
            <a
              className="nav__tel hide-mobile"
              href="https://wa.me/525598160234?text=Hola%2C%20quiero%20informaci%C3%B3n%20de%20unidades%20disponibles."
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contactar por WhatsApp"
            >
              <Icon.Wa />
              <strong>Asesor por WhatsApp 24/7</strong>
            </a>
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

// ─────────────────────────────────────────────────────────── Promociones
// Carrusel de promociones y eventos. Para publicar un anuncio, edita PROMOS.
// type: 'promo' (rojo) · 'evento' (lima) · 'anuncio' (blanco) · tab: nombre de su pestaña
// Un anuncio con `gallery` muestra sus artes completos (con miniaturas si son varios) y se pueden ampliar.
const PROMO_ESPECIAL = [
  { name: 'Cascadia 2017',         branch: 'Guadalajara',  file: '01-cascadia-2017-guadalajara.webp' },
  { name: 'Cascadia 2017',         branch: 'Tlalnepantla', file: '02-cascadia-2017-tlalnepantla.webp' },
  { name: 'Cascadia 2012',         branch: 'Guadalajara',  file: '03-cascadia-2012-guadalajara.webp' },
  { name: 'Cascadia 2021',         branch: 'Guadalajara',  file: '04-cascadia-2021-guadalajara.webp' },
  { name: 'LT Hi Rise Euro 2022',  branch: 'Guadalajara',  file: '05-lt-hi-rise-euro-2022-guadalajara.webp' },
  { name: 'VNL64T 2019',           branch: 'Guadalajara',  file: '06-vnl64t-2019-guadalajara.webp' },
  { name: 'Cascadia 2018',         branch: 'Guadalajara',  file: '07-cascadia-2018-guadalajara.webp' },
  { name: 'Cascadia 2020',         branch: 'Querétaro',    file: '08-cascadia-2020-queretaro.webp' },
  { name: 'Caja refrigerada 2015', branch: 'León',         file: '09-caja-refrigerada-2015-leon.webp' },
  { name: 'Caja refrigerada 2019', branch: 'León',         file: '10-caja-refrigerada-2019-leon.webp' },
  { name: 'Cascadia 2018',         branch: 'Tlalnepantla', file: '11-cascadia-2018-tlalnepantla.webp' },
].map((a) => ({ ...a, image: 'assets/promo-especial/' + a.file }));

const EVENTOS = [
  {
    name: 'Gran Feria de Seminuevos',
    branch: 'León',
    file: 'gran-feria-seminuevos-leon.webp',
    image: 'assets/eventos/gran-feria-seminuevos-leon.webp',
    alt: 'Gran Feria de Seminuevos, 25 y 26 de noviembre en Zapata Camiones León. Desde 0% de enganche y tasa desde 9% anual.',
  },
];

const PROMOS = [
  {
    type: 'promo',
    tab: 'Promoción especial',
    tabSub: 'Precio especial',
    label: 'Promoción especial',
    gallery: PROMO_ESPECIAL,
    countLabel: 'unidades en precio especial',
    desc: `Tractocamiones y cajas refrigeradas en ${new Set(PROMO_ESPECIAL.map((a) => a.branch)).size} sucursales.`,
    text: 'Hasta agotar existencias',
    cta: 'Me interesa esta unidad',
    // Contacto con la sucursal, el motivo y un mensaje de la unidad del arte actual
    hrefFor: (a) => 'Selectrucks%20Zapata%20-%20Contacto.html?' + new URLSearchParams({
      sucursal: a.branch,
      motivo: 'Promoción especial',
      mensaje: `Hola, quiero conocer más sobre la unidad ${a.name} de Zapata ${a.branch} que está en promoción especial.`,
    }).toString() + '#formulario',
  },
  {
    type: 'evento',
    tab: 'Eventos',
    tabSub: '25 y 26 de noviembre',
    label: 'Evento',
    gallery: EVENTOS,
    title: 'Gran Feria de Seminuevos',
    text: '25 y 26 de noviembre · Zapata Camiones León',
    perks: ['Desde 0% de enganche', 'Tasa desde 9% anual'],
    meta: 'Blvd. Aeropuerto 868, León, Gto.',
    cta: 'Quiero asistir',
    href: 'Selectrucks%20Zapata%20-%20Contacto.html?sucursal=Le%C3%B3n&motivo=Gran%20Feria%20de%20Seminuevos#formulario',
  },
];
const PROMO_DELAY = 6000;
const PROMO_ART_DELAY = 2000;
const pad2 = (n) => String(n).padStart(2, '0');

function PromoGallery({ items, current, active, onSelect, onZoom }) {
  const thumbsRef = React.useRef(null);
  React.useEffect(() => {
    const box = thumbsRef.current;
    const el = box && box.children[current];
    if (!el || box.scrollWidth <= box.clientWidth) return;
    box.scrollTo({ left: el.offsetLeft - box.clientWidth / 2 + el.offsetWidth / 2, behavior: 'smooth' });
  }, [current]);

  return (
    <div className={`promo-gallery ${items.length === 1 ? 'promo-gallery--single' : ''}`}>
      <img className="promo-gallery__bg" src={items[current].image} alt="" aria-hidden="true" />
      <div className="promo-gallery__track" style={{ '--i': current }}>
        {items.map((a, i) => (
          <img
            key={a.file}
            className={`promo-gallery__item ${i === current ? 'is-current' : ''}`}
            src={a.image}
            alt={i === current ? (a.alt || `${a.name}, Zapata ${a.branch}. Precio especial.`) : ''}
            aria-hidden={i !== current}
            loading={active && Math.abs(i - current) <= 1 ? 'eager' : 'lazy'}
            onClick={i === current ? onZoom : () => onSelect(i)}
          />
        ))}
      </div>
      <button className="promo-gallery__zoom" onClick={onZoom} tabIndex={active ? 0 : -1} aria-label="Ver arte en grande">
        <Icon.Search /> <span>Ampliar</span>
      </button>
      {items.length > 1 && <div className="promo-gallery__thumbs" ref={thumbsRef}>
        {items.map((a, i) => (
          <button
            key={a.file}
            className={`promo-gallery__thumb ${i === current ? 'is-current' : ''}`}
            onClick={() => onSelect(i)}
            aria-label={`${a.name}, Zapata ${a.branch}`}
            aria-current={i === current}
            tabIndex={active ? 0 : -1}
          >
            <img src={a.image} alt="" loading="lazy" />
          </button>
        ))}
      </div>}
    </div>
  );
}

function PromoLightbox({ items, current, onClose, onStep }) {
  const closeRef = React.useRef(null);
  React.useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    if (closeRef.current) closeRef.current.focus();
    return () => { document.body.style.overflow = prev; };
  }, []);
  React.useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onStep(1);
      if (e.key === 'ArrowLeft') onStep(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, onStep]);

  const a = items[current];
  const stop = (fn) => (e) => { e.stopPropagation(); fn(); };
  return (
    <div className="promo-lightbox" role="dialog" aria-modal="true" aria-label="Arte en grande" onClick={onClose}>
      <figure className="promo-lightbox__inner" onClick={(e) => e.stopPropagation()}>
        <img src={a.image} alt={a.alt || `${a.name}, Zapata ${a.branch}. Precio especial.`} />
        <figcaption className="promo-lightbox__bar mono">
          <span><strong>{a.name}</strong> · Zapata {a.branch}</span>
          {items.length > 1 && <span>{pad2(current + 1)} / {pad2(items.length)}</span>}
        </figcaption>
      </figure>
      <button className="promo-lightbox__close" ref={closeRef} onClick={stop(onClose)} aria-label="Cerrar"><Icon.Close /></button>
      {items.length > 1 && (
        <>
          <button className="promo-lightbox__arrow promo-lightbox__arrow--prev" onClick={stop(() => onStep(-1))} aria-label="Arte anterior">
            <span className="promo-car__arrow-icon--prev"><Icon.Arrow /></span>
          </button>
          <button className="promo-lightbox__arrow promo-lightbox__arrow--next" onClick={stop(() => onStep(1))} aria-label="Arte siguiente">
            <Icon.Arrow />
          </button>
        </>
      )}
    </div>
  );
}

function PromoBanner() {
  const [index, setIndex] = React.useState(0);
  const [art, setArt] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const [run, setRun] = React.useState(0);
  const [zoom, setZoom] = React.useState(false);
  const touchX = React.useRef(null);
  const total = PROMOS.length;
  const arts = PROMOS[index].gallery ? PROMOS[index].gallery.length : 0;
  const reduced = React.useMemo(
    () => window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches, []);

  const goSlide = (i, fromEnd = false) => {
    const n = (i + total) % total;
    const g = PROMOS[n].gallery;
    setIndex(n);
    setArt(fromEnd && g ? g.length - 1 : 0);
    setRun((r) => r + 1);
  };
  const pickArt = (i) => { setArt(i); setRun((r) => r + 1); };
  // Dentro de una galería las flechas avanzan arte por arte; al terminar pasan a la siguiente pestaña
  const step = (dir) => {
    if (arts && art + dir >= 0 && art + dir < arts) { pickArt(art + dir); return; }
    goSlide(index + dir, dir < 0);
  };

  React.useEffect(() => {
    if (paused || reduced || zoom) return;
    const t = setTimeout(() => step(1), arts > 1 ? PROMO_ART_DELAY : PROMO_DELAY);
    return () => clearTimeout(t);
  }, [index, art, paused, run, reduced, zoom]);

  const resume = () => { setPaused(false); setRun((r) => r + 1); };
  const onTouchStart = (e) => { touchX.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touchX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 40) step(dx < 0 ? 1 : -1);
    touchX.current = null;
  };
  const onKeyDown = (e) => {
    if (zoom || e.target.getAttribute('role') === 'tab') return;
    if (e.key === 'ArrowRight') step(1);
    if (e.key === 'ArrowLeft') step(-1);
  };
  const onTabKey = (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      e.preventDefault();
      const n = (index + (e.key === 'ArrowRight' ? 1 : -1) + total) % total;
      goSlide(n);
      const tabs = e.currentTarget.parentNode.children;
      tabs[n] && tabs[n].focus();
    }
  };

  const current = PROMOS[index];
  return (
    <section className="promo" id="promociones" aria-label="Promociones y eventos">
      <div
        className={`wrap promo__box ${paused || reduced ? 'is-paused' : ''}`}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={resume}
        onFocus={() => setPaused(true)}
        onBlur={resume}
        onKeyDown={onKeyDown}
      >

        <div className={`promo-stage promo-stage--${current.type}`}>
          <div className="promo-car" aria-roledescription="carrusel" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
            <div className="promo-car__track">
              {PROMOS.map((p, i) => {
                const on = i === index;
                const pos = on ? art : 0;
                const cur = p.gallery ? p.gallery[pos] : null;
                return (
                  <article
                    key={p.tab}
                    id={`promo-slide-${i}`}
                    role="tabpanel"
                    aria-labelledby={`promo-tab-${i}`}
                    className={`promo-slide promo-slide--${p.type} ${p.gallery ? 'promo-slide--gallery' : ''} ${on ? 'is-active' : ''}`}
                    aria-hidden={!on}
                  >
                    <div className="promo-slide__media">
                      {p.gallery
                        ? <PromoGallery items={p.gallery} current={pos} active={on} onSelect={pickArt} onZoom={() => setZoom(true)} />
                        : <img src={p.image} alt={p.alt} loading="lazy" style={p.focus ? { objectPosition: p.focus } : undefined} />}
                    </div>
                    <div className="promo-slide__panel">
                      <div className="promo-slide__body">
                        <span className="promo-slide__tag">{p.label}</span>
                        {p.countLabel ? (
                          <>
                            <h3 className="promo-slide__headline">
                              <strong>{p.gallery.length}</strong> {p.countLabel}
                            </h3>
                            <p className="promo-slide__desc">{p.desc}</p>
                            <p className="promo-slide__stock"><span className="promo-slide__pulse" aria-hidden="true" />{p.text}</p>
                          </>
                        ) : (
                          <>
                            <h3 className="promo-slide__headline">{p.title}</h3>
                            <p className="promo-slide__desc">{p.text}</p>
                            {p.perks && (
                              <ul className="promo-slide__perks">
                                {p.perks.map((k) => <li key={k}>{k}</li>)}
                              </ul>
                            )}
                          </>
                        )}
                      </div>
                      <div className="promo-slide__foot">
                        {p.countLabel && cur ? (
                          <div className="promo-slide__unit" aria-live={on ? 'polite' : undefined}>
                            <span className="promo-slide__unit-label">Unidad {pad2(pos + 1)} de {pad2(p.gallery.length)}</span>
                            <strong>{cur.name}</strong>
                            <span className="promo-slide__unit-branch"><Icon.Pin /> Zapata {cur.branch}</span>
                          </div>
                        ) : (
                          <span className="promo-slide__place"><Icon.Pin /> {p.meta}</span>
                        )}
                        <a className="btn promo-slide__cta" href={p.hrefFor && cur ? p.hrefFor(cur) : p.href} tabIndex={on ? 0 : -1}>
                          {p.cta} <Icon.Arrow />
                        </a>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="promo-car__nav">
              <button className="promo-car__arrow" onClick={() => step(-1)} aria-label="Anterior">
                <span className="promo-car__arrow-icon promo-car__arrow-icon--prev"><Icon.Arrow /></span>
              </button>
              <button className="promo-car__arrow" onClick={() => step(1)} aria-label="Siguiente">
                <Icon.Arrow />
              </button>
            </div>
          </div>

          <div className="promo-tabs" role="tablist" aria-label="Secciones de promociones">
            {PROMOS.map((p, i) => {
              const on = i === index;
              const n = p.gallery ? p.gallery.length : 1;
              return (
                <button
                  key={p.tab}
                  role="tab"
                  id={`promo-tab-${i}`}
                  aria-selected={on}
                  aria-controls={`promo-slide-${i}`}
                  tabIndex={on ? 0 : -1}
                  className={`promo-tab promo-tab--${p.type} ${on ? 'is-active' : ''}`}
                  onClick={() => goSlide(i)}
                  onKeyDown={onTabKey}
                >
                  <span className="promo-tab__mark" aria-hidden="true" />
                  <span className="promo-tab__text">
                    <span className="promo-tab__label">{p.tab}</span>
                    <span className="promo-tab__sub">{p.tabSub}</span>
                  </span>
                  {p.countLabel && <span className="promo-tab__badge" aria-label={`${p.gallery.length} unidades`}>{p.gallery.length}</span>}
                  <span className="promo-tab__go" aria-hidden="true"><Icon.Arrow /></span>
                  <span className="promo-tab__bar" aria-hidden="true">
                    {on && (
                      <span
                        key={`${index}-${art}-${run}`}
                        style={{
                          '--from': art / n,
                          '--to': (art + 1) / n,
                          animationDuration: (n > 1 ? PROMO_ART_DELAY : PROMO_DELAY) + 'ms',
                        }}
                      />
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {zoom && current.gallery && (
          <PromoLightbox
            items={current.gallery}
            current={art}
            onClose={() => setZoom(false)}
            onStep={(dir) => pickArt((art + dir + arts) % arts)}
          />
        )}
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
window.SearchBar = SearchBar;
window.fmtMXN = fmtMXN;
window.fmtMXNnoDec = fmtMXNnoDec;
window.AnimatedCounter = AnimatedCounter;

