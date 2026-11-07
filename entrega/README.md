# SelecTrucks Zapata — sitio para publicar

Este es el rediseño del sitio de **SelecTrucks Zapata** (camiones seminuevos de Corporación Zapata), listo para que
Marketing lo monte en **selectruckszapata.com**. Es un sitio **estático**: páginas HTML, CSS, JavaScript e
imágenes, sin servidor de aplicación ni base de datos.

## Qué trae este repositorio

| Carpeta o archivo | Qué es |
|---|---|
| `sitio/` | El sitio completo: diseño, textos, imágenes y el código de las páginas. |

Las páginas son Home, Inventario (y su versión para imprimir), ficha de unidad (Cascadia 2017), Sucursales,
Financiamiento, Contacto y Nosotros. `sitio/index.html` redirige al Home.

## Cómo verlo

Las páginas cargan componentes en JSX, y los navegadores no los abren con doble clic (`file://`). Hace falta
servirlas por HTTP:

- **En tu computadora:** dentro de `sitio/`, corre `python -m http.server 8080` y abre http://localhost:8080.
- **En un servidor de pruebas:** sube el contenido de `sitio/` tal cual. Los archivos `.jsx` y `.js` deben
  servirse con `Content-Type: text/javascript`.

## Cómo está hecho

- **React 18 y Babel** se cargan desde unpkg.com, con `integrity`. Babel convierte el JSX en el navegador.
- **Banner del Home (promociones y eventos):** es lo primero que se ve y ocupa una pantalla. Los anuncios se
  editan en `PROMOS` de `components-top.jsx`; los artes están en `sitio/assets/promo-especial/` y
  `sitio/assets/eventos/`. Sus botones abren Contacto con la sucursal, el motivo y el mensaje ya llenos (por la
  dirección: `?sucursal=…&motivo=…&mensaje=…#formulario`).
- **El mismo banner sin React:** `sitio/banner-promociones/` lo trae en HTML, CSS y JavaScript simples, para
  ponerlo en un sitio que no usa React. Las instrucciones están en su `README.md`.
- **Datos:** sucursales, marcas, tipos e inventario están en `sitio/data.js`.
- **Tipografías:** Google Fonts (League Spartan, Poppins y JetBrains Mono).

## Cómo se monta

- **Diseño, textos e imágenes:** se respetan tal cual. El código les sirve de base y **pueden adaptarlo** para
  integrarlo a su sitio.
- **Qué aplica de esta entrega:** el banner del Home y los cambios de Contacto. El Inventario no cambia: el filtro
  de promoción (`?promo=especial`) y las fichas «por confirmar» de las unidades en promoción son solo de la maqueta.
- **Inventario:** las unidades de `data.js` son una muestra para ver el diseño, con fotos de ejemplo, y la ficha
  de unidad existe solo para la Cascadia 2017. En el sitio publicado el inventario y las fichas salen de los datos
  reales de unidades.
- **Formularios:** son de demostración y no envían nada. En el sitio publicado necesitan un destino definido y,
  del lado del servidor, límite de envíos o CAPTCHA, validación y aviso de privacidad.
- **WhatsApp:** se queda como está hoy en selectruckszapata.com. No lo reemplacen por los botones de WhatsApp de
  esta maqueta.

## Antes de publicar

- **Rendimiento:** para producción conviene compilar el JSX antes de subirlo y usar las versiones de producción
  de React (`react.production.min.js`), en lugar de las de desarrollo y Babel en el navegador.
- Una dirección de pruebas por **HTTPS**, para revisar que todo se vea igual y para que Ciberseguridad la escanee.

## Dudas

- **Diseño, contenido y número de WhatsApp:** Innovación y Tecnología, Corporación Zapata.

## Versiones nuevas

Este repositorio recibe una versión nueva cada vez que cambia el sitio, y cada versión reemplaza su contenido.
Hagan sus adaptaciones en su propia copia, no aquí; el historial de commits muestra qué cambió entre una versión
y otra.
