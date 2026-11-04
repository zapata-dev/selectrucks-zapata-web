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
- **Animación del Home:** las imágenes de `sitio/frames-camion-rojo/` se recorren al hacer scroll. Si cambia el
  número de imágenes, hay que actualizar `HERO_FRAME_COUNT` en `components-top.jsx`.
- **Datos:** sucursales, marcas, tipos e inventario están en `sitio/data.js`.
- **Tipografías:** Google Fonts (League Spartan, Poppins y JetBrains Mono).

## Cómo se monta

- **Diseño, textos e imágenes:** se respetan tal cual. El código les sirve de base y **pueden adaptarlo** para
  integrarlo a su sitio.
- **Inventario:** las unidades de `data.js` son una muestra para ver el diseño, con fotos de ejemplo, y la ficha
  de unidad existe solo para la Cascadia 2017. En el sitio publicado el inventario y las fichas salen de los datos
  reales de unidades.
- **Formularios:** son de demostración y no envían nada. En el sitio publicado necesitan un destino definido y,
  del lado del servidor, límite de envíos o CAPTCHA, validación y aviso de privacidad.
- **WhatsApp:** los botones abren una conversación con el número de SelecTrucks. Se confirma antes de publicar.

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
