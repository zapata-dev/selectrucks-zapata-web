# Selectrucks Zapata â€” Prototipo Web v2

Prototipo interactivo del rediseÃ±o de [selectruckszapata.com](https://selectruckszapata.com) â€” CorporaciÃ³n Zapata, 10 sucursales en MÃ©xico.

## PÃ¡ginas

| PÃ¡gina | Archivo | Estado |
|--------|---------|--------|
| Home | `Selectrucks Zapata - Home.html` | Completo â€” GSAP hero, Trust 4 cols |
| Inventario | `Selectrucks Zapata - Inventario.html` | Completo â€” filtros, grid/list |
| Detalle de unidad | `Selectrucks Zapata - Cascadia 2017.html` | Completo â€” galerÃ­a lightbox |
| Sucursales | `Selectrucks Zapata - Sucursales.html` | Completo â€” mapa SVG MÃ©xico real |
| Financiamiento | `Selectrucks Zapata - Financiamiento.html` | Completo â€” calculadora Daimler |
| Contacto | `Selectrucks Zapata - Contacto.html` | Completo |
| Nosotros | `Selectrucks Zapata - Nosotros.html` | Completo â€” misiÃ³n/visiÃ³n/timeline |

## Stack

- **React 18** vÃ­a CDN (sin bundler â€” funciona directo desde archivo)
- **Babel Standalone** para JSX en el browser
- **GSAP 3.12.5** para animaciones (hero del Home)
- **CSS tokens propios** â€” `styles.css` + `sections.css` + `catalog.css` + `detail.css`
- **Google Fonts** â€” League Spartan Â· Poppins Â· JetBrains Mono

## CÃ³mo correr el proyecto localmente

Necesitas un servidor HTTP local (los navegadores bloquean JSX como `file://`):

```bash
# OpciÃ³n 1 â€” Python (recomendado, sin instalar nada extra)
cd "selectrucks-zapata web design/project"
python -m http.server 8080

# OpciÃ³n 2 â€” Node.js
npx serve .

# OpciÃ³n 3 â€” VS Code
# Instala la extensiÃ³n "Live Server" y haz click en "Go Live"
```

Abre: [http://localhost:8080](http://localhost:8080)

La URL raÃ­z redirige automÃ¡ticamente al Home.

## Estructura de archivos

```
project/
â”œâ”€â”€ index.html                          â† Redirect al Home
â”œâ”€â”€ Selectrucks Zapata - Home.html
â”œâ”€â”€ Selectrucks Zapata - Inventario.html
â”œâ”€â”€ Selectrucks Zapata - Cascadia 2017.html
â”œâ”€â”€ Selectrucks Zapata - Sucursales.html
â”œâ”€â”€ Selectrucks Zapata - Financiamiento.html
â”œâ”€â”€ Selectrucks Zapata - Contacto.html
â”œâ”€â”€ Selectrucks Zapata - Nosotros.html
â”‚
â”œâ”€â”€ styles.css          â† Tokens de diseÃ±o, reset, layout base
â”œâ”€â”€ sections.css        â† Estilos del hero y secciones del Home
â”œâ”€â”€ catalog.css         â† Estilos del inventario y filtros
â”œâ”€â”€ detail.css          â† Estilos de la pÃ¡gina de detalle de unidad
â”‚
â”œâ”€â”€ components-top.jsx  â† Navbar, Hero, SearchBar, secciÃ³n Inventario
â”œâ”€â”€ components-bottom.jsx â† Trust, Sucursales preview, CTA, Footer, Modal
â”œâ”€â”€ catalog.jsx         â† Componentes del catÃ¡logo completo
â”œâ”€â”€ detail.jsx          â† Componentes de la ficha de unidad
â”‚
â”œâ”€â”€ data.js             â† Datos de inventario, sucursales, constantes
â”‚
â””â”€â”€ assets/
    â”œâ”€â”€ logo-selectrucks.png
    â”œâ”€â”€ truck-cascadia-square.png
    â””â”€â”€ truck-cascadia-vertical.png
```

## Datos reales incluidos

- TelÃ©fonos de las 10 sucursales (desde zapata.com.mx)
- Tasas Daimler Financial Services â€” Plan Ãgil / Balance / Largo Plazo
- Checklist 65 puntos en 9 sistemas verificados
- GarantÃ­a Tren Motriz 90 dÃ­as (motor + transmisiÃ³n + cardÃ¡n + ejes)
- 70 aÃ±os de CorporaciÃ³n Zapata (desde 1956)
- Mapa SVG MÃ©xico con proyecciÃ³n geogrÃ¡fica real

## Pendiente â€” Fase 3

- [ ] Responsive / mobile (revisar breakpoints en las 7 pÃ¡ginas)
- [ ] Fotos reales de unidades (actualmente placeholders)
- [ ] Formulario de contacto â†’ backend (WhatsApp API / Salesforce / Zapier)
- [ ] Template genÃ©rico de detalle de unidad (no solo Cascadia 2017)
- [ ] Performance: lazy loading Â· optimizaciÃ³n de fuentes Google

## Activos de marca

Los PDFs de identidad visual y lineamientos estÃ¡n en Google Drive compartido con el equipo.
No se incluyen en este repositorio por tamaÃ±o.

---

Proyecto: CorporaciÃ³n Zapata Â· Selectrucks Â· 2026

