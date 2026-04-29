# Selectrucks Zapata — Prototipo Web v2

Prototipo interactivo del rediseño de [selectruckszapata.com](https://selectruckszapata.com) — Corporación Zapata, 9 sucursales en México.

## Páginas

| Página | Archivo | Estado |
|--------|---------|--------|
| Home | `Selectrucks Zapata - Home.html` | Completo — GSAP hero, Trust 4 cols |
| Inventario | `Selectrucks Zapata - Inventario.html` | Completo — filtros, grid/list |
| Detalle de unidad | `Selectrucks Zapata - Cascadia 2017.html` | Completo — galería lightbox |
| Sucursales | `Selectrucks Zapata - Sucursales.html` | Completo — mapa SVG México real |
| Financiamiento | `Selectrucks Zapata - Financiamiento.html` | Completo — calculadora Daimler |
| Contacto | `Selectrucks Zapata - Contacto.html` | Completo |
| Nosotros | `Selectrucks Zapata - Nosotros.html` | Completo — misión/visión/timeline |

## Stack

- **React 18** vía CDN (sin bundler — funciona directo desde archivo)
- **Babel Standalone** para JSX en el browser
- **GSAP 3.12.5** para animaciones (hero del Home)
- **CSS tokens propios** — `styles.css` + `sections.css` + `catalog.css` + `detail.css`
- **Google Fonts** — League Spartan · Poppins · JetBrains Mono

## Cómo correr el proyecto localmente

Necesitas un servidor HTTP local (los navegadores bloquean JSX como `file://`):

```bash
# Opción 1 — Python (recomendado, sin instalar nada extra)
cd "selectrucks-zapata web design/project"
python -m http.server 8080

# Opción 2 — Node.js
npx serve .

# Opción 3 — VS Code
# Instala la extensión "Live Server" y haz click en "Go Live"
```

Abre: [http://localhost:8080](http://localhost:8080)

La URL raíz redirige automáticamente al Home.

## Estructura de archivos

```
project/
├── index.html                          ← Redirect al Home
├── Selectrucks Zapata - Home.html
├── Selectrucks Zapata - Inventario.html
├── Selectrucks Zapata - Cascadia 2017.html
├── Selectrucks Zapata - Sucursales.html
├── Selectrucks Zapata - Financiamiento.html
├── Selectrucks Zapata - Contacto.html
├── Selectrucks Zapata - Nosotros.html
│
├── styles.css          ← Tokens de diseño, reset, layout base
├── sections.css        ← Estilos del hero y secciones del Home
├── catalog.css         ← Estilos del inventario y filtros
├── detail.css          ← Estilos de la página de detalle de unidad
│
├── components-top.jsx  ← Navbar, Hero, SearchBar, sección Inventario
├── components-bottom.jsx ← Trust, Sucursales preview, CTA, Footer, Modal
├── catalog.jsx         ← Componentes del catálogo completo
├── detail.jsx          ← Componentes de la ficha de unidad
│
├── data.js             ← Datos de inventario, sucursales, constantes
│
└── assets/
    ├── logo-selectrucks.png
    ├── truck-cascadia-square.png
    └── truck-cascadia-vertical.png
```

## Datos reales incluidos

- Teléfonos de las 9 sucursales (desde zapata.com.mx)
- Tasas Daimler Financial Services — Plan Ágil / Balance / Largo Plazo
- Checklist 65 puntos en 9 sistemas verificados
- Garantía Tren Motriz 90 días (motor + transmisión + cardán + ejes)
- 70 años de Corporación Zapata (desde 1956)
- Mapa SVG México con proyección geográfica real

## Pendiente — Fase 3

- [ ] Responsive / mobile (revisar breakpoints en las 7 páginas)
- [ ] Fotos reales de unidades (actualmente placeholders)
- [ ] Formulario de contacto → backend (WhatsApp API / Salesforce / Zapier)
- [ ] Template genérico de detalle de unidad (no solo Cascadia 2017)
- [ ] Performance: lazy loading · optimización de fuentes Google

## Activos de marca

Los PDFs de identidad visual y lineamientos están en Google Drive compartido con el equipo.
No se incluyen en este repositorio por tamaño.

---

Proyecto: Corporación Zapata · Selectrucks · 2026
