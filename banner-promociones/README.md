# Banner de promociones y eventos (HTML, sin React)

Es el banner que va hasta arriba del Home, justo debajo del menú. Es el mismo que el componente `PromoBanner` de la
maqueta, pero hecho en HTML, CSS y JavaScript sin dependencias: no usa React, Babel, jQuery ni ninguna otra
librería.

- **Promoción especial:** 16 unidades en 10 modelos. Los artes pasan solos cada 2 segundos, con flechas,
  miniaturas y vista en grande.
- **Eventos:** la Gran Feria de Seminuevos en León (25 y 26 de noviembre). Se queda 6 segundos.
- **Botones:** abren Contacto con la sucursal, el motivo y el mensaje ya escritos.

Funciona en computadora y en celular, y cabe en una pantalla.

## Qué trae

| Archivo | Qué es |
|---|---|
| `index.html` | Página de muestra con el banner. |
| `banner-promociones.css` | Estilos. Todos están bajo la clase `.stz-promo`, así que no afectan al resto del sitio y el sitio no los afecta. |
| `banner-promociones.js` | Arma el banner y lo mueve. Textos, artes y la liga de Contacto están en la sección **CONFIGURACIÓN**, al inicio. |
| `assets/` | Los 11 artes en WebP: 10 de Promoción especial y 1 de Eventos. |

## Cómo verlo

Abre `index.html` con doble clic. Aquí, dentro de la maqueta, los botones abren el Contacto de la maqueta con los
campos ya llenos.

## Cómo ponerlo en el sitio

1. Copien `banner-promociones.css`, `banner-promociones.js` y la carpeta `assets/`.
2. En el `<head>` del Home:

   ```html
   <link href="https://fonts.googleapis.com/css2?family=League+Spartan:wght@400;600;700;800;900&family=Poppins:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
   <link rel="stylesheet" href="banner-promociones.css">
   ```

3. Donde va el banner, justo debajo del menú:

   ```html
   <section class="stz-promo" id="promociones" aria-label="Promociones y eventos"></section>
   ```

4. Al final del `<body>`:

   ```html
   <script src="banner-promociones.js"></script>
   ```

5. Si el menú del sitio queda fijo encima del contenido, díganle al banner cuánto mide, para que ocupe la pantalla
   debajo de él (80px es un ejemplo):

   ```html
   <section class="stz-promo" id="promociones" aria-label="Promociones y eventos" style="--stz-header-h: 80px; margin-top: 80px;"></section>
   ```

## Ajustes en `banner-promociones.js` (sección CONFIGURACIÓN)

- **`CONTACTO_URL`**: hoy apunta al Contacto de esta maqueta. Pongan la dirección de su página de Contacto.
- **`IMAGENES`**: se antepone a la ruta de cada arte. Déjenlo vacío si `assets/` va junto a la página. Si las
  imágenes van en otra carpeta, pongan esa carpeta.
- **`PROMO_ESPECIAL`, `EVENTOS` y `PROMOS`**: los textos, los artes y el número de unidades (`count: 16`).

## Botones y formulario de Contacto

Los botones llevan a Contacto con estos datos en la dirección:

- **«Me interesa esta unidad»:** `?sucursal=Guadalajara Otero&motivo=Promoción especial&mensaje=Hola, quiero conocer más sobre la unidad Cascadia 2017 de Zapata Guadalajara Zapopan que está en promoción especial.#formulario`
- **«Quiero asistir»:** `?sucursal=León&motivo=Gran Feria de Seminuevos#formulario`

Para que el formulario llegue lleno:

- El campo de sucursal tiene las opciones Guadalajara Otero, Tlalnepantla, Querétaro y León.
- El campo de motivo tiene dos opciones nuevas: «Promoción especial» y «Gran Feria de Seminuevos».
- El bloque del formulario lleva `id="formulario"`.
- Este script, en la página de Contacto, llena los campos. Cambien los `id` por los de su formulario:

  ```html
  <script>
    (function () {
      var q = new URLSearchParams(location.search);
      function poner(id, nombre) {
        var el = document.getElementById(id), v = q.get(nombre);
        if (el && v) el.value = v;
      }
      poner('cf-sucursal', 'sucursal');
      poner('cf-motivo', 'motivo');
      poner('cf-mensaje', 'mensaje');
    })();
  </script>
  ```

Las unidades de Zapopan dicen «Zapata Guadalajara Zapopan» en el arte y en el banner, y mandan «Guadalajara Otero»
al formulario: es su opción en el Contacto del sitio. Así el prospecto le llega a un vendedor de Zapopan y no a
Zapata Guadalajara.

## Importante

- **WhatsApp:** el botón de WhatsApp del sitio se queda como está hoy. Este banner no trae ni cambia ningún
  WhatsApp, y deja libre la esquina inferior derecha para el botón flotante.
- **Cambios en el banner:** esta versión es una copia del componente `PromoBanner`
  (`components-top.jsx` y `sections.css`). Si el banner de la maqueta cambia, hay que cambiar también esta.
