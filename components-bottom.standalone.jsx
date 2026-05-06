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
        {isFeatured && <img src={window.__resources.cascadia} alt="" />}
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
        <div className="trust__grid">
          <div className="trust__col">
            <div className="trust__num">70<em>años</em></div>
            <div className="trust__suffix">Respaldo Corporación Zapata</div>
            <h3 className="trust__title">Siete décadas<br/>moviendo México</h3>
            <p className="trust__body">Desde 1956, Corporación Zapata ha equipado al sector transporte del país. Selectrucks es nuestra plataforma de seminuevos verificados.</p>
            <a className="trust__link" href="#">Sobre Zapata <Icon.Arrow /></a>
          </div>
          <div className="trust__col">
            <div className="trust__num">150<em>pts</em></div>
            <div className="trust__suffix">Inspección técnica certificada</div>
            <h3 className="trust__title">Cada unidad,<br/>revisada a fondo</h3>
            <p className="trust__body">Motor, transmisión, diferenciales, frenos, sistema eléctrico, tren de rodaje. Si no pasa los 150 puntos, no entra al piso de Selectrucks.</p>
            <a className="trust__link" href="#">Ver checklist <Icon.Arrow /></a>
          </div>
          <div className="trust__col">
            <div className="trust__num">48<em>hrs</em></div>
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
  return (
    <section className="branches section-pad" id="sucursales">
      <div className="wrap">
        <div className="branches__head">
          <div>
            <div className="eyebrow" style={{ color: 'var(--red)', marginBottom: 16 }}>— Red nacional</div>
            <h2>10 sucursales <em>en todo México</em></h2>
          </div>
          <p style={{ color: 'var(--fog)', maxWidth: 420, fontSize: 15 }}>
            Visita la sucursal más cercana para inspeccionar tu unidad en persona o coordina una videollamada con un asesor.
          </p>
        </div>
        <div className="branches__layout">
          <div className="branches__list">
            {BRANCHES.map(b => (
              <button key={b.id}
                className={`branch ${sel.id === b.id ? 'is-active' : ''}`}
                onClick={() => setSel(b)}>
                <div>
                  <div className="branch__name">{b.name}</div>
                  <div className="branch__meta">
                    <span>{b.state}</span>
                    {b.flagship && <span>· Flagship</span>}
                  </div>
                </div>
                <div className="branch__count">{b.count}</div>
              </button>
            ))}
          </div>
          <aside className="branches__detail">
            <h3>{sel.name}</h3>
            <div className="loc"><Icon.Pin /> {sel.state}, México</div>
            <div className="branches__map" aria-hidden="true"></div>
            <div className="stats">
              <div>
                <strong>{sel.count}</strong>
                <span>Unidades en piso</span>
              </div>
              <div>
                <strong>{sel.flagship ? 'Flagship' : 'Sucursal'}</strong>
                <span>Tipo</span>
              </div>
            </div>
            <p style={{ fontSize: 13, color: 'var(--fog)', marginBottom: 20, fontFamily: 'JetBrains Mono, monospace' }}>
              {sel.hours}
            </p>
            <div className="contact">
              <a href={`tel:${sel.tel.replace(/\s/g,'')}`}><Icon.Phone /> {sel.tel}</a>
              <a href="https://wa.me/525598160234?text=Hola%2C%20quiero%20informaci%C3%B3n%20de%20unidades%20disponibles." target="_blank" rel="noopener noreferrer"><Icon.Wa /> WhatsApp</a>
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
            <img src={window.__resources.logo} alt="SelecTrucks | Zapata" />
            <p>El marketplace de camiones seminuevos verificados de Corporación Zapata. 70 años moviendo el transporte de carga en México.</p>
            <div className="footer__social">
              <a href="#" aria-label="Facebook"><Icon.Fb /></a>
              <a href="#" aria-label="Instagram"><Icon.Instagram /></a>
              <a href="#" aria-label="YouTube"><Icon.Yt /></a>
              <a href="#" aria-label="WhatsApp"><Icon.Wa /></a>
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
window.ContactModal = ContactModal;


