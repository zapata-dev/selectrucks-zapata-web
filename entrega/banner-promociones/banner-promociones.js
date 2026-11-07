/* Banner de promociones SelecTrucks Zapata — versión independiente (sin React, sin librerías).
 *
 * Cómo se monta (detalle en LEEME.txt):
 *   1. <link rel="stylesheet" href="banner-promociones.css">
 *   2. <div data-stz-promo></div> donde va el banner
 *   3. <script src="banner-promociones.js" defer></script>
 *
 * Lo que el sitio tiene que ajustar está en CONFIG, justo abajo.
 */
(function () {
  'use strict';

  // ───────────────────────────────────────────── Ajustes del sitio
  var CONFIG = {
    // Liga a la página de Contacto. El botón le agrega ?sucursal=…&motivo=…&mensaje=…#formulario
    // (contacto-demo.html solo sirve para ver la muestra; cámbienla por la liga real de su Contacto).
    CONTACTO_URL: 'contacto-demo.html',
    // Dónde subieron esta carpeta, relativo a la página donde se monta el banner (vacío = la misma carpeta).
    // Ejemplo: si la página es /index.html y el paquete quedó en /banner-promociones/, pongan 'banner-promociones/'.
    BASE: '',
  };

  // ───────────────────────────────────────────── Contenido
  // branch: la sucursal como la dice el arte · form: su nombre en el formulario de Contacto
  // (el formulario no tiene «Guadalajara Zapopan»; ahí le corresponde «Guadalajara»)
  var PROMO_ESPECIAL = [
    { name: 'Cascadia 2017',         branch: 'Guadalajara Zapopan', form: 'Guadalajara', file: 'assets/01-cascadia-2017-zapopan.webp' },
    { name: 'Cascadia 2017',         branch: 'Tlalnepantla',        file: 'assets/02-cascadia-2017-tlalnepantla.webp' },
    { name: 'Cascadia 2012',         branch: 'Guadalajara Zapopan', form: 'Guadalajara', file: 'assets/03-cascadia-2012-zapopan.webp' },
    { name: 'Cascadia 2021',         branch: 'Guadalajara Zapopan', form: 'Guadalajara', file: 'assets/04-cascadia-2021-zapopan.webp' },
    { name: 'LT Hi Rise Euro 2022',  branch: 'Guadalajara Zapopan', form: 'Guadalajara', file: 'assets/05-lt-hi-rise-euro-2022-zapopan.webp' },
    { name: 'VNL64T 2019',           branch: 'Guadalajara Zapopan', form: 'Guadalajara', file: 'assets/06-vnl64t-2019-zapopan.webp' },
    { name: 'Cascadia 2018',         branch: 'Guadalajara Zapopan', form: 'Guadalajara', file: 'assets/07-cascadia-2018-zapopan.webp' },
    { name: 'Cascadia 2020',         branch: 'Querétaro',           file: 'assets/08-cascadia-2020-queretaro.webp' },
    { name: 'Caja refrigerada 2019', branch: 'León',                file: 'assets/09-caja-refrigerada-2019-leon.webp' },
    { name: 'Cascadia 2016',         branch: 'Tlalnepantla',        file: 'assets/10-cascadia-2016-tlalnepantla.webp' },
  ];

  var EVENTOS = [
    {
      name: 'Gran Feria de Seminuevos',
      branch: 'León',
      file: 'assets/gran-feria-seminuevos-leon.webp',
      alt: 'Gran Feria de Seminuevos, 25 y 26 de noviembre en Agencia Zapata Camiones León. Desde 0% de enganche y tasa desde 9% anual. ' +
           'Arrendamiento financiero con Financiera Daimler Truck, con tasa fija anual del 9% a un plazo de 12 meses. ' +
           'Sujeto a aprobación y condiciones de la financiera.',
    },
  ];

  function contacto(params) {
    var q = Object.keys(params).map(function (k) {
      return encodeURIComponent(k) + '=' + encodeURIComponent(params[k]);
    }).join('&');
    return CONFIG.CONTACTO_URL + '?' + q + '#formulario';
  }

  function sucursales(list) {
    var seen = {};
    list.forEach(function (a) { seen[a.branch] = true; });
    return Object.keys(seen).length;
  }

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
      hrefFor: function (a) {
        return contacto({
          sucursal: a.form || a.branch,
          motivo: 'Promoción especial',
          mensaje: 'Hola, quiero conocer más sobre la unidad ' + a.name + ' de Zapata ' + a.branch + ' que está en promoción especial.',
        });
      },
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
      hrefFor: function () {
        return contacto({ sucursal: 'León', motivo: 'Gran Feria de Seminuevos' });
      },
    },
  ];

  var PROMO_DELAY = 6000;     // diapositiva sin galería (el evento)
  var PROMO_ART_DELAY = 2000; // cada arte de la promoción especial

  // ───────────────────────────────────────────── Íconos
  var SVG = 'xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"';
  var ICON = {
    arrow: '<svg width="14" height="14" ' + SVG + ' stroke-width="2.5" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>',
    pin: '<svg width="14" height="14" ' + SVG + ' stroke-width="2" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
    search: '<svg width="16" height="16" ' + SVG + ' stroke-width="2.5" aria-hidden="true"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
    close: '<svg width="18" height="18" ' + SVG + ' stroke-width="2.5" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
  };

  // ───────────────────────────────────────────── Utilidades
  function pad2(n) { return (n < 10 ? '0' : '') + n; }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function img(a) { return CONFIG.BASE + a.file; }
  function altOf(a) { return a.alt || (a.name + ', Zapata ' + a.branch + '. Precio especial.'); }
  function qa(root, sel) { return Array.prototype.slice.call(root.querySelectorAll(sel)); }

  // ───────────────────────────────────────────── Marcado
  function galleryHTML(p, i) {
    var items = p.gallery;
    var html = '<div class="stz-promo-gallery' + (items.length === 1 ? ' stz-promo-gallery--single' : '') + '">' +
      '<img class="stz-promo-gallery__bg" src="' + img(items[0]) + '" alt="" aria-hidden="true">' +
      '<div class="stz-promo-gallery__track" style="--i:0">';
    items.forEach(function (a, k) {
      html += '<img class="stz-promo-gallery__item' + (k === 0 ? ' is-current' : '') + '" data-art="' + k + '" src="' + img(a) + '"' +
        ' alt="' + (k === 0 ? esc(altOf(a)) : '') + '"' + (k === 0 ? '' : ' aria-hidden="true"') +
        ' loading="' + (i === 0 && k <= 1 ? 'eager' : 'lazy') + '">';
    });
    html += '</div><button type="button" class="stz-promo-gallery__zoom" data-zoom aria-label="Ver arte en grande">' + ICON.search + ' <span>Ampliar</span></button>';
    if (items.length > 1) {
      html += '<div class="stz-promo-gallery__thumbs">';
      items.forEach(function (a, k) {
        html += '<button type="button" class="stz-promo-gallery__thumb' + (k === 0 ? ' is-current' : '') + '" data-art="' + k + '"' +
          ' aria-label="' + esc(a.name + ', Zapata ' + a.branch) + '" aria-current="' + (k === 0) + '">' +
          '<img src="' + img(a) + '" alt="" loading="lazy"></button>';
      });
      html += '</div>';
    }
    return html + '</div>';
  }

  function slideHTML(p, i) {
    var body;
    if (p.countLabel) {
      body = '<h3 class="stz-promo-slide__headline"><strong>' + (p.count || p.gallery.length) + '</strong> ' + esc(p.countLabel) + '</h3>' +
        '<p class="stz-promo-slide__desc">' + esc(p.desc) + '</p>' +
        '<p class="stz-promo-slide__stock"><span class="stz-promo-slide__pulse" aria-hidden="true"></span>' + esc(p.text) + '</p>';
    } else {
      body = '<h3 class="stz-promo-slide__headline">' + esc(p.title) + '</h3>' +
        '<p class="stz-promo-slide__desc">' + esc(p.text) + '</p>' +
        (p.perks ? '<ul class="stz-promo-slide__perks">' + p.perks.map(function (k) { return '<li>' + esc(k) + '</li>'; }).join('') + '</ul>' : '') +
        (p.legal ? '<p class="stz-promo-slide__legal">' + esc(p.legal) + '</p>' : '');
    }
    var foot = p.countLabel
      ? '<div class="stz-promo-slide__unit"' + (i === 0 ? ' aria-live="polite"' : '') + '>' +
          '<span class="stz-promo-slide__unit-label" data-unit-label></span>' +
          '<strong data-unit-name></strong>' +
          '<span class="stz-promo-slide__unit-branch">' + ICON.pin + ' <span data-unit-branch></span></span></div>'
      : '<span class="stz-promo-slide__place">' + ICON.pin + ' ' + esc(p.meta) + '</span>';

    return '<article id="stz-promo-slide-' + i + '" role="tabpanel" aria-labelledby="stz-promo-tab-' + i + '"' +
      ' class="stz-promo-slide stz-promo-slide--' + p.type + ' stz-promo-slide--gallery' + (i === 0 ? ' is-active' : '') + '"' +
      ' aria-hidden="' + (i !== 0) + '">' +
      '<div class="stz-promo-slide__media">' + galleryHTML(p, i) + '</div>' +
      '<div class="stz-promo-slide__panel"><div class="stz-promo-slide__body">' +
        '<span class="stz-promo-slide__tag">' + esc(p.label) + '</span>' + body + '</div>' +
        '<div class="stz-promo-slide__foot">' + foot +
          '<a class="stz-promo-slide__cta" data-cta href="#">' + esc(p.cta) + ' ' + ICON.arrow + '</a>' +
        '</div></div></article>';
  }

  function tabHTML(p, i) {
    var badge = p.countLabel ? '<span class="stz-promo-tab__badge" aria-label="' + (p.count || p.gallery.length) + ' unidades">' + (p.count || p.gallery.length) + '</span>' : '';
    return '<button type="button" role="tab" id="stz-promo-tab-' + i + '" aria-controls="stz-promo-slide-' + i + '"' +
      ' aria-selected="' + (i === 0) + '" tabindex="' + (i === 0 ? 0 : -1) + '"' +
      ' class="stz-promo-tab stz-promo-tab--' + p.type + (i === 0 ? ' is-active' : '') + '" data-tab="' + i + '">' +
      '<span class="stz-promo-tab__mark" aria-hidden="true"></span>' +
      '<span class="stz-promo-tab__text"><span class="stz-promo-tab__label">' + esc(p.tab) + '</span>' +
      '<span class="stz-promo-tab__sub">' + esc(p.tabSub) + '</span></span>' + badge +
      '<span class="stz-promo-tab__go" aria-hidden="true">' + ICON.arrow + '</span>' +
      '<span class="stz-promo-tab__bar" aria-hidden="true"></span></button>';
  }

  // ───────────────────────────────────────────── Comportamiento
  function mount(host) {
    if (host.getAttribute('data-stz-promo-listo')) return;
    host.setAttribute('data-stz-promo-listo', '1');

    var section = document.createElement('section');
    section.className = 'stz-promo';
    section.id = 'promociones';
    section.setAttribute('aria-label', 'Promociones y eventos');
    section.innerHTML =
      '<div class="stz-promo__wrap stz-promo__box">' +
        '<div class="stz-promo-stage stz-promo-stage--' + PROMOS[0].type + '">' +
          '<div class="stz-promo-car" aria-roledescription="carrusel">' +
            '<div class="stz-promo-car__track">' + PROMOS.map(slideHTML).join('') + '</div>' +
            '<div class="stz-promo-car__nav">' +
              '<button type="button" class="stz-promo-car__arrow" data-step="-1" aria-label="Anterior"><span class="stz-promo-car__arrow-icon stz-promo-car__arrow-icon--prev">' + ICON.arrow + '</span></button>' +
              '<button type="button" class="stz-promo-car__arrow" data-step="1" aria-label="Siguiente">' + ICON.arrow + '</button>' +
            '</div>' +
          '</div>' +
          '<div class="stz-promo-tabs" role="tablist" aria-label="Secciones de promociones">' + PROMOS.map(tabHTML).join('') + '</div>' +
        '</div>' +
      '</div>';
    host.appendChild(section);

    var box = section.querySelector('.stz-promo__box');
    var stage = section.querySelector('.stz-promo-stage');
    var car = section.querySelector('.stz-promo-car');
    var slides = qa(section, '.stz-promo-slide');
    var tabs = qa(section, '.stz-promo-tab');
    var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    var index = 0, art = 0, paused = false, zoom = null, timer = null;

    function arts() { return PROMOS[index].gallery.length; }

    function render() {
      stage.className = 'stz-promo-stage stz-promo-stage--' + PROMOS[index].type;
      slides.forEach(function (el, i) {
        var on = i === index;
        var p = PROMOS[i];
        var pos = on ? art : 0;
        var cur = p.gallery[pos];
        el.classList.toggle('is-active', on);
        el.setAttribute('aria-hidden', String(!on));

        var track = el.querySelector('.stz-promo-gallery__track');
        track.style.setProperty('--i', pos);
        el.querySelector('.stz-promo-gallery__bg').src = img(cur);
        qa(el, '.stz-promo-gallery__item').forEach(function (it, k) {
          var c = k === pos;
          it.classList.toggle('is-current', c);
          it.alt = c ? altOf(p.gallery[k]) : '';
          if (c) it.removeAttribute('aria-hidden'); else it.setAttribute('aria-hidden', 'true');
          if (on && Math.abs(k - pos) <= 1) it.loading = 'eager';
        });
        qa(el, '.stz-promo-gallery__thumb').forEach(function (th, k) {
          th.classList.toggle('is-current', k === pos);
          th.setAttribute('aria-current', String(k === pos));
          th.tabIndex = on ? 0 : -1;
        });
        var thumbs = el.querySelector('.stz-promo-gallery__thumbs');
        if (on && thumbs && thumbs.scrollWidth > thumbs.clientWidth) {
          var t = thumbs.children[pos];
          if (t) thumbs.scrollTo({ left: t.offsetLeft - thumbs.clientWidth / 2 + t.offsetWidth / 2, behavior: 'smooth' });
        }
        el.querySelector('[data-zoom]').tabIndex = on ? 0 : -1;

        if (p.countLabel) {
          el.querySelector('[data-unit-label]').textContent = 'Modelo ' + pad2(pos + 1) + ' de ' + pad2(p.gallery.length);
          el.querySelector('[data-unit-name]').textContent = cur.name;
          el.querySelector('[data-unit-branch]').textContent = 'Zapata ' + cur.branch;
        }
        var cta = el.querySelector('[data-cta]');
        cta.href = p.hrefFor(cur);
        cta.tabIndex = on ? 0 : -1;
      });

      tabs.forEach(function (tb, i) {
        var on = i === index;
        tb.classList.toggle('is-active', on);
        tb.setAttribute('aria-selected', String(on));
        tb.tabIndex = on ? 0 : -1;
        var bar = tb.querySelector('.stz-promo-tab__bar');
        bar.innerHTML = '';
        if (on) {
          // Barra de avance: dentro de la galería avanza arte por arte
          var n = PROMOS[i].gallery.length;
          var s = document.createElement('span');
          s.style.setProperty('--from', art / n);
          s.style.setProperty('--to', (art + 1) / n);
          s.style.animationDuration = (n > 1 ? PROMO_ART_DELAY : PROMO_DELAY) + 'ms';
          bar.appendChild(s);
        }
      });
      schedule();
    }

    function schedule() {
      clearTimeout(timer);
      if (paused || reduced || zoom) return;
      timer = setTimeout(function () { step(1); }, arts() > 1 ? PROMO_ART_DELAY : PROMO_DELAY);
    }

    function goSlide(i, fromEnd) {
      index = (i + PROMOS.length) % PROMOS.length;
      art = fromEnd ? arts() - 1 : 0;
      render();
    }
    function pickArt(i) { art = i; render(); }
    // Dentro de una galería las flechas avanzan arte por arte; al terminar pasan a la siguiente pestaña
    function step(dir) {
      var n = arts();
      if (n && art + dir >= 0 && art + dir < n) { pickArt(art + dir); return; }
      goSlide(index + dir, dir < 0);
    }

    function setPaused(v) {
      paused = v;
      box.classList.toggle('is-paused', paused || reduced);
      if (!v) render(); else clearTimeout(timer);
    }

    // Clics
    section.addEventListener('click', function (e) {
      var t = e.target.closest('[data-step],[data-tab],[data-art],[data-zoom]');
      if (!t || !section.contains(t)) return;
      if (t.hasAttribute('data-step')) step(Number(t.getAttribute('data-step')));
      else if (t.hasAttribute('data-tab')) goSlide(Number(t.getAttribute('data-tab')));
      else if (t.hasAttribute('data-zoom')) openZoom();
      else if (t.hasAttribute('data-art')) {
        var k = Number(t.getAttribute('data-art'));
        if (t.classList.contains('stz-promo-gallery__item') && k === art) openZoom();
        else pickArt(k);
      }
    });

    // Pausa al pasar el mouse o al enfocar
    box.addEventListener('mouseenter', function () { setPaused(true); });
    box.addEventListener('mouseleave', function () { setPaused(false); });
    box.addEventListener('focusin', function () { setPaused(true); });
    box.addEventListener('focusout', function (e) { if (!box.contains(e.relatedTarget)) setPaused(false); });

    // Teclado
    box.addEventListener('keydown', function (e) {
      if (zoom) return;
      if (e.target.getAttribute('role') === 'tab') {
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
          e.preventDefault();
          goSlide(index + (e.key === 'ArrowRight' ? 1 : -1));
          tabs[index].focus();
        }
        return;
      }
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    });

    // Deslizar en celular
    var touchX = null;
    car.addEventListener('touchstart', function (e) { touchX = e.touches[0].clientX; }, { passive: true });
    car.addEventListener('touchend', function (e) {
      if (touchX == null) return;
      var dx = e.changedTouches[0].clientX - touchX;
      if (Math.abs(dx) > 40) step(dx < 0 ? 1 : -1);
      touchX = null;
    });

    // Vista en grande de un arte
    function openZoom() {
      var items = PROMOS[index].gallery;
      var prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      var lb = document.createElement('div');
      lb.className = 'stz-promo-lightbox';
      lb.setAttribute('role', 'dialog');
      lb.setAttribute('aria-modal', 'true');
      lb.setAttribute('aria-label', 'Arte en grande');
      lb.innerHTML =
        '<figure class="stz-promo-lightbox__inner"><img alt=""><figcaption class="stz-promo-lightbox__bar stz-promo-mono">' +
          '<span><strong></strong> · <em style="font-style:normal"></em></span>' + (items.length > 1 ? '<span data-count></span>' : '') +
        '</figcaption></figure>' +
        '<button type="button" class="stz-promo-lightbox__close" aria-label="Cerrar">' + ICON.close + '</button>' +
        (items.length > 1
          ? '<button type="button" class="stz-promo-lightbox__arrow stz-promo-lightbox__arrow--prev" data-lb="-1" aria-label="Arte anterior"><span>' + ICON.arrow + '</span></button>' +
            '<button type="button" class="stz-promo-lightbox__arrow stz-promo-lightbox__arrow--next" data-lb="1" aria-label="Arte siguiente">' + ICON.arrow + '</button>'
          : '');
      section.appendChild(lb);

      function show() {
        var a = items[art];
        var im = lb.querySelector('img');
        im.src = img(a);
        im.alt = altOf(a);
        lb.querySelector('strong').textContent = a.name;
        lb.querySelector('em').textContent = 'Zapata ' + a.branch;
        var c = lb.querySelector('[data-count]');
        if (c) c.textContent = pad2(art + 1) + ' / ' + pad2(items.length);
      }
      function move(dir) { art = (art + dir + items.length) % items.length; render(); show(); }
      function close() {
        document.removeEventListener('keydown', onKey);
        lb.remove();
        document.body.style.overflow = prevOverflow;
        zoom = null;
        render();
      }
      function onKey(e) {
        if (e.key === 'Escape') close();
        if (e.key === 'ArrowRight' && items.length > 1) move(1);
        if (e.key === 'ArrowLeft' && items.length > 1) move(-1);
      }
      lb.addEventListener('click', function (e) {
        e.stopPropagation();
        var b = e.target.closest('button');
        if (b && b.hasAttribute('data-lb')) { move(Number(b.getAttribute('data-lb'))); return; }
        if (b || !e.target.closest('.stz-promo-lightbox__inner')) close();
      });
      document.addEventListener('keydown', onKey);
      zoom = lb;
      clearTimeout(timer);
      show();
      lb.querySelector('.stz-promo-lightbox__close').focus();
    }

    render();
  }

  function init() {
    qa(document, '[data-stz-promo]').forEach(mount);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
