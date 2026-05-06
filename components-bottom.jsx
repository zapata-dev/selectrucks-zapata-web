// Selectrucks Zapata — inventory cards, trust, branches, financing, process, CTA, footer, modal

function UnitCard({ unit, onQuote }) {
  const [fav, setFav] = React.useState(false);
  const isFeatured = unit.id === 1; // show real photo for Cascadia
  return (
    <article className="card" onClick={() => onQuote(unit)}>
      <div className="card__photo">
        {!isFeatured && (
          <>
            <div className="card__photo-bg"></div>
            <div className="card__photo-label">
              <Icon.Truck />
              <span>FOTO {unit.brand.toUpperCase()} {unit.model.toUpperCase()}</span>
            </div>
          </>
        )}
        {isFeatured && <img src="assets/truck-cascadia-square.png?v=2" alt="" />}
        <div className="card__badges">
          <span className="card__badge card__badge--red"><Icon.Pin /><span className="card__badge-txt">{unit.branch}</span></span>
          {unit.status === 'Oferta' && <span className="card__badge card__badge--warn">Oferta</span>}
          {unit.status === 'Nuevo ingreso' && <span className="card__badge card__badge--warn">Nuevo</span>}
          {unit.warranty && <span className="card__badge card__badge--icon" title="Garantía incluida"><Icon.Shield /></span>}
        </div>
        <button className={`card__fav ${fav ? 'is-fav' : ''}`} onClick={(e) => { e.stopPropagation(); setFav(!fav); }} aria-label="Guardar">
          <Icon.Heart filled={fav} />
        </button>
      </div>
      <div className="card__body">
        <h3 className="card__title">
          <span>{unit.brand} {unit.model}</span>
          <span className="year">{unit.year}</span>
        </h3>
        <div className="card__specs">
          <span>{unit.km} km</span>
          <span>{unit.engine}</span>
          <span>{unit.type}</span>
        </div>
        <div className="card__foot">
          <div className="card__price">
            <span className="card__price-label">Contado · incluye IVA</span>
            <strong>{fmtMXN(unit.price)}</strong>
            <small>o {fmtMXN(unit.monthly)} / mes · 48 meses</small>
          </div>
          <button className="card__btn" onClick={(e) => { e.stopPropagation(); onQuote(unit); }}>
            Ver detalles <span className="arrow"><Icon.Arrow /></span>
          </button>
        </div>
      </div>
    </article>
  );
}

function Inventory({ filters, setFilters, onQuote, filtered }) {
  const [tab, setTab] = React.useState('popular');
  const tabs = [
    { id: 'popular',  label: 'Las más buscadas', filter: u => u.featured || u.price < 1000000 },
    { id: 'new',      label: 'Nuevo ingreso',    filter: u => u.status === 'Nuevo ingreso' || u.year >= 2021 },
    { id: 'offer',    label: 'Ofertas',          filter: u => u.status === 'Oferta' || u.status === 'Nuevo ingreso' },
    { id: 'all',      label: 'Todas',            filter: () => true },
  ];
  const tabFiltered = filtered.filter(tabs.find(t => t.id === tab).filter);
  const visible = tabFiltered.slice(0, 6);
  const totalCount = filtered.length;

  return (
    <section className="inventory section-pad" id="inventario">
      <div className="wrap">
        <div className="inventory__head">
          <div>
            <div className="eyebrow" style={{ color: 'var(--red)', marginBottom: 16 }}>— Inventario</div>
            <h2>Las más <em>buscadas</em></h2>
          </div>
          <p>Unidades verificadas listas para entrega inmediata. Precios fijos, sin sorpresas. Mostrando <strong style={{color:'var(--white)'}}>{visible.length}</strong> de <strong style={{color:'var(--white)'}}>{totalCount}</strong> resultados.</p>
        </div>
        <div className="inventory__tabs">
          {tabs.map(t => (
            <button key={t.id} className={tab === t.id ? 'is-active' : ''} onClick={() => setTab(t.id)}>
              {t.label}
              <span className="count">{filtered.filter(t.filter).length}</span>
            </button>
          ))}
        </div>
        {visible.length === 0 ? (
          <div style={{ padding: '80px 20px', textAlign: 'center', background: 'var(--graphite)' }}>
            <Icon.Truck />
            <h3 style={{ fontFamily: 'League Spartan', fontSize: 28, marginTop: 16 }}>Sin coincidencias</h3>
            <p style={{ color: 'var(--fog)', marginTop: 8 }}>Prueba limpiar algunos filtros para ver más unidades.</p>
            <button className="btn btn--red" style={{ marginTop: 20 }} onClick={() => setFilters({})}>Limpiar filtros</button>
          </div>
        ) : (
          <div className="cards">
            {visible.map(u => <UnitCard key={u.id} unit={u} onQuote={onQuote} />)}
          </div>
        )}
        <div className="inventory__foot">
          <a className="btn btn--red btn--lg" href="#">
            Ver todo el inventario ({totalCount}) <Icon.Arrow />
          </a>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────── Trust
function Trust() {
  return (
    <section className="trust section-pad">
      <div className="wrap" style={{ maxWidth: 1400, padding: 0 }}>
        <div className="trust__grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
          <div className="trust__col">
            <div className="trust__num"><AnimatedCounter target={70} /><em>años</em></div>
            <div className="trust__suffix">Respaldo Corporación Zapata</div>
            <h3 className="trust__title">Siete décadas<br/>moviendo México</h3>
            <p className="trust__body">Desde 1956, Corporación Zapata ha equipado al sector transporte del país. Selectrucks es nuestra plataforma de seminuevos verificados.</p>
            <a className="trust__link" href="#">Sobre Zapata <Icon.Arrow /></a>
          </div>
          <div className="trust__col">
            <div className="trust__num"><AnimatedCounter target={65} /><em>pts</em></div>
            <div className="trust__suffix">Checklist · 9 sistemas verificados</div>
            <h3 className="trust__title">Cada unidad,<br/>revisada a fondo</h3>
            <p className="trust__body">Motor, transmisión, ejes, frenos, sistema neumático, luces y postratamiento. 65 puntos en 9 secciones antes de entrar al piso.</p>
            <a className="trust__link" href="#">Ver checklist <Icon.Arrow /></a>
          </div>
          <div className="trust__col">
            <div className="trust__num"><AnimatedCounter target={90} /><em>días</em></div>
            <div className="trust__suffix">Garantía Tren Motriz incluida</div>
            <h3 className="trust__title">Motor y transmisión<br/>respaldados</h3>
            <p className="trust__body">Cubrimos motor, transmisión, eje cardán y ejes traseros durante 90 días. Los sistemas que más importan, verificados y garantizados.</p>
            <a className="trust__link" href="#">Ver cobertura <Icon.Arrow /></a>
          </div>
          <div className="trust__col">
            <div className="trust__num"><AnimatedCounter target={48} /><em>hrs</em></div>
            <div className="trust__suffix">Financiamiento preaprobado</div>
            <h3 className="trust__title">Aprobación<br/>en dos días</h3>
            <p className="trust__body">Trabajamos con las principales financieras del país. Enganche desde 20%, plazos hasta 60 meses. Respuesta sin burocracia.</p>
            <a className="trust__link" href="#">Solicitar crédito <Icon.Arrow /></a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────── Branches
function Branches() {
  const [sel, setSel] = React.useState(BRANCHES[0]);
  const WA_NUM = '525598160234';
  const waMsg = encodeURIComponent(
    `Hola, me interesa visitar la sucursal ${sel.name} (${sel.state}) y conocer las unidades disponibles.`
  );
  return (
    <section className="branches section-pad" id="sucursales">
      <div className="wrap">
        <div className="branches__head">
          <div>
            <div className="eyebrow" style={{ color: 'var(--red)', marginBottom: 16 }}>— Red nacional</div>
            <h2>10 sucursales, <em>un solo estándar</em></h2>
          </div>
          <p className="branches__sub">
            Más de 300 unidades verificadas en 6 estados. Visita en persona o coordina una videollamada con el asesor de tu sucursal.
          </p>
        </div>
        <div className="branches__layout">
          <div className="branches__list">
            {BRANCHES.map(b => (
              <button key={b.id}
                className={`branch-item ${sel.id === b.id ? 'branch-item--active' : ''}`}
                onClick={() => setSel(b)}
                data-branch={b.id}>
                <div className="branch-item__info">
                  <div className="branch-item__name">{b.name}</div>
                  <div className="branch-item__state">
                    <span>{b.state}</span>
                    {b.flagship && <span className="branch-item__flag">· Flagship</span>}
                  </div>
                </div>
                <div className="branch-item__count-wrap">
                  <div className="branch-item__num">{b.count}</div>
                  <div className="branch-item__unit">unidades</div>
                </div>
              </button>
            ))}
          </div>
          <aside className="branches__detail">
            <div className="branches__detail-header">
              <h3>{sel.name}</h3>
              <div className="branches__loc"><Icon.Pin /> {sel.state}, México</div>
            </div>
            <div className="branches__map" aria-label={`Zona de cobertura — ${sel.name}`}>
              <span className="branches__map-label">{sel.name}<br />{sel.state}</span>
            </div>
            <div className="branches__stats">
              <div className="branches__stat">
                <strong>{sel.count}</strong>
                <span>Unidades disponibles</span>
              </div>
              <div className="branches__stat">
                <strong>{sel.flagship ? 'Flagship' : 'Sucursal'}</strong>
                <span>Tipo de sede</span>
              </div>
            </div>
            <p className="branches__hours">{sel.hours}</p>
            <div className="branches__actions">
              <a
                href={`/inventario?sucursal=${sel.id}`}
                className="btn btn--red branches__cta-inv"
                data-branch={sel.id}
                data-action="ver-inventario-sucursal">
                Ver unidades en {sel.name}
              </a>
              <div className="branches__contact">
                <a href={`tel:${sel.tel.replace(/\s/g,'')}`}
                   className="branches__tel"
                   data-branch={sel.id}>
                  <Icon.Phone /> {sel.tel}
                </a>
                <a href={`https://wa.me/${WA_NUM}?text=${waMsg}`}
                   className="branches__wa"
                   target="_blank"
                   rel="noopener noreferrer"
                   data-branch={sel.id}
                   data-action="whatsapp-sucursal">
                  <Icon.Wa /> WhatsApp
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────── Financing strip with calc
function FinStrip() {
  const [price, setPrice] = React.useState(1200000);
  const [down, setDown] = React.useState(25);
  const [term, setTerm] = React.useState(48);
  const rate = 0.145; // 14.5% annual example
  const loan = price * (1 - down / 100);
  const monthlyRate = rate / 12;
  const monthly = (loan * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -term));
  const downPay = price * (down / 100);

  return (
    <section className="finstrip" id="financiamiento">
      <div className="wrap finstrip__inner">
        <div>
          <div className="eyebrow" style={{ opacity: 0.85, marginBottom: 16 }}>— Financiamiento</div>
          <h2>Llévate tu unidad en <em>48 horas</em> o menos.</h2>
          <p>Enganche desde 20% · plazos de 12 a 60 meses · sin comisión por apertura para clientes Zapata. Cotización ilustrativa, sujeta a aprobación de crédito.</p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a className="btn btn--dark btn--lg" href="#">Solicitar crédito <Icon.Arrow /></a>
            <a className="btn btn--ghost btn--lg" href="#" style={{ color: 'var(--white)', borderColor: 'var(--white)' }}>Ver requisitos</a>
          </div>
        </div>
        <div className="finstrip__calc">
          <h4>◆ Calculadora rápida</h4>
          <div className="finstrip__control">
            <div className="finstrip__control-head">
              <label>Precio de la unidad</label>
              <span className="val">{fmtMXN(price)}</span>
            </div>
            <input type="range" className="finstrip__slider" min={500000} max={2500000} step={10000} value={price} onChange={(e)=>setPrice(+e.target.value)} />
          </div>
          <div className="finstrip__control">
            <div className="finstrip__control-head">
              <label>Enganche</label>
              <span className="val">{down}% · {fmtMXN(downPay)}</span>
            </div>
            <input type="range" className="finstrip__slider" min={20} max={60} step={5} value={down} onChange={(e)=>setDown(+e.target.value)} />
          </div>
          <div className="finstrip__control">
            <div className="finstrip__control-head">
              <label>Plazo</label>
              <span className="val">{term} meses</span>
            </div>
            <div className="finstrip__terms">
              {[12, 24, 36, 48, 60].map(t => (
                <button key={t} className={term === t ? 'is-active' : ''} onClick={() => setTerm(t)}>{t}</button>
              ))}
            </div>
          </div>
          <div className="finstrip__row finstrip__row--total">
            <label>Mensualidad estimada</label>
            <span className="val">{fmtMXNnoDec(monthly)}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────── Process
function Process() {
  const steps = [
    { n: '01', t: 'Encuentra tu unidad', p: 'Filtra por marca, tipo, precio o sucursal. 306 unidades verificadas en piso.' },
    { n: '02', t: 'Agenda inspección',   p: 'Visita la sucursal o coordina videollamada con un asesor. Ve la unidad en persona.' },
    { n: '03', t: 'Aprobación 48 hrs',   p: 'Llenas el formulario, enviamos a financiera. Respuesta en menos de dos días.' },
    { n: '04', t: 'Manéjalo',            p: 'Entrega con documentación, placas y garantía. Salida lista para trabajar.' },
  ];
  return (
    <section className="process section-pad">
      <div className="wrap">
        <div className="eyebrow" style={{ color: 'var(--red)', marginBottom: 16 }}>— Cómo funciona</div>
        <h2>De la búsqueda al <em>volante</em>,<br/>en cuatro pasos.</h2>
        <div className="process__steps">
          {steps.map(s => (
            <div className="process__step" key={s.n}>
              <div className="num">{s.n}<small>/04</small></div>
              <h4>{s.t}</h4>
              <p>{s.p}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────── CTA strip
function CTAStrip({ onContact }) {
  return (
    <section className="ctastrip">
      <div className="wrap ctastrip__inner">
        <h2>¿Listo para encontrar tu próximo <em>camión</em>?</h2>
        <div className="ctastrip__actions">
          <a className="btn btn--red btn--lg" href="#inventario" onClick={(e)=>{ e.preventDefault(); document.getElementById('inventario').scrollIntoView({behavior:'smooth'}); }}>Ver inventario <Icon.Arrow /></a>
          <button className="btn btn--ghost btn--lg" onClick={onContact}>Hablar con asesor</button>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────── Footer
function Footer() {
  return (
    <footer className="footer" id="contacto">
      <div className="wrap">
        <div className="footer__grid">
          <div className="footer__logo">
            <img src="assets/logo-selectrucks.png" alt="SelecTrucks | Zapata" />
            <p>El marketplace de camiones seminuevos verificados de Corporación Zapata. 70 años moviendo el transporte de carga en México.</p>
            <div className="footer__social">
              <a href="#" aria-label="Facebook"><Icon.Fb /></a>
              <a href="#" aria-label="Instagram"><Icon.Instagram /></a>
              <a href="#" aria-label="YouTube"><Icon.Yt /></a>
              <a href="https://wa.me/525598160234?text=Hola%2C%20quiero%20informaci%C3%B3n%20de%20unidades%20disponibles." target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><Icon.Wa /></a>
            </div>
          </div>
          <div className="footer__col">
            <h5>Explorar</h5>
            <ul>
              <li><a href="#inventario">Inventario completo</a></li>
              <li><a href="#">Unidades destacadas</a></li>
              <li><a href="#">Ofertas</a></li>
              <li><a href="#">Nuevo ingreso</a></li>
              <li><a href="#financiamiento">Financiamiento</a></li>
            </ul>
          </div>
          <div className="footer__col">
            <h5>Compañía</h5>
            <ul>
              <li><a href="#">Sobre Zapata</a></li>
              <li><a href="#sucursales">Sucursales</a></li>
              <li><a href="#">Inspección 150 pts</a></li>
              <li><a href="#">Garantía</a></li>
              <li><a href="#">Trabaja con nosotros</a></li>
            </ul>
          </div>
          <div className="footer__col">
            <h5>Contacto</h5>
            <ul className="footer__contact">
              <li><Icon.Wa /><div><strong><a href="https://wa.me/525598160234?text=Hola%2C%20quiero%20informaci%C3%B3n%20de%20unidades%20disponibles." target="_blank" rel="noopener noreferrer">Asesor por WhatsApp 24/7</a></strong>L-V 9:00 - 18:00</div></li>
              <li><Icon.Mail /><div><strong>hola@selectruckszapata.com</strong>Respuesta en 4 hrs</div></li>
              <li><Icon.Wa /><div><strong><a href="https://wa.me/525598160234?text=Hola%2C%20quiero%20informaci%C3%B3n%20de%20unidades%20disponibles." target="_blank" rel="noopener noreferrer">+52 55 9816 0234</a></strong>WhatsApp · 24/7</div></li>
            </ul>
          </div>
        </div>
        <div className="footer__bottom">
          <span>© 2026 CORPORACIÓN ZAPATA S.A. DE C.V. · TODOS LOS DERECHOS RESERVADOS</span>
          <div className="footer__bottom-links">
            <a href="#">Aviso de privacidad</a>
            <a href="#">Términos</a>
            <a href="#">Cookies</a>
            <a href="#">Mapa del sitio</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─────────────────────────────────────────────────────────── Contact modal
function ContactModal({ open, onClose, unit, onSubmit }) {
  const [form, setForm] = React.useState({ name: '', phone: '', email: '', branch: 'Tlalnepantla', msg: '' });
  React.useEffect(() => { if (open) setForm(f => ({ ...f, msg: unit ? `Me interesa la unidad: ${unit.brand} ${unit.model} ${unit.year} · ${fmtMXN(unit.price)}` : '' })); }, [open, unit]);
  const submit = (e) => {
    e.preventDefault();
    onSubmit();
    onClose();
  };
  return (
    <div className={`modal-backdrop ${open ? 'is-open' : ''}`} onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal__close" onClick={onClose}><Icon.Close /></button>
        <div className="eyebrow" style={{ color: 'var(--red)', marginBottom: 12 }}>— {unit ? 'Solicitar unidad' : 'Hablar con asesor'}</div>
        <h3>{unit ? <>Cotizar <em>{unit.brand} {unit.model}</em></> : <>Un asesor te <em>contacta</em></>}</h3>
        <p className="sub">Respuesta garantizada en menos de 4 horas hábiles. Sin compromiso.</p>
        <form className="modal__form" onSubmit={submit}>
          <div className="modal__field">
            <label>Nombre completo</label>
            <input required value={form.name} onChange={(e)=>setForm({...form, name: e.target.value})} placeholder="Juan Pérez" />
          </div>
          <div className="modal__row">
            <div className="modal__field">
              <label>Teléfono</label>
              <input required type="tel" value={form.phone} onChange={(e)=>setForm({...form, phone: e.target.value})} placeholder="55 1234 5678" />
            </div>
            <div className="modal__field">
              <label>Correo</label>
              <input required type="email" value={form.email} onChange={(e)=>setForm({...form, email: e.target.value})} placeholder="tu@email.com" />
            </div>
          </div>
          <div className="modal__field">
            <label>Sucursal de interés</label>
            <select value={form.branch} onChange={(e)=>setForm({...form, branch: e.target.value})}>
              {BRANCHES.map(b => <option key={b.id} value={b.name}>{b.name} · {b.state}</option>)}
            </select>
          </div>
          <div className="modal__field">
            <label>Mensaje</label>
            <textarea value={form.msg} onChange={(e)=>setForm({...form, msg: e.target.value})} placeholder="¿Qué tipo de unidad buscas?" />
          </div>
          <button type="submit" className="btn btn--red btn--lg" style={{ marginTop: 8 }}>
            Enviar solicitud <Icon.Arrow />
          </button>
          <p style={{ fontSize: 11, color: 'var(--ash)', fontFamily: 'JetBrains Mono, monospace', textAlign: 'center', marginTop: 8 }}>
            Al enviar aceptas nuestro aviso de privacidad
          </p>
        </form>
      </div>
    </div>
  );
}

window.Inventory = Inventory;
window.Trust = Trust;
window.Branches = Branches;
window.FinStrip = FinStrip;
window.Process = Process;
window.CTAStrip = CTAStrip;
window.Footer = Footer;

// ─── WhatDefinesUs — Confianza antes de arrancar ─────────────────────────────
function WhatDefinesUs() {
  const pillars = [
    {
      stat: '65',
      unit: 'Puntos de inspección',
      title: '65 Puntos de Inspección',
      body: 'Revisamos sistemas clave para que tomes una decisión con mayor certeza desde el primer contacto.',
    },
    {
      stat: '90',
      unit: 'Días garantía tren motriz',
      title: '90 Días en Tren Motriz',
      body: 'Garantía incluida en componentes clave del tren motriz para que arranques con mayor tranquilidad.',
    },
    {
      icon: (<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>),
      title: 'Respaldo Corporación Zapata',
      body: 'Compra con el respaldo de una empresa con trayectoria en vehículos comerciales y atención profesional.',
    },
    {
      icon: (<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>),
      title: 'Asesoría y Financiamiento',
      body: 'Te orientamos para encontrar la unidad adecuada y conocer alternativas de financiamiento sujetas a aprobación.',
    },
  ];

  return (
    <section className="what-defines section-pad">
      <div className="wrap">
        <div className="what-defines__header">
          <div className="eyebrow" style={{ color: 'var(--red)', marginBottom: 18 }}>Confianza antes de arrancar</div>
          <h2>Respaldo que se nota <em>en cada unidad</em></h2>
          <p className="what-defines__sub">
            Camiones seminuevos listos para trabajar, con inspección previa, garantía en tren motriz y el respaldo de Corporación Zapata.
          </p>
        </div>
        <div className="what-defines__grid">
          {pillars.map((p, i) => (
            <div className={`what-defines__card${p.stat ? ' what-defines__card--stat' : ''}`} key={i}>
              {p.stat ? (
                <div className="what-defines__statblock">
                  <span className="what-defines__num">{p.stat}</span>
                  <span className="what-defines__unit">{p.unit}</span>
                </div>
              ) : (
                <div className="what-defines__icon">{p.icon}</div>
              )}
              <h4>{p.title}</h4>
              <p>{p.body}</p>
            </div>
          ))}
        </div>
        <div className="what-defines__footer">
          <p className="what-defines__note">Condiciones aplicables según unidad. Consulta términos con tu asesor.</p>
          <a href="Selectrucks%20Zapata%20-%20Inventario.html" className="btn btn--ghost">
            Ver unidades disponibles <Icon.Arrow />
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── ZapataSupport — Respaldo Corporación Zapata ─────────────────────────────
function ZapataSupport() {
  return (
    <section className="zapata-support section-pad">
      <div className="wrap">
        <div className="zapata-support__inner">
          <div className="zapata-support__text">
            <div className="eyebrow" style={{ color: 'var(--red)', marginBottom: 18 }}>El respaldo detrás de Selectrucks</div>
            <h2>70 años respaldando al <em>transporte en México</em></h2>
            <p>Desde 1956, Corporación Zapata ha sido parte del desarrollo del transporte y la movilidad en México. Con décadas de experiencia y presencia nacional, Selectrucks nace como la plataforma de camiones seminuevos que combina disponibilidad, confianza y respaldo institucional.</p>
            <p>Detrás de cada unidad hay una empresa con trayectoria, estructura comercial y visión de largo plazo para acompañar a transportistas y empresas en una compra más segura.</p>
            <a href="Selectrucks%20Zapata%20-%20Nosotros.html" className="btn btn--ghost" style={{ marginTop: 32 }}>
              Conoce nuestra historia <Icon.Arrow />
            </a>
          </div>
          <div className="zapata-support__visual">
            <div className="zapata-support__img-frame">
              <img
                src="assets/Edificio Zapata.jpeg"
                alt="Sede corporativa de Corporación Zapata"
                className="zapata-support__img"
              />
              <div className="zapata-support__img-overlay" aria-hidden="true" />
              <div className="zapata-support__caption">
                <span className="zapata-support__caption-label">Corporación Zapata</span>
                <span className="zapata-support__caption-sub">Desde 1956 · Sede corporativa</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── StatsBanner — 4 datos animados ──────────────────────────────────────────
function StatsBanner() {
  const stats = [
    { target: 70, suffix: ' años', label: 'Trayectoria Corporación Zapata' },
    { target: 65, suffix: ' pts', label: 'Puntos de inspección por unidad' },
    { target: 90, suffix: ' días', label: 'Garantía Tren Motriz incluida' },
    { target: BRANCHES.length,  suffix: '', label: 'Sucursales en México' },
  ];
  return (
    <section className="stats-banner">
      <div className="wrap">
        <div className="stats-banner__grid">
          {stats.map((s, i) => (
            <div className="stats-banner__item" key={i}>
              <div className="stats-banner__num">
                <AnimatedCounter target={s.target} suffix={s.suffix} />
              </div>
              <div className="stats-banner__label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── HomeFeaturedCard — card compacta para home ───────────────────────────────
function HomeFeaturedCard({ unit, onQuote }) {
  const handleDetail = (e) => { e.preventDefault(); onQuote(unit); };
  return (
    <article
      className="hfc"
      data-event="unit_view"
      data-unit-id={unit.id}
      data-unit-model={`${unit.brand} ${unit.model}`}
      data-branch={unit.branch}
    >
      <div className="hfc__img-wrap">
        {unit.image ? (
          <img
            src={unit.image}
            alt={`${unit.brand} ${unit.model} ${unit.year}`}
            className="hfc__img"
            loading="lazy"
          />
        ) : (
          <div className="hfc__img-placeholder">
            <Icon.Truck />
            <span>{unit.brand} {unit.model}</span>
          </div>
        )}
        <div className="hfc__badges">
          <span className="hfc__badge hfc__badge--branch">
            <Icon.Pin />{unit.branch}
          </span>
          {unit.status === 'Nuevo ingreso' && <span className="hfc__badge hfc__badge--new">Nuevo</span>}
          {unit.status === 'Oferta' && <span className="hfc__badge hfc__badge--offer">Oferta</span>}
          {unit.warranty && (
            <span className="hfc__badge hfc__badge--warranty" title="Garantía tren motriz incluida">
              <Icon.Shield />
            </span>
          )}
        </div>
      </div>
      <div className="hfc__body">
        <div className="hfc__title">
          <span className="hfc__brand">{unit.brand} {unit.model}</span>
          <span className="hfc__year">{unit.year}</span>
        </div>
        <div className="hfc__specs">
          <span>{unit.km} km</span>
          <span>{unit.engine}</span>
          <span>{unit.type}</span>
        </div>
        <div className="hfc__price-row">
          <div className="hfc__price">
            <span className="hfc__price-label">Contado · IVA incluido</span>
            <strong>{fmtMXN(unit.price)}</strong>
            <small>desde {fmtMXN(unit.monthly)} / mes</small>
          </div>
          <a
            className="hfc__cta"
            href="#"
            onClick={handleDetail}
            data-event="unit_detail_click"
            data-source="home_featured_units"
          >
            Ver detalles <Icon.Arrow />
          </a>
        </div>
      </div>
    </article>
  );
}

// ─── FeaturedUnits — Unidades más buscadas ───────────────────────────────────
function FeaturedUnits({ onQuote }) {
  const featured = UNITS.filter(u => u.featured).slice(0, 3);
  return (
    <section className="featured-units section-pad">
      <div className="wrap">
        <div className="featured-units__header">
          <div className="eyebrow" style={{ color: 'var(--red)', marginBottom: 18 }}>Inventario destacado</div>
          <h2>Unidades más <em>buscadas</em></h2>
          <p className="featured-units__sub">Unidades listas para trabajar, con disponibilidad y respaldo Selectrucks Zapata.</p>
        </div>
        <div className="featured-units__grid">
          {featured.map(u => <HomeFeaturedCard key={u.id} unit={u} onQuote={onQuote} />)}
        </div>
        <div className="featured-units__foot">
          <a
            href="Selectrucks%20Zapata%20-%20Inventario.html"
            className="btn btn--ghost"
            data-event="inventory_click"
            data-source="home_featured_units"
          >
            Ver inventario completo <Icon.Arrow />
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── WhatsAppCTA — botón flotante persistente ────────────────────────────────
// Reemplazar WHATSAPP_NUMBER por el número oficial del chatbot Juan Martínez
const WHATSAPP_NUMBER = '525598160234';
const WHATSAPP_MSG = encodeURIComponent(
  'Hola, estoy buscando un camión seminuevo. ¿Me pueden ayudar a encontrar una unidad disponible en Selectrucks Zapata?'
);
function WhatsAppCTA() {
  return (
    <a
      className="whatsapp-cta"
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      data-event="whatsapp_click"
      data-source="floating_home_cta"
      data-intent="general_inventory"
    >
      <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    </a>
  );
}

window.WhatDefinesUs = WhatDefinesUs;
window.ZapataSupport = ZapataSupport;
window.StatsBanner = StatsBanner;
window.FeaturedUnits = FeaturedUnits;
window.WhatsAppCTA = WhatsAppCTA;
window.ContactModal = ContactModal;


