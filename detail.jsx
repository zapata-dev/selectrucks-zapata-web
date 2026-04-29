// Selectrucks Zapata — Unit detail page

const DETAIL_UNIT = {
  id: 999,
  brand: 'Freightliner',
  model: 'Cascadia 125',
  year: 2017,
  km: '480,000',
  engine: 'DD15 · 505hp',
  type: 'Tractocamión',
  price: 980000,
  monthly: 23100,
  branch: 'Tlalnepantla',
  featured: true,
  warranty: true,
  status: 'Disponible',
  vin: '3AKJGLD55HSHX1234',
  color: 'Blanco perla',
  transmission: 'Eaton Fuller 10 vel. manual',
  axles: '6x4',
  rearRatio: '3.42',
  fuelTank: '2 x 120 gal',
  suspension: 'Aire — Airliner',
  brakes: 'ABS Bendix · Disco',
  tires: 'Michelin 11R22.5 — 70%',
  fifthWheel: 'Fontaine 7000',
  sleeper: 'Cabina dormitorio 72"',
  torque: '1,850 lb-ft',
  emissions: 'EPA 2016',
};

function UnitDetail({ onContact }) {
  const u = DETAIL_UNIT;
  const [photo, setPhoto] = React.useState(0);
  const [lightbox, setLightbox] = React.useState(false);
  const totalPhotos = 6;
  const trackRef = React.useRef(null);

  const prev = () => setPhoto(p => (p - 1 + totalPhotos) % totalPhotos);
  const next = () => setPhoto(p => (p + 1) % totalPhotos);

  // Lightbox keyboard handler
  React.useEffect(() => {
    if (!lightbox) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setLightbox(false);
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [lightbox]);

  const scrollSimilar = (dir) => {
    if (!trackRef.current) return;
    trackRef.current.scrollBy({ left: dir * 340, behavior: 'smooth' });
  };

  const similarUnits = UNITS.filter(x => x.type === 'Tractocamión' && x.id !== u.id).slice(0, 6);

  const specSections = [
    {
      title: '◆ Identificación',
      rows: [
        ['VIN', u.vin],
        ['Marca', u.brand],
        ['Modelo', u.model],
        ['Año', u.year],
        ['Color', u.color],
        ['Tipo', u.type],
      ]
    },
    {
      title: '◆ Motor',
      rows: [
        ['Modelo motor', 'Detroit DD15'],
        ['Potencia', '505 hp'],
        ['Torque', u.torque],
        ['Emisiones', u.emissions],
        ['Combustible', 'Diésel'],
        ['Tanques', u.fuelTank],
      ]
    },
    {
      title: '◆ Transmisión y ejes',
      rows: [
        ['Transmisión', u.transmission],
        ['Configuración', u.axles],
        ['Relación trasera', u.rearRatio],
        ['Quinta rueda', u.fifthWheel],
        ['Suspensión', u.suspension],
        ['Frenos', u.brakes],
      ]
    },
    {
      title: '◆ Condición y uso',
      rows: [
        ['Kilometraje', u.km + ' km'],
        ['Llantas', u.tires],
        ['Cabina', u.sleeper],
        ['Mantenimientos', 'Al corriente'],
        ['Documentación', 'Completa'],
        ['Inspección', '150 pts · Aprobada'],
      ]
    },
  ];

  return (
    <section className="detail">
      <div className="detail__crumbs">
        <div className="wrap">
          <div className="detail__crumbs-inner">
            <a href="Selectrucks Zapata - Home.html">Inicio</a>
            <span className="sep">/</span>
            <a href="Selectrucks Zapata - Inventario.html">Inventario</a>
            <span className="sep">/</span>
            <a href="Selectrucks Zapata - Inventario.html">Tractocamión</a>
            <span className="sep">/</span>
            <span className="current">{u.brand} {u.model} {u.year}</span>
            <a href="Selectrucks Zapata - Inventario.html" className="back">
              ← Volver
            </a>
          </div>
        </div>
      </div>

      <div className="detail__layout">
        <div className="wrap">
          <div className="detail__grid">
            {/* Gallery */}
            <div className="gallery">
              <div className="gallery__main" onClick={() => setLightbox(true)}>
                {photo === 0 ? (
                  <img src="assets/truck-cascadia-square.png?v=2" alt={`${u.brand} ${u.model}`} />
                ) : (
                  <div className="gallery__main-placeholder">
                    <Icon.Truck />
                    <span>FOTO {photo + 1} · {u.brand.toUpperCase()}</span>
                  </div>
                )}
                <span className="gallery__badge">◆ Unidad destacada</span>
                <span className="gallery__counter">{photo + 1} / {totalPhotos}</span>
                <button className="gallery__nav gallery__nav--prev" onClick={(e) => { e.stopPropagation(); prev(); }} aria-label="Anterior">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"/></svg>
                </button>
                <button className="gallery__nav gallery__nav--next" onClick={(e) => { e.stopPropagation(); next(); }} aria-label="Siguiente">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                </button>
              </div>

              {/* Lightbox */}
              <div className={`lightbox ${lightbox ? 'is-open' : ''}`} onClick={() => setLightbox(false)}>
                <button className="lightbox__close" onClick={() => setLightbox(false)} aria-label="Cerrar">✕</button>
                {photo === 0 ? (
                  <img className="lightbox__img" src="assets/truck-cascadia-square.png?v=2" alt="" onClick={(e) => e.stopPropagation()} />
                ) : (
                  <div className="lightbox__img" onClick={(e) => e.stopPropagation()}>
                    <Icon.Truck />
                  </div>
                )}
                <button className="lightbox__nav lightbox__nav--prev" onClick={(e) => { e.stopPropagation(); prev(); }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"/></svg>
                </button>
                <button className="lightbox__nav lightbox__nav--next" onClick={(e) => { e.stopPropagation(); next(); }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                </button>
                <div className="lightbox__counter">{photo + 1} / {totalPhotos}</div>
              </div>
              <div className="gallery__thumbs">
                {[...Array(totalPhotos)].map((_, i) => (
                  <button key={i} className={`gallery__thumb ${photo === i ? 'is-active' : ''}`} onClick={() => setPhoto(i)}>
                    <span className="gallery__thumb-num">{i + 1}</span>
                    {i === 0 && <img src="assets/truck-cascadia-square.png?v=2" alt="" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Sidebar ficha */}
            <aside className="ficha">
              <span className="ficha__branch"><Icon.Pin /> Sucursal {u.branch}</span>
              <h1>{u.brand} {u.model}<span className="y">{u.year}</span></h1>
              <div className="ficha__chips">
                <span className="ficha__chip"><Icon.Gear />{u.year}</span>
                <span className="ficha__chip"><Icon.Gear />{u.km} km</span>
                <span className="ficha__chip"><Icon.Gear />{u.engine}</span>
              </div>

              <div className="ficha__price-block">
                <div className="ficha__price-label">Precio contado · IVA incluido</div>
                <div className="ficha__price">{fmtMXN(u.price)}</div>
                <div className="ficha__price-sub">
                  <span>o desde {fmtMXN(u.monthly)}/mes</span>
                  <strong>48 meses</strong>
                </div>
              </div>

              <div className="ficha__guarantees">
                <div className="ficha__guar">
                  <span className="ficha__guar-check"><Icon.Check /></span>
                  Garantía incluida
                </div>
                <div className="ficha__guar">
                  <span className="ficha__guar-check"><Icon.Check /></span>
                  Documentación completa
                </div>
                <div className="ficha__guar">
                  <span className="ficha__guar-check"><Icon.Check /></span>
                  Inspección 150 puntos aprobada
                </div>
              </div>

              <p className="ficha__pitch">
                Tractocamión ideal para larga distancia. Motor DD15 con mantenimientos al corriente. Lista para transferencia inmediata.
              </p>

              <div className="ficha__actions">
                <button className="ficha__cta" onClick={() => onContact(u)}>
                  Contactar asesor <Icon.Arrow />
                </button>
                <a className="ficha__cta ficha__cta--whatsapp"
                  href={`https://wa.me/5215555550101?text=Hola, me interesa el ${u.brand} ${u.model} ${u.year} (VIN: ${u.vin})`}
                  target="_blank" rel="noopener noreferrer">
                  <Icon.Wa /> WhatsApp directo
                </a>
                <button className="ficha__cta ficha__cta--outline" onClick={() => onContact(u)}>
                  Agendar visita
                </button>
              </div>

              <div className="ficha__mini">
                <a href={`tel:5555550101`}><Icon.Phone /> Llamar</a>
                <a href="#"><Icon.Wa /> WhatsApp</a>
                <a href="#"><Icon.Mail /> Email</a>
              </div>
            </aside>
          </div>

          {/* Specs table */}
          <div className="specs">
            <div className="specs__head">
              <h2>Ficha <em>técnica</em></h2>
              <p>Datos verificados · Última actualización: 20 abril 2026</p>
            </div>
            <div className="specs__grid">
              {specSections.map(sec => (
                <div className="specs__section" key={sec.title}>
                  <h3>{sec.title}</h3>
                  {sec.rows.map(([k, v]) => (
                    <div className="specs__row" key={k}>
                      <span className="k">{k}</span>
                      <span className="v">{v}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Similar */}
          <div className="similar">
            <div className="similar__head">
              <div>
                <div className="eyebrow" style={{ color: 'var(--red)', marginBottom: 12 }}>— También podrían interesarte</div>
                <h2>Unidades <em>similares</em></h2>
              </div>
              <div className="similar__nav">
                <button onClick={() => scrollSimilar(-1)} aria-label="Anterior">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"/></svg>
                </button>
                <button onClick={() => scrollSimilar(1)} aria-label="Siguiente">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                </button>
              </div>
            </div>
            <div className="similar__track" ref={trackRef}>
              {similarUnits.map(su => <UnitCard key={su.id} unit={su} onQuote={onContact} />)}
            </div>
          </div>
        </div>
      </div>
      {/* Mobile sticky CTA bar */}
      <div className="mobile-cta-bar">
        <div className="mobile-cta-bar__price">
          <span>Precio contado</span>
          <strong>{fmtMXN(u.price)}</strong>
        </div>
        <div className="mobile-cta-bar__actions">
          <button className="ficha__cta" style={{ padding: '14px 12px', fontSize: 13 }} onClick={() => onContact(u)}>
            Contactar <Icon.Arrow />
          </button>
          <a className="ficha__cta ficha__cta--whatsapp" style={{ padding: '14px 12px', fontSize: 13 }}
            href={`https://wa.me/5215555550101?text=Hola, me interesa el ${u.brand} ${u.model} ${u.year}`}
            target="_blank" rel="noopener noreferrer">
            <Icon.Wa /> WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}

window.UnitDetail = UnitDetail;
