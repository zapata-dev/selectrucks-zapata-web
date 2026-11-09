/* ==========================================================================
   SelecTrucks Zapata · Banner de promociones y eventos
   JavaScript sin dependencias. Arma el banner dentro de:
     <section class="stz-promo" id="promociones" aria-label="Promociones y eventos"></section>

   Para cambiar textos, artes o la liga de Contacto, edita solo la sección CONFIGURACIÓN.
   ========================================================================== */
(function () {
  'use strict';

  /* ───────────────────────────── CONFIGURACIÓN ───────────────────────────── */

  // Página de Contacto. Los botones le agregan ?sucursal=…&motivo=…&mensaje=…#formulario para que el
  // formulario llegue ya lleno (ver README.md). Aquí apunta al Contacto de la maqueta, para probarlo completo;
  // en el sitio publicado, pongan la dirección de su página de Contacto.
  var CONTACTO_URL = '../Selectrucks%20Zapata%20-%20Contacto.html';

  // Se antepone a la ruta de cada imagen. Vacío: las rutas son relativas a la página donde va el banner.
  // Si suben las imágenes a otro lado, pongan aquí esa carpeta (por ejemplo '/static/banner/').
  var IMAGENES = '';

  // Tiempos del carrusel (milisegundos)
  var TIEMPO_POR_ARTE = 2000;     // cada arte de Promoción especial
  var TIEMPO_POR_ANUNCIO = 6000;  // anuncios de un solo arte (Eventos)

  // Promoción especial: un renglón por arte.
  // branch: la sucursal como la dice el arte · form: su nombre en el formulario de Contacto, solo si es distinto.
  // Las de Zapopan van a «Guadalajara Otero», su opción en el Contacto del sitio, para que el prospecto le llegue a
  // un vendedor de Zapopan («Guadalajara» es otra sucursal, la de R. Michel).
  var PROMO_ESPECIAL = [
    { name: 'Cascadia 2017',         branch: 'Guadalajara Zapopan', form: 'Guadalajara Otero', file: 'assets/promo-especial/01-cascadia-2017-zapopan.webp' },
    { name: 'Cascadia 2017',         branch: 'Tlalnepantla',                                   file: 'assets/promo-especial/02-cascadia-2017-tlalnepantla.webp' },
    { name: 'Cascadia 2012',         branch: 'Guadalajara Zapopan', form: 'Guadalajara Otero', file: 'assets/promo-especial/03-cascadia-2012-zapopan.webp' },
    { name: 'Cascadia 2021',         branch: 'Guadalajara Zapopan', form: 'Guadalajara Otero', file: 'assets/promo-especial/04-cascadia-2021-zapopan.webp' },
    { name: 'LT Hi Rise Euro 2022',  branch: 'Guadalajara Zapopan', form: 'Guadalajara Otero', file: 'assets/promo-especial/05-lt-hi-rise-euro-2022-zapopan.webp' },
    { name: 'VNL64T 2019',           branch: 'Guadalajara Zapopan', form: 'Guadalajara Otero', file: 'assets/promo-especial/06-vnl64t-2019-zapopan.webp' },
    { name: 'Cascadia 2018',         branch: 'Guadalajara Zapopan', form: 'Guadalajara Otero', file: 'assets/promo-especial/07-cascadia-2018-zapopan.webp' },
    { name: 'Cascadia 2020',         branch: 'Querétaro',                                      file: 'assets/promo-especial/08-cascadia-2020-queretaro.webp' },
    { name: 'Caja refrigerada 2019', branch: 'León',                                           file: 'assets/promo-especial/09-caja-refrigerada-2019-leon.webp' },
    { name: 'Cascadia 2016',         branch: 'Tlalnepantla',                                   file: 'assets/promo-especial/10-cascadia-2016-tlalnepantla.webp' }
  ];

  var EVENTOS = [
    {
      name: 'Gran Feria de Seminuevos',
      branch: 'León',
      file: 'assets/eventos/gran-feria-seminuevos-leon.webp',
      alt: 'Gran Feria de Seminuevos, 25 y 26 de noviembre en Agencia Zapata Camiones León. Desde 0% de enganche y tasa desde 9% anual. ' +
           'Arrendamiento financiero con Financiera Daimler Truck, con tasa fija anual del 9% a un plazo de 12 meses. ' +
           'Sujeto a aprobación y condiciones de la financiera.'
    }
  ];

  function sucursales(lista) {
    var vistas = {};
    lista.forEach(function (a) { vistas[a.branch] = true; });
    return Object.keys(vistas).length;
  }

  // Pestañas del banner, en orden. type: 'promo' (panel rojo) · 'evento' (panel lima) · 'anuncio' (panel blanco)
  var PROMOS = [
    {
      type: 'promo',
      tab: 'Promoción especial',
      tabSub: 'Precio especial',
      label: 'Promoción especial',
      gallery: PROMO_ESPECIAL,
      // Unidades disponibles: algunos modelos tienen más de una, así que no es el número de artes
      count: 16,
      countLabel: 'unidades en precio especial',
      desc: PROMO_ESPECIAL.length + ' modelos de tractocamiones y cajas refrigeradas en ' + sucursales(PROMO_ESPECIAL) + ' sucursales.',
      text: 'Hasta agotar existencias',
      cta: 'Me interesa esta unidad',
      // El botón lleva a Contacto con la sucursal, el motivo y un mensaje de la unidad que se está viendo
      hrefFor: function (a) {
        return contacto({
          sucursal: a.form || a.branch,
          motivo: 'Promoción especial',
          mensaje: 'Hola, quiero conocer más sobre la unidad ' + a.name + ' de Zapata ' + a.branch + ' que está en promoción especial.'
        });
      }
    },
    {
      type: 'evento',
      tab: 'Eventos',
      tabSub: '25 y 26 de noviembre',
      label: 'Evento',
      gallery: EVENTOS,
      title: 'Gran Feria de Seminuevos',
      text: '25 y 26 de noviembre · Zapata Camiones León',
      perks: ['Desde 0% de enganche', 'Tasa desde 9% anual'],
      meta: 'Blvd. Aeropuerto 868, León, Gto.',
      // Leyenda del financiamiento, tal como viene en el arte
      legal: 'Arrendamiento financiero con Financiera Daimler Truck, con tasa fija anual del 9% a un plazo de 12 meses. ' +
             'Sujeto a aprobación y condiciones de la financiera. Consulta requisitos y detalles con tu asesor.',
      cta: 'Quiero asistir',
      href: function () { return contacto({ sucursal: 'León', motivo: 'Gran Feria de Seminuevos' }); }
    }
  ];

  /* ─────────────────────────── FIN DE LA CONFIGURACIÓN ─────────────────────────── */

  function contacto(params) {
    var q = Object.keys(params).map(function (k) {
      return encodeURIComponent(k) + '=' + encodeURIComponent(params[k]);
    }).join('&');
    return CONTACTO_URL + (CONTACTO_URL.indexOf('?') >= 0 ? '&' : '?') + q + '#formulario';
  }

  var ICON = {
    arrow: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>',
    pin: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
    close: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
    search: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>'
  };

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function pad2(n) { return (n < 10 ? '0' : '') + n; }
  function src(a) { return IMAGENES + a.file; }
  function altOf(a) { return a.alt || (a.name + ', Zapata ' + a.branch + '. Precio especial.'); }
  function countOf(p) { return p.count || p.gallery.length; }
  function linkOf(p, a) { return p.hrefFor ? p.hrefFor(a) : p.href(); }

  /* ───────────────────────────── Marcado ───────────────────────────── */

  function slideHTML(p, i) {
    var g = p.gallery;
    var gallery =
      '<div class="promo-gallery' + (g.length === 1 ? ' promo-gallery--single' : '') + '">' +
        '<img class="promo-gallery__bg" src="' + esc(src(g[0])) + '" alt="" aria-hidden="true">' +
        '<div class="promo-gallery__track" style="--i:0">' +
          g.map(function (a, k) {
            return '<img class="promo-gallery__item" data-art="' + k + '" src="' + esc(src(a)) + '" alt="" loading="lazy" width="800" height="800">';
          }).join('') +
        '</div>' +
        '<button type="button" class="promo-gallery__zoom" aria-label="Ver arte en grande">' + ICON.search + ' <span>Ampliar</span></button>' +
        (g.length > 1
          ? '<div class="promo-gallery__thumbs">' + g.map(function (a, k) {
              return '<button type="button" class="promo-gallery__thumb" data-art="' + k + '" aria-label="' + esc(a.name + ', Zapata ' + a.branch) + '">' +
                     '<img src="' + esc(src(a)) + '" alt="" loading="lazy" width="800" height="800"></button>';
            }).join('') + '</div>'
          : '') +
      '</div>';

    var body = p.countLabel
      ? '<h3 class="promo-slide__headline"><strong>' + countOf(p) + '</strong> ' + esc(p.countLabel) + '</h3>' +
        '<p class="promo-slide__desc">' + esc(p.desc) + '</p>' +
        '<p class="promo-slide__stock"><span class="promo-slide__pulse" aria-hidden="true"></span>' + esc(p.text) + '</p>'
      : '<h3 class="promo-slide__headline">' + esc(p.title) + '</h3>' +
        '<p class="promo-slide__desc">' + esc(p.text) + '</p>' +
        (p.perks ? '<ul class="promo-slide__perks">' + p.perks.map(function (k) { return '<li>' + esc(k) + '</li>'; }).join('') + '</ul>' : '') +
        (p.legal ? '<p class="promo-slide__legal">' + esc(p.legal) + '</p>' : '');

    var foot = p.countLabel
      ? '<div class="promo-slide__unit">' +
          '<span class="promo-slide__unit-label"></span>' +
          '<strong class="promo-slide__unit-name"></strong>' +
          '<span class="promo-slide__unit-branch">' + ICON.pin + ' <span class="promo-slide__unit-where"></span></span>' +
        '</div>'
      : '<span class="promo-slide__place">' + ICON.pin + ' ' + esc(p.meta) + '</span>';

    return '<article id="promo-slide-' + i + '" role="tabpanel" aria-labelledby="promo-tab-' + i + '" ' +
             'class="promo-slide promo-slide--' + p.type + ' promo-slide--gallery">' +
             '<div class="promo-slide__media">' + gallery + '</div>' +
             '<div class="promo-slide__panel">' +
               '<div class="promo-slide__body"><span class="promo-slide__tag">' + esc(p.label) + '</span>' + body + '</div>' +
               '<div class="promo-slide__foot">' + foot +
                 '<a class="stz-btn promo-slide__cta" href="#">' + esc(p.cta) + ' ' + ICON.arrow + '</a>' +
               '</div>' +
             '</div>' +
           '</article>';
  }

  function tabHTML(p, i) {
    return '<button type="button" role="tab" id="promo-tab-' + i + '" aria-controls="promo-slide-' + i + '" ' +
             'class="promo-tab promo-tab--' + p.type + '" data-tab="' + i + '">' +
             '<span class="promo-tab__mark" aria-hidden="true"></span>' +
             '<span class="promo-tab__text"><span class="promo-tab__label">' + esc(p.tab) + '</span>' +
             '<span class="promo-tab__sub">' + esc(p.tabSub) + '</span></span>' +
             (p.countLabel ? '<span class="promo-tab__badge" aria-label="' + countOf(p) + ' unidades">' + countOf(p) + '</span>' : '') +
             '<span class="promo-tab__go" aria-hidden="true">' + ICON.arrow + '</span>' +
             '<span class="promo-tab__bar" aria-hidden="true"></span>' +
           '</button>';
  }

  /* ───────────────────────────── Comportamiento ───────────────────────────── */

  function init(root) {
    root.classList.add('stz-promo');
    if (!root.hasAttribute('aria-label')) root.setAttribute('aria-label', 'Promociones y eventos');
    root.innerHTML =
      '<div class="stz-wrap promo__box">' +
        '<div class="promo-stage">' +
          '<div class="promo-car" aria-roledescription="carrusel">' +
            '<div class="promo-car__track">' + PROMOS.map(slideHTML).join('') + '</div>' +
            '<div class="promo-car__nav">' +
              '<button type="button" class="promo-car__arrow" data-step="-1" aria-label="Anterior"><span class="promo-car__arrow-icon promo-car__arrow-icon--prev">' + ICON.arrow + '</span></button>' +
              '<button type="button" class="promo-car__arrow" data-step="1" aria-label="Siguiente">' + ICON.arrow + '</button>' +
            '</div>' +
          '</div>' +
          '<div class="promo-tabs" role="tablist" aria-label="Secciones de promociones">' + PROMOS.map(tabHTML).join('') + '</div>' +
        '</div>' +
      '</div>';

    var box = root.querySelector('.promo__box');
    var stage = root.querySelector('.promo-stage');
    var car = root.querySelector('.promo-car');
    var slides = root.querySelectorAll('.promo-slide');
    var tabs = root.querySelectorAll('.promo-tab');
    var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    var state = { index: 0, art: 0, paused: false, zoom: false };
    var timer = null;
    var lightbox = null;
    var prevOverflow = '';
    var touchX = null;
    var total = PROMOS.length;

    function arts() { return PROMOS[state.index].gallery.length; }

    function goSlide(i, fromEnd) {
      var n = (i + total) % total;
      state.index = n;
      state.art = fromEnd ? PROMOS[n].gallery.length - 1 : 0;
      update();
    }
    function pickArt(i) { state.art = i; update(); }
    // Dentro de una galería las flechas avanzan arte por arte; al terminar pasan a la siguiente pestaña
    function step(dir) {
      var n = arts();
      if (n > 1 && state.art + dir >= 0 && state.art + dir < n) { pickArt(state.art + dir); return; }
      goSlide(state.index + dir, dir < 0);
    }

    function schedule() {
      clearTimeout(timer);
      if (state.paused || reduced || state.zoom) return;
      timer = setTimeout(function () { step(1); }, arts() > 1 ? TIEMPO_POR_ARTE : TIEMPO_POR_ANUNCIO);
    }

    function update() {
      var cur = PROMOS[state.index];
      stage.className = 'promo-stage promo-stage--' + cur.type;
      box.classList.toggle('is-paused', state.paused || reduced);

      PROMOS.forEach(function (p, i) {
        var on = i === state.index;
        var pos = on ? state.art : 0;
        var a = p.gallery[pos];
        var s = slides[i];
        s.classList.toggle('is-active', on);
        s.setAttribute('aria-hidden', on ? 'false' : 'true');

        s.querySelector('.promo-gallery__bg').src = src(a);
        s.querySelector('.promo-gallery__track').style.setProperty('--i', pos);
        s.querySelectorAll('.promo-gallery__item').forEach(function (img, k) {
          var c = k === pos;
          img.classList.toggle('is-current', c);
          img.alt = c ? altOf(p.gallery[k]) : '';
          img.setAttribute('aria-hidden', c ? 'false' : 'true');
          if (on && Math.abs(k - pos) <= 1) img.loading = 'eager';
        });
        var thumbs = s.querySelector('.promo-gallery__thumbs');
        if (thumbs) {
          thumbs.querySelectorAll('.promo-gallery__thumb').forEach(function (t, k) {
            t.classList.toggle('is-current', k === pos);
            t.setAttribute('aria-current', k === pos ? 'true' : 'false');
            t.tabIndex = on ? 0 : -1;
          });
          var el = thumbs.children[pos];
          if (on && el && thumbs.scrollWidth > thumbs.clientWidth) {
            thumbs.scrollTo({ left: el.offsetLeft - thumbs.clientWidth / 2 + el.offsetWidth / 2, behavior: 'smooth' });
          }
        }
        s.querySelector('.promo-gallery__zoom').tabIndex = on ? 0 : -1;

        if (p.countLabel) {
          var unit = s.querySelector('.promo-slide__unit');
          unit.setAttribute('aria-live', on ? 'polite' : 'off');
          s.querySelector('.promo-slide__unit-label').textContent = 'Modelo ' + pad2(pos + 1) + ' de ' + pad2(p.gallery.length);
          s.querySelector('.promo-slide__unit-name').textContent = a.name;
          s.querySelector('.promo-slide__unit-where').textContent = 'Zapata ' + a.branch;
        }
        var cta = s.querySelector('.promo-slide__cta');
        cta.href = linkOf(p, a);
        cta.tabIndex = on ? 0 : -1;
      });

      tabs.forEach(function (t, i) {
        var on = i === state.index;
        t.classList.toggle('is-active', on);
        t.setAttribute('aria-selected', on ? 'true' : 'false');
        t.tabIndex = on ? 0 : -1;
        var bar = t.querySelector('.promo-tab__bar');
        bar.innerHTML = '';
        if (on) {
          // Barra de avance: se vuelve a crear para reiniciar la animación
          var n = PROMOS[i].gallery.length;
          var span = document.createElement('span');
          span.style.setProperty('--from', state.art / n);
          span.style.setProperty('--to', (state.art + 1) / n);
          span.style.animationDuration = (n > 1 ? TIEMPO_POR_ARTE : TIEMPO_POR_ANUNCIO) + 'ms';
          bar.appendChild(span);
        }
      });

      if (lightbox) renderLightbox();
      schedule();
    }

    /* Vista en grande */
    function openZoom() {
      state.zoom = true;
      prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      lightbox = document.createElement('div');
      lightbox.className = 'promo-lightbox';
      lightbox.setAttribute('role', 'dialog');
      lightbox.setAttribute('aria-modal', 'true');
      lightbox.setAttribute('aria-label', 'Arte en grande');
      lightbox.addEventListener('click', function (e) {
        var b = e.target.closest('button');
        if (b && b.dataset.lb === 'close') { closeZoom(); return; }
        if (b && b.dataset.lb) { lbStep(+b.dataset.lb); return; }
        if (!e.target.closest('.promo-lightbox__inner')) closeZoom();
      });
      box.appendChild(lightbox);
      renderLightbox();
      lightbox.querySelector('.promo-lightbox__close').focus();
      document.addEventListener('keydown', onLbKey);
      schedule();
    }
    function renderLightbox() {
      var g = PROMOS[state.index].gallery;
      var a = g[state.art];
      lightbox.innerHTML =
        '<figure class="promo-lightbox__inner">' +
          '<img src="' + esc(src(a)) + '" alt="' + esc(altOf(a)) + '">' +
          '<figcaption class="promo-lightbox__bar stz-mono"><span><strong>' + esc(a.name) + '</strong> · Zapata ' + esc(a.branch) + '</span>' +
          (g.length > 1 ? '<span>' + pad2(state.art + 1) + ' / ' + pad2(g.length) + '</span>' : '') + '</figcaption>' +
        '</figure>' +
        '<button type="button" class="promo-lightbox__close" data-lb="close" aria-label="Cerrar">' + ICON.close + '</button>' +
        (g.length > 1
          ? '<button type="button" class="promo-lightbox__arrow promo-lightbox__arrow--prev" data-lb="-1" aria-label="Arte anterior"><span class="promo-car__arrow-icon--prev">' + ICON.arrow + '</span></button>' +
            '<button type="button" class="promo-lightbox__arrow promo-lightbox__arrow--next" data-lb="1" aria-label="Arte siguiente">' + ICON.arrow + '</button>'
          : '');
    }
    function lbStep(dir) {
      var n = arts();
      var focused = document.activeElement && document.activeElement.dataset ? document.activeElement.dataset.lb : null;
      pickArt((state.art + dir + n) % n);
      if (focused) { var b = lightbox.querySelector('[data-lb="' + focused + '"]'); if (b) b.focus(); }
    }
    function closeZoom() {
      document.removeEventListener('keydown', onLbKey);
      if (lightbox) lightbox.remove();
      lightbox = null;
      state.zoom = false;
      document.body.style.overflow = prevOverflow;
      var z = slides[state.index].querySelector('.promo-gallery__zoom');
      if (z) z.focus();
      update();
    }
    function onLbKey(e) {
      if (e.key === 'Escape') closeZoom();
      else if (e.key === 'ArrowRight') lbStep(1);
      else if (e.key === 'ArrowLeft') lbStep(-1);
    }

    /* Eventos */
    root.addEventListener('click', function (e) {
      if (lightbox && lightbox.contains(e.target)) return;
      var t;
      if ((t = e.target.closest('.promo-car__arrow'))) { step(+t.dataset.step); return; }
      if ((t = e.target.closest('.promo-tab'))) { goSlide(+t.dataset.tab); return; }
      if ((t = e.target.closest('.promo-gallery__thumb'))) { pickArt(+t.dataset.art); return; }
      if (e.target.closest('.promo-gallery__zoom')) { openZoom(); return; }
      if ((t = e.target.closest('.promo-gallery__item'))) {
        if (t.classList.contains('is-current')) openZoom(); else pickArt(+t.dataset.art);
      }
    });

    // Al pausar, la barra de avance se congela donde va (no se reinicia)
    function pause() { state.paused = true; box.classList.add('is-paused'); clearTimeout(timer); }
    function resume() { state.paused = false; update(); }
    box.addEventListener('mouseenter', pause);
    box.addEventListener('mouseleave', resume);
    box.addEventListener('focusin', pause);
    box.addEventListener('focusout', function (e) {
      if (!box.contains(e.relatedTarget)) resume();
    });

    car.addEventListener('touchstart', function (e) { touchX = e.touches[0].clientX; }, { passive: true });
    car.addEventListener('touchend', function (e) {
      if (touchX == null) return;
      var dx = e.changedTouches[0].clientX - touchX;
      if (Math.abs(dx) > 40) step(dx < 0 ? 1 : -1);
      touchX = null;
    });

    box.addEventListener('keydown', function (e) {
      if (state.zoom) return;
      if (e.target.getAttribute('role') === 'tab') {
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
          e.preventDefault();
          goSlide(state.index + (e.key === 'ArrowRight' ? 1 : -1));
          tabs[state.index].focus();
        }
        return;
      }
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    });

    update();
  }

  function start() {
    var roots = document.querySelectorAll('[data-stz-promo], .stz-promo');
    for (var i = 0; i < roots.length; i++) {
      if (!roots[i].dataset.stzReady) { roots[i].dataset.stzReady = '1'; init(roots[i]); }
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
