// Selectrucks Zapata — section components (part 1: Nav, Hero, Search)

const fmtMXN = (n) => '$' + n.toLocaleString('es-MX');
const fmtMXNnoDec = (n) => '$' + Math.round(n).toLocaleString('es-MX');

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
            <img src={window.__resources.logo} alt="SelecTrucks | Zapata" />
          </a>
          <nav className="nav__links hide-mobile">
            <a href="#inventario">Inventario</a>
            <a href="#financiamiento">Financiamiento</a>
            <a href="#sucursales" onClick={(e)=>{ e.preventDefault(); document.getElementById('sucursales').scrollIntoView({behavior:'smooth'}); }}>Sucursales</a>
            <a href="#contacto" onClick={(e)=>{ e.preventDefault(); onContact(); }}>Contacto</a>
          </nav>
          <div className="nav__cta">
            <div className="nav__tel hide-mobile">
              <Icon.Phone />
              <strong>800 ZAPATA 1</strong>
            </div>
            <a className="btn btn--red" href="#inventario" onClick={(e)=>{ e.preventDefault(); document.getElementById('inventario').scrollIntoView({behavior:'smooth'}); }}>
              Ver unidades
            </a>
            <button className="nav__burger show-mobile" onClick={() => setOpen(!open)} aria-label="Menú">
              {open ? <Icon.Close /> : <Icon.Menu />}
            </button>
          </div>
        </div>
      </header>
      <div className={`mobile-menu ${open ? 'is-open' : ''}`}>
        <a href="#inventario" onClick={() => setOpen(false)}>Inventario</a>
        <a href="#financiamiento" onClick={() => setOpen(false)}>Financiamiento</a>
        <a href="#sucursales" onClick={() => { setOpen(false); document.getElementById('sucursales').scrollIntoView({behavior:'smooth'}); }}>Sucursales</a>
        <a href="#contacto" onClick={(e) => { e.preventDefault(); setOpen(false); onContact(); }}>Contacto</a>
      </div>
    </>
  );
}

// ─────────────────────────────────────────────────────────── Hero
function Hero({ onContact }) {
  return (
    <section className="hero">
      <div className="hero__bg-grid"></div>
      <div className="hero__red-block"></div>
      <div className="wrap hero__grid">
        <div>
          <div className="hero__eyebrow">
            <span className="dot"></span>
            <span className="eyebrow">306 Unidades en piso · Actualizado hoy</span>
          </div>
          <h1>
            Tu próximo<br/>
            camión, listo<br/>
            para <span className="hl">trabajar</span><br/>
            hoy.
          </h1>
          <p className="hero__sub">
            Más de <strong>300 unidades verificadas</strong> en 9 sucursales de México.
            Financiamiento aprobado en <strong>48 horas</strong>, documentación limpia y garantía incluida.
          </p>
          <div className="hero__ctas">
            <a className="btn btn--red btn--lg" href="#inventario" onClick={(e)=>{ e.preventDefault(); document.getElementById('inventario').scrollIntoView({behavior:'smooth'}); }}>
              Ver inventario <Icon.Arrow />
            </a>
            <button className="btn btn--ghost btn--lg" onClick={onContact}>
              Hablar con asesor
            </button>
          </div>
          <div className="hero__trust">
            <div className="hero__trust-item"><Icon.Check /><span>Inspección<br/>técnica 150 pts</span></div>
            <div className="hero__trust-item"><Icon.Check /><span>Documentación<br/>completa</span></div>
            <div className="hero__trust-item"><Icon.Check /><span>Garantía<br/>incluida</span></div>
            <div className="hero__trust-item"><Icon.Check /><span>Financiamiento<br/>flexible</span></div>
          </div>
        </div>
        <div className="hero__visual">
          <div className="hero__photo">
            <img src={window.__resources.cascadia} alt="Freightliner Cascadia 2020" />
            <div className="hero__photo-ribbon">Unidad destacada</div>
            <div className="hero__photo-badge">
              <span>Engancha desde</span>
              $290,055
            </div>
          </div>
          <div className="hero__stats">
            <div>
              <strong>306</strong>
              <span>En piso</span>
            </div>
            <div>
              <strong>48h</strong>
              <span>Aprobación</span>
            </div>
            <div>
              <strong>70</strong>
              <span>Años Zapata</span>
            </div>
          </div>
        </div>
      </div>
      <div className="hero__marquee" aria-hidden="true">
        <div className="hero__marquee-track">
          <span>
            <em>◆ Freightliner</em><em>◆ Kenworth</em><em>◆ International</em><em>◆ Volvo</em><em>◆ Peterbilt</em>
            <em>◆ Mack</em><em>◆ Mercedes-Benz</em><em>◆ Scania</em>
            <em>◆ Freightliner</em><em>◆ Kenworth</em><em>◆ International</em><em>◆ Volvo</em><em>◆ Peterbilt</em>
            <em>◆ Mack</em><em>◆ Mercedes-Benz</em><em>◆ Scania</em>
          </span>
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
