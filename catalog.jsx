// Selectrucks Zapata — Catalog page components

// Expand units to 24 for realistic catalog
const CAT_UNITS = [
  ...UNITS,
  { id: 13, brand: 'Kenworth',     model: 'T880',       year: 2022, km: '180,000', engine: 'PACCAR MX-13 · 510hp', type: 'Volteo',          price: 1820000, monthly: 42900, branch: 'Monterrey',     featured: true,  warranty: true, status: 'Nuevo ingreso' },
  { id: 14, brand: 'Freightliner', model: 'Columbia',   year: 2017, km: '680,000', engine: 'DD13 · 470hp',        type: 'Tractocamión',    price: 580000,  monthly: 13680, branch: 'León',          featured: false, warranty: true, status: 'Oferta' },
  { id: 15, brand: 'International',model: 'ProStar',    year: 2019, km: '490,000', engine: 'N13 · 450hp',         type: 'Tractocamión',    price: 890000,  monthly: 20990, branch: 'Querétaro',     featured: false, warranty: true, status: 'Disponible' },
  { id: 16, brand: 'Volvo',        model: 'VNL 670',    year: 2020, km: '340,000', engine: 'D13 · 455hp',         type: 'Tractocamión',    price: 1260000, monthly: 29800, branch: 'Guadalajara',   featured: true,  warranty: true, status: 'Disponible' },
  { id: 17, brand: 'Peterbilt',    model: '389',        year: 2018, km: '520,000', engine: 'PACCAR MX-13 · 485hp',type: 'Tractocamión',    price: 1420000, monthly: 33500, branch: 'Tlalnepantla',  featured: false, warranty: true, status: 'Disponible' },
  { id: 18, brand: 'Mack',         model: 'Granite',    year: 2019, km: '380,000', engine: 'MP7 · 405hp',         type: 'Volteo',          price: 980000,  monthly: 23100, branch: 'Aeropuerto',    featured: false, warranty: true, status: 'Disponible' },
  { id: 19, brand: 'Scania',       model: 'G 410',      year: 2020, km: '290,000', engine: 'DC13 · 410hp',        type: 'Camión de carga', price: 1080000, monthly: 25400, branch: 'Tampico',       featured: false, warranty: true, status: 'Disponible' },
  { id: 20, brand: 'Mercedes-Benz',model: 'Axor 2533',  year: 2019, km: '410,000', engine: 'OM457 · 326hp',       type: 'Camión de carga', price: 720000,  monthly: 16980, branch: 'Celaya',        featured: false, warranty: true, status: 'Oferta' },
  { id: 21, brand: 'Kenworth',     model: 'T800',       year: 2021, km: '220,000', engine: 'PACCAR MX-13',        type: 'Pipa',            price: 1550000, monthly: 36500, branch: 'Monterrey',     featured: true,  warranty: true, status: 'Nuevo ingreso' },
  { id: 22, brand: 'Freightliner', model: 'Cascadia',   year: 2021, km: '280,000', engine: 'DD15 · 505hp',        type: 'Tractocamión',    price: 1380000, monthly: 32600, branch: 'Guadalajara',   featured: true,  warranty: true, status: 'Disponible' },
  { id: 23, brand: 'International',model: 'HV Series',  year: 2020, km: '310,000', engine: 'A26 · 430hp',         type: 'Refrigerado',     price: 1150000, monthly: 27100, branch: 'Querétaro',     featured: false, warranty: true, status: 'Disponible' },
  { id: 24, brand: 'Volvo',        model: 'FH 460',     year: 2018, km: '560,000', engine: 'D13 · 460hp',         type: 'Cama baja',       price: 890000,  monthly: 20990, branch: 'Tlalnepantla',  featured: false, warranty: true, status: 'Oferta' },
];

function FilterGroup({ title, children, defaultOpen = true }) {
  const [open, setOpen] = React.useState(defaultOpen);
  return (
    <div className={`filter-group ${open ? '' : 'is-collapsed'}`}>
      <div className="filter-group__head" onClick={() => setOpen(!open)}>
        <h3>{title}</h3>
        <span className="toggle"><Icon.Chev /></span>
      </div>
      <div className="filter-group__body">{children}</div>
    </div>
  );
}

function CheckOpt({ checked, onChange, label, count }) {
  return (
    <label className="fopt">
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span className="fopt__box"></span>
      <span className="fopt__label">{label}</span>
      <span className="fopt__count">{count}</span>
    </label>
  );
}

function RangeSlider({ min, max, step, value, onChange, formatLabel }) {
  const [lo, hi] = value;
  const loPct = ((lo - min) / (max - min)) * 100;
  const hiPct = ((hi - min) / (max - min)) * 100;
  return (
    <div className="range">
      <div className="range__values">
        <span className="v">{formatLabel(lo)}</span>
        <span className="dash">—</span>
        <span className="v">{formatLabel(hi)}</span>
      </div>
      <div className="range__track">
        <div className="range__fill" style={{ left: loPct + '%', right: (100 - hiPct) + '%' }}></div>
        <input type="range" className="range__input" min={min} max={max} step={step} value={lo}
          onChange={(e) => { const v = Math.min(+e.target.value, hi - step); onChange([v, hi]); }} />
        <input type="range" className="range__input" min={min} max={max} step={step} value={hi}
          onChange={(e) => { const v = Math.max(+e.target.value, lo + step); onChange([lo, v]); }} />
      </div>
    </div>
  );
}

function FiltersPanel({ filters, setFilters, onClose, mobileOpen, onApply, resultCount }) {
  const toggle = (key, v) => {
    const cur = filters[key] || [];
    setFilters({ ...filters, [key]: cur.includes(v) ? cur.filter(x => x !== v) : [...cur, v] });
  };
  const clearAll = () => setFilters({
    brand: [], type: [], branch: [],
    year: [2017, 2023], price: [500000, 2000000], km: [0, 700000]
  });
  const brandCounts = {};
  BRANDS.forEach(b => brandCounts[b] = CAT_UNITS.filter(u => u.brand === b).length);
  const typeCounts = {};
  TYPES.forEach(t => typeCounts[t] = CAT_UNITS.filter(u => u.type === t).length);
  const branchCounts = {};
  BRANCHES.forEach(b => branchCounts[b.name] = CAT_UNITS.filter(u => u.branch === b.name).length);

  return (
    <aside className={`filters ${mobileOpen ? 'is-open' : ''}`}>
      <div className="filters__head">
        <h2>◆ Filtros</h2>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <button className="filters__clear" onClick={clearAll}>Limpiar</button>
          <button className="filters__close show-mobile" onClick={onClose} aria-label="Cerrar"><Icon.Close /></button>
        </div>
      </div>

      <FilterGroup title="Marca">
        {BRANDS.map(b => (
          <CheckOpt key={b} label={b} count={brandCounts[b]}
            checked={(filters.brand || []).includes(b)}
            onChange={() => toggle('brand', b)} />
        ))}
      </FilterGroup>

      <FilterGroup title="Tipo de unidad">
        {TYPES.map(t => (
          <CheckOpt key={t} label={t} count={typeCounts[t] || 0}
            checked={(filters.type || []).includes(t)}
            onChange={() => toggle('type', t)} />
        ))}
      </FilterGroup>

      <FilterGroup title="Año">
        <RangeSlider min={2015} max={2024} step={1}
          value={filters.year || [2017, 2023]}
          onChange={(v) => setFilters({ ...filters, year: v })}
          formatLabel={(v) => v} />
      </FilterGroup>

      <FilterGroup title="Precio">
        <RangeSlider min={400000} max={2500000} step={50000}
          value={filters.price || [500000, 2000000]}
          onChange={(v) => setFilters({ ...filters, price: v })}
          formatLabel={(v) => v >= 1000000 ? '$' + (v/1000000).toFixed(1) + 'M' : '$' + (v/1000).toFixed(0) + 'k'} />
      </FilterGroup>

      <FilterGroup title="Kilometraje">
        <RangeSlider min={0} max={800000} step={10000}
          value={filters.km || [0, 700000]}
          onChange={(v) => setFilters({ ...filters, km: v })}
          formatLabel={(v) => v >= 1000 ? (v/1000).toFixed(0) + 'k km' : v + ' km'} />
      </FilterGroup>

      <FilterGroup title="Sucursal">
        {BRANCHES.map(b => (
          <CheckOpt key={b.id} label={b.name} count={branchCounts[b.name] || 0}
            checked={(filters.branch || []).includes(b.name)}
            onChange={() => toggle('branch', b.name)} />
        ))}
      </FilterGroup>

      <div className="filters__apply">
        <button className="filters__apply-btn" onClick={onApply}>
          Aplicar filtros <Icon.Arrow />
        </button>
        <small>{resultCount} unidades coinciden</small>
      </div>
    </aside>
  );
}

function SortDropdown({ value, onChange }) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);
  const OPTIONS = [
    { id: 'relevant', label: 'Más relevantes' },
    { id: 'price-asc', label: 'Precio: menor a mayor' },
    { id: 'price-desc', label: 'Precio: mayor a menor' },
    { id: 'year-desc', label: 'Año: más nuevo primero' },
    { id: 'year-asc', label: 'Año: más antiguo primero' },
    { id: 'km-asc', label: 'Kilometraje: menor primero' },
  ];
  React.useEffect(() => {
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('click', onDoc);
    return () => document.removeEventListener('click', onDoc);
  }, []);
  const current = OPTIONS.find(o => o.id === value);
  return (
    <div className={`results__sort ${open ? 'is-open' : ''}`} ref={ref}>
      <button className="results__sort-btn" onClick={() => setOpen(!open)}>
        <span><span className="lbl">Ordenar:</span> {current.label}</span>
        <Icon.Chev />
      </button>
      <div className="results__sort-menu">
        {OPTIONS.map(o => (
          <button key={o.id} className={value === o.id ? 'is-active' : ''} onClick={() => { onChange(o.id); setOpen(false); }}>
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function GridIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>; }
function ListIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>; }

function Pager({ page, pages, onPage }) {
  const nums = [];
  for (let i = 1; i <= pages; i++) {
    if (i === 1 || i === pages || Math.abs(i - page) <= 1) nums.push(i);
    else if (i === 2 || i === pages - 1) nums.push('...');
  }
  const unique = nums.filter((n, i) => !(n === '...' && nums[i-1] === '...'));
  return (
    <div className="pager">
      <div className="pager__info">Página <strong>{page}</strong> de <strong>{pages}</strong></div>
      <div className="pager__nav">
        <button disabled={page === 1} onClick={() => onPage(page - 1)}>← Anterior</button>
        {unique.map((n, i) => n === '...'
          ? <span key={'d'+i} className="dots">···</span>
          : <button key={n} className={n === page ? 'is-active' : ''} onClick={() => onPage(n)}>{n}</button>
        )}
        <button disabled={page === pages} onClick={() => onPage(page + 1)}>Siguiente →</button>
      </div>
    </div>
  );
}

function Catalog({ onContact }) {
  const [filters, setFilters] = React.useState({
    brand: [], type: [], branch: [],
    year: [2017, 2023], price: [500000, 2000000], km: [0, 700000]
  });
  const [sort, setSort] = React.useState('relevant');
  const [view, setView] = React.useState('grid');
  const [page, setPage] = React.useState(1);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const perPage = 12;

  const parsedKm = (s) => parseInt(s.replace(/[,]/g, ''), 10);

  const filtered = React.useMemo(() => {
    let list = CAT_UNITS.filter(u => {
      if (filters.brand?.length && !filters.brand.includes(u.brand)) return false;
      if (filters.type?.length && !filters.type.includes(u.type)) return false;
      if (filters.branch?.length && !filters.branch.includes(u.branch)) return false;
      if (filters.year && (u.year < filters.year[0] || u.year > filters.year[1])) return false;
      if (filters.price && (u.price < filters.price[0] || u.price > filters.price[1])) return false;
      const km = parsedKm(u.km);
      if (filters.km && (km < filters.km[0] || km > filters.km[1])) return false;
      return true;
    });
    if (sort === 'price-asc') list.sort((a,b) => a.price - b.price);
    if (sort === 'price-desc') list.sort((a,b) => b.price - a.price);
    if (sort === 'year-desc') list.sort((a,b) => b.year - a.year);
    if (sort === 'year-asc') list.sort((a,b) => a.year - b.year);
    if (sort === 'km-asc') list.sort((a,b) => parsedKm(a.km) - parsedKm(b.km));
    return list;
  }, [filters, sort]);

  const pages = Math.max(1, Math.ceil(filtered.length / perPage));
  const current = filtered.slice((page - 1) * perPage, page * perPage);
  React.useEffect(() => { setPage(1); }, [filters, sort]);

  // Active chips
  const chips = [];
  (filters.brand || []).forEach(v => chips.push({ key: 'brand-' + v, label: v, remove: () => setFilters({ ...filters, brand: filters.brand.filter(x => x !== v) }) }));
  (filters.type || []).forEach(v => chips.push({ key: 'type-' + v, label: v, remove: () => setFilters({ ...filters, type: filters.type.filter(x => x !== v) }) }));
  (filters.branch || []).forEach(v => chips.push({ key: 'branch-' + v, label: v, remove: () => setFilters({ ...filters, branch: filters.branch.filter(x => x !== v) }) }));

  return (
    <>
      <section className="catalog">
        <div className="catalog__header">
          <div className="wrap">
            <nav className="catalog__crumbs">
              <a href="Selectrucks Zapata - Home.html">Inicio</a>
              <span className="sep">/</span>
              <span className="current">Inventario</span>
            </nav>
            <div className="catalog__header-row">
              <div>
                <h1>Inventario <em>completo</em></h1>
                <p><strong>{CAT_UNITS.length}</strong> unidades verificadas · <strong>9</strong> sucursales · Actualizado hoy</p>
              </div>
            </div>
          </div>
        </div>

        <div className="catalog__body">
          <div className="wrap">
            <div className="catalog__grid">
              <FiltersPanel
                filters={filters}
                setFilters={setFilters}
                mobileOpen={mobileOpen}
                onClose={() => setMobileOpen(false)}
                onApply={() => setMobileOpen(false)}
                resultCount={filtered.length}
              />

              <div className="results">
                <div className="results__toolbar">
                  <div className="results__count">
                    <strong>{filtered.length}</strong>
                    <span>resultados</span>
                  </div>
                  <div className="results__tools">
                    <SortDropdown value={sort} onChange={setSort} />
                    <div className="results__view">
                      <button className={view === 'grid' ? 'is-active' : ''} onClick={() => setView('grid')} aria-label="Cuadrícula"><GridIcon /></button>
                      <button className={view === 'list' ? 'is-active' : ''} onClick={() => setView('list')} aria-label="Lista"><ListIcon /></button>
                    </div>
                  </div>
                </div>

                {chips.length > 0 && (
                  <div className="results__active">
                    {chips.map(c => (
                      <span key={c.key} className="results__active-chip">
                        {c.label}
                        <button onClick={c.remove} aria-label="Quitar">×</button>
                      </span>
                    ))}
                  </div>
                )}

                {current.length === 0 ? (
                  <div style={{ padding: '80px 20px', textAlign: 'center', background: 'var(--graphite)' }}>
                    <Icon.Truck />
                    <h3 style={{ fontFamily: 'League Spartan', fontSize: 28, marginTop: 16 }}>Sin resultados</h3>
                    <p style={{ color: 'var(--fog)', marginTop: 8 }}>Ajusta los filtros para ver más unidades.</p>
                  </div>
                ) : (
                  <>
                    <div className={`catalog__cards ${view === 'list' ? 'is-list' : ''}`}>
                      {current.map(u => <UnitCard key={u.id} unit={u} onQuote={onContact} />)}
                    </div>
                    <Pager page={page} pages={pages} onPage={(p) => { setPage(p); window.scrollTo({ top: 0, behavior: 'smooth' }); }} />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <button className="mobile-filter-btn" onClick={() => setMobileOpen(true)}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
        Filtrar
        {chips.length > 0 && <span className="dot">{chips.length}</span>}
      </button>
    </>
  );
}

window.Catalog = Catalog;
