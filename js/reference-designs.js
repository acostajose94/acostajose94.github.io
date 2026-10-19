/* Visual references inspected on 2026-10-15. See REFERENCES.md for sources.
 * Source interactions are ported without WordPress, jQuery, analytics or dat.GUI.
 */
var referenceAssetRoot = new URL('../', document.currentScript.src).href;

// Personal JA mark for the footer and contact avatar; navbar uses the shared JA circle.
function personalBrandMark() {
  return '<svg class="personal-brand-mark" viewBox="0 0 64 64" aria-hidden="true" focusable="false"><use href="' + referenceAssetRoot + 'img/brand/jose-acosta-mark.svg#ja-mark"></use></svg>';
}

function initializeReferenceDesigns() {
  initializeReferenceMarkup();
  initializeReferenceSectionOrder();
  initializeReferenceHeader();
  initializeTecnofilCursor();
  initializeInteractiveNetwork();
  initializeReferenceVideo();
  initializeReferenceReveals();
  initializeReferenceDrag();
  initializeSystemsContact();
}

function initializeReferenceSectionOrder() {
  var hero = document.getElementById('hero');
  if (!hero) return;
  var main = hero.parentElement;
  var orders = {
    original: ['hero', 'about', 'skills', 'education', 'projects', 'experience', 'contact'],
    systems: ['hero', 'about', 'projects', 'skills', 'education', 'experience', 'contact'],
    tecnofil: ['hero', 'about', 'projects', 'skills', 'experience', 'education', 'contact'],
  };
  window.addEventListener('designchange', function () {
    // Reorder actual nodes, not CSS order: reading and keyboard order stay aligned.
    var order = orders[document.documentElement.dataset.design] || orders.original;
    order.forEach(function (id) {
      var section = document.getElementById(id);
      if (section && section.parentElement === main) main.appendChild(section);
    });
  });
}

function initializeReferenceMarkup() {
  var header = document.getElementById('navbar');
  if (header && header.firstElementChild) header.firstElementChild.classList.add('nav-frame');
  var trigger = document.querySelector('.menu-toggle');
  if (trigger) trigger.insertAdjacentHTML('beforeend', '<span class="header__toggler__icon" aria-hidden="true"></span>');
  var desktopNav = document.querySelector('.desktop-nav');
  if (desktopNav) desktopNav.insertAdjacentHTML('beforeend', '<a class="reference-nav-social" href="https://github.com/acostajose94" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><i class="fab fa-github" aria-hidden="true"></i></a>');

  var menuPanel = document.querySelector('#mobileMenu > div');
  if (menuPanel) {
    var list = document.createElement('div');
    list.className = 'reference-menu-list';
    while (menuPanel.firstChild) list.appendChild(menuPanel.firstChild);
    menuPanel.appendChild(list);
    list.querySelectorAll(':scope > a, :scope > button, :scope > span').forEach(function (link) {
      var item = document.createElement('div');
      item.className = 'header__item';
      link.before(item);
      item.appendChild(link);
      link.classList.add('header__link');
      if (/Sobre/.test(link.textContent)) {
        item.insertAdjacentHTML('beforeend', '<div class="header__submenu"><a href="' + referenceAssetRoot + '#education">Formación</a><a href="' + referenceAssetRoot + 'experiencia/">Experiencia completa</a></div>');
      }
    });
    menuPanel.insertAdjacentHTML('beforeend', '<div class="reference-menu-base"><div class="header__socials"><a href="https://github.com/acostajose94" target="_blank" rel="noopener noreferrer">GitHub</a><a href="https://www.linkedin.com/in/ivan-acosta-figueroa/" target="_blank" rel="noopener noreferrer">LinkedIn</a></div><div class="header__squares"><a href="' + referenceAssetRoot + 'portafolio/" class="header__square"><span>Portafolio</span></a><a href="' + referenceAssetRoot + 'contacto/" class="header__square"><span>Contacto</span></a></div></div>');
    // Like the source: logo < backdrop < panel < toggler in one header stack.
    if (header) header.appendChild(menuPanel.parentElement);
    menuPanel.addEventListener('click', function (event) {
      if (event.target.closest('a[href]')) setMobileMenu(false, false);
    });
  }

  var about = document.getElementById('about');
  if (about) {
    about.querySelector('.section-heading').classList.add('reference-about-banner');
    var profile = about.querySelector(':scope > div > .grid');
    profile.classList.add('reference-profile');
    profile.children[0].classList.add('reference-profile-copy');
    profile.children[1].classList.add('reference-profile-values');
    profile.children[1].querySelectorAll(':scope > div').forEach(function (card) {
      card.classList.add('reference-value-card');
      var link = document.createElement('button');
      link.type = 'button'; link.className = 'reference-value-link'; link.textContent = '+';
      link.setAttribute('aria-label', card.querySelector('h3').textContent + ': ver habilidades');
      link.addEventListener('click', function () { scrollToSection('skills'); });
      card.appendChild(link);
    });
    about.querySelector(':scope > div > .grid:last-child').classList.add('reference-stats');
  }
  document.querySelectorAll('#skills > div > .grid').forEach(function (grid) { grid.classList.add('reference-skills'); });
  document.querySelectorAll('#education > div > .grid').forEach(function (grid) { grid.classList.add('reference-education'); });
  document.querySelectorAll('#projects .swiper-wrapper').forEach(function (grid) { grid.classList.add('reference-project-grid'); });
  document.querySelectorAll('main .group.overflow-hidden').forEach(function (card) {
    card.classList.add(card.querySelector('.aspect-video') ? 'reference-project-card' : 'reference-app-card');
  });
  // The full portfolio has normal grids, not Swiper wrappers.
  document.querySelectorAll('.page-content .grid').forEach(function (grid) {
    if (grid.querySelector('.reference-project-card')) grid.classList.add('reference-project-grid');
    if (grid.querySelector('.reference-app-card')) grid.classList.add('reference-app-grid');
  });
  var projectsHeading = document.querySelector('#projects .section-heading');
  if (projectsHeading) projectsHeading.insertAdjacentHTML('afterend', '<div class="reference-project-intro">Proyectos de desarrollo web, gestión de datos y aplicaciones: soluciones que conectan tecnología y necesidades reales.</div>');

  var footer = document.querySelector('footer');
  if (footer) footer.insertAdjacentHTML('afterbegin', '<div class="reference-footer"><a class="reference-footer-brand" href="' + referenceAssetRoot + '" aria-label="José Acosta — Inicio">' + personalBrandMark() + '<span>josé acosta</span></a><div class="reference-footer-columns"><div><h3>Especialidades</h3><a href="' + referenceAssetRoot + '#projects">Desarrollo web</a><a href="' + referenceAssetRoot + '#skills">Datos y sistemas</a><a href="' + referenceAssetRoot + 'portafolio/">Aplicaciones y proyectos</a></div><div><h3>Perfil profesional</h3><a href="' + referenceAssetRoot + '#about">Sobre mí</a><a href="' + referenceAssetRoot + 'experiencia/">Experiencia</a><a href="' + referenceAssetRoot + 'estudios/">Formación</a></div><div><h3>Contacto</h3><a href="mailto:gamar30@gmail.com">gamar30@gmail.com</a><a href="tel:+51973418632">+51 973 418 632</a><p>Lima, Perú</p></div><div><h3>Sígueme</h3><a href="https://github.com/acostajose94" target="_blank" rel="noopener noreferrer">GitHub</a><a href="https://www.linkedin.com/in/ivan-acosta-figueroa/" target="_blank" rel="noopener noreferrer">LinkedIn</a></div></div></div>');
}

function initializeReferenceHeader() {
  var header = document.getElementById('navbar');
  if (!header) return;
  var previousScroll = window.scrollY;
  var scheduled = false;
  function update() {
    scheduled = false;
    var y = window.scrollY;
    var tecnofil = document.documentElement.dataset.design === 'tecnofil';
    var hero = document.getElementById('hero');
    header.classList.toggle('reference-header-black', tecnofil && (!hero || y > hero.offsetHeight - header.offsetHeight));
    header.classList.toggle('reference-header-hidden', tecnofil && !document.body.classList.contains('menu-is-open') && !header.querySelector(':focus-visible') && y > previousScroll + 2 && previousScroll > 120);
    previousScroll = y;
  }
  window.addEventListener('scroll', function () {
    if (!scheduled) { scheduled = true; requestAnimationFrame(update); }
  }, { passive: true });
  window.addEventListener('designchange', update);
  header.addEventListener('focusin', function () { header.classList.remove('reference-header-hidden'); });
  update();
}

function initializeTecnofilCursor() {
  var cursor = document.createElement('div');
  cursor.id = 'puntero';
  cursor.className = 'puntero cursor';
  cursor.setAttribute('aria-hidden', 'true');
  // Thin SVG strokes reproduce the Pro/light icon geometry without that paid font.
  cursor.innerHTML = '<span class="cursor__bg"></span><svg class="cursor-icon cursor-icon--plus" viewBox="0 0 26 26"><path d="M13 5v16M5 13h16"/></svg><svg class="cursor-icon cursor-icon--close" viewBox="0 0 26 26"><path d="m6 6 14 14M20 6 6 20"/></svg><svg class="cursor-icon cursor-icon--left" viewBox="0 0 26 26"><path d="M21 13H5m7-7-7 7 7 7"/></svg><svg class="cursor-icon cursor-icon--right" viewBox="0 0 26 26"><path d="M5 13h16m-7-7 7 7-7 7"/></svg><svg class="cursor-icon cursor-icon--drag" viewBox="0 0 30 26"><path d="m10 7-6 6 6 6m10-12 6 6-6 6"/></svg>';
  document.body.appendChild(cursor);
  var fine = window.matchMedia('(hover: hover) and (pointer: fine) and (min-width: 981px)');
  var lastX = -100, lastY = -100;
  var hasPointer = false;
  function applyState(target) {
    cursor.className = 'puntero cursor';
    if (!(target instanceof Element)) return;
    var menuOpen = document.body.classList.contains('menu-is-open');
    var modalOpen = !!document.querySelector('#projectModal.flex');
    var control = target.closest('a, button, .reference-project-card, .swiper-button-next, .swiper-button-prev, .swiper-pagination-bullet');
    var onYellow = target.closest('footer, #mobileMenu > div, .reference-header-black, .reference-project-card, .reference-app-card, .reference-stats');
    // The source header keeps a black cursor even over its transparent region.
    if (target.closest('#navbar') || onYellow) cursor.classList.add('cursor--contrast');
    if (control) {
      cursor.classList.add('cursor--scale', 'cursor--plus');
      if (control.closest('.header__square')) { cursor.classList.remove('cursor--contrast'); cursor.classList.add('cursor--yellow'); }
      if (control.matches('.menu-toggle') && menuOpen || control.matches('.modal-close')) {
        cursor.classList.remove('cursor--plus'); cursor.classList.add('cursor--close');
      }
      if (control.matches('.swiper-button-prev, .swiper-button-next')) {
        cursor.classList.remove('cursor--plus');
        cursor.classList.add(control.matches('.swiper-button-prev') ? 'cursor--left' : 'cursor--right');
      }
    } else if (target.closest('.reference-profile-values')) {
      cursor.classList.add('cursor--scale', 'cursor--drag');
    }
    if (menuOpen && target.id === 'mobileMenu' || modalOpen && target.id === 'projectModal') {
      cursor.classList.add('cursor--scale', 'cursor--close', 'cursor--yellow');
    }
    if (target.closest('input, textarea, select')) cursor.classList.add('cursor--input');
  }
  function refresh() {
    var enabled = fine.matches && document.documentElement.dataset.design === 'tecnofil' && hasPointer;
    document.documentElement.classList.toggle('tecnofil-cursor-ready', enabled);
    var radius = window.innerWidth <= 1200 ? 22.5 : 24;
    cursor.style.left = lastX - radius + 'px';
    cursor.style.top = lastY - radius + 'px';
    applyState(document.elementFromPoint(lastX, lastY));
  }
  document.addEventListener('pointermove', function (event) {
    if (event.pointerType === 'touch') return;
    lastX = event.clientX; lastY = event.clientY; hasPointer = true;
    if (document.documentElement.dataset.design === 'tecnofil') refresh();
  }, { passive: true });
  document.addEventListener('pointerover', function (event) { if (fine.matches) applyState(event.target); });
  document.documentElement.addEventListener('pointerleave', function () { hasPointer = false; refresh(); });
  window.addEventListener('blur', function () { hasPointer = false; refresh(); });
  window.addEventListener('designchange', refresh);
  window.addEventListener('reference-menuchange', refresh);
  window.addEventListener('scroll', function () { if (fine.matches && hasPointer) applyState(document.elementFromPoint(lastX, lastY)); }, { passive: true });
  fine.addEventListener('change', refresh);
}

/* Port of Sistemas Perú Web's techy paths, spring constants and pointer mapping. */
function initializeInteractiveNetwork() {
  var hero = document.getElementById('hero');
  var canvas = hero && hero.querySelector('.systems-canvas--main');
  var cache = hero && hero.querySelector('.systems-canvas--cache');
  if (!canvas || !cache) return;
  var ctx = canvas.getContext('2d'), cacheCtx = cache.getContext('2d');
  if (!ctx || !cacheCtx) return;
  var width = 0, height = 0, dpr = 1, paths = [];
  var t = .5, target = 1, velocity = 0, frame = 0;
  var inView = true;
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  function active() { return document.documentElement.dataset.design === 'systems' && inView && !document.hidden; }
  function clamp(n, min, max) { return Math.min(Math.max(n, min), max); }
  function randomPoint(size) { var grid = 100 / dpr; return Math.floor(Math.random() * size / grid) * grid + grid / 2; }
  function makePaths(x, y) {
    var count = Math.floor(width * height / 50000 * dpr);
    paths = Array.from({ length: count }, function () {
      var sx = x == null ? randomPoint(width) : x;
      var sy = y == null ? randomPoint(height) : y;
      var ex = randomPoint(width), ey = randomPoint(height);
      var dx = ex - sx, dy = ey - sy;
      var angle = Math.atan2(dy, -dx) + Math.PI * 1.25;
      var bx, by;
      if (angle % Math.PI < Math.PI / 2) {
        if (Math.random() > .5) { bx = ex - Math.abs(dy) * Math.sign(dx); by = sy; }
        else { bx = sx + Math.abs(dy) * Math.sign(dx); by = ey; }
      } else if (Math.random() > .5) { bx = sx; by = ey - Math.abs(dx) * Math.sign(dy); }
      else { bx = ex; by = sy + Math.abs(dx) * Math.sign(dy); }
      return [sx, sy, bx, by, ex, ey];
    });
  }
  function point(path, progress) {
    var segment = clamp(progress, 0, .9999999) * 2;
    var i = Math.floor(segment) * 2, f = segment - Math.floor(segment);
    return [path[i] + (path[i + 2] - path[i]) * f, path[i + 1] + (path[i + 3] - path[i + 1]) * f];
  }
  function drawLines() {
    cacheCtx.clearRect(0, 0, width, height);
    cacheCtx.beginPath();
    paths.forEach(function (p) { cacheCtx.moveTo(p[0], p[1]); cacheCtx.lineTo(p[2], p[3]); cacheCtx.lineTo(p[4], p[5]); });
    cacheCtx.stroke();
  }
  function draw() {
    ctx.clearRect(0, 0, width, height);
    ctx.beginPath();
    paths.forEach(function (p) {
      var a = point(p, t - .1), b = point(p, t + .1);
      ctx.moveTo(a[0], a[1]);
      if (t - .1 < .5 && t + .1 > .5) ctx.lineTo(p[2], p[3]);
      ctx.lineTo(b[0], b[1]);
    });
    ctx.stroke();
    paths.forEach(function (p) {
      ctx.beginPath(); ctx.arc(p[0], p[1], Math.max(0, t * 10), 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.arc(p[4], p[5], Math.max(0, t * 10), 0, Math.PI * 2); ctx.fill();
    });
  }
  function loop() {
    frame = 0;
    if (!active() || reduced.matches) return;
    velocity += (-8.5 * (t - target) - 61 * velocity) / 200;
    t = clamp(t + velocity, 0, .999999);
    draw();
    if (Math.abs(velocity) > .0001 || Math.abs(t - target) > .001) frame = requestAnimationFrame(loop);
  }
  function start() {
    if (reduced.matches) { t = .5; draw(); return; }
    if (!frame && active()) frame = requestAnimationFrame(loop);
  }
  function resize() {
    if (document.documentElement.dataset.design !== 'systems') return;
    var w = hero.clientWidth, h = hero.clientHeight;
    var density = Math.min(window.devicePixelRatio || 1, 2);
    if (w === width && h === height && density === dpr) { start(); return; }
    width = w; height = h; dpr = density;
    [canvas, cache].forEach(function (item) { item.width = Math.round(width * dpr); item.height = Math.round(height * dpr); });
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0); cacheCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.lineWidth = 4; ctx.strokeStyle = '#32E4B0'; ctx.fillStyle = '#32E4B0';
    cacheCtx.lineWidth = 2; cacheCtx.strokeStyle = 'rgba(0,0,0,.2)';
    makePaths(); drawLines(); t = 0; target = 1; velocity = 0; start();
  }
  hero.addEventListener('pointermove', function (event) {
    if (!active() || reduced.matches) return;
    target = clamp((event.clientX - hero.getBoundingClientRect().left) / width, 0, .999999);
    start();
  }, { passive: true });
  hero.addEventListener('pointerdown', function (event) {
    if (!active()) return;
    var rect = hero.getBoundingClientRect();
    makePaths(event.clientX - rect.left, event.clientY - rect.top);
    drawLines(); t = 0; target = 1; velocity = 0; start();
  }, { passive: true });
  window.addEventListener('designchange', function () {
    cancelAnimationFrame(frame); frame = 0;
    if (document.documentElement.dataset.design === 'systems') resize();
  });
  document.addEventListener('visibilitychange', function () { if (document.hidden) { cancelAnimationFrame(frame); frame = 0; } else start(); });
  reduced.addEventListener('change', function () { cancelAnimationFrame(frame); frame = 0; start(); });
  if (typeof ResizeObserver !== 'undefined') new ResizeObserver(resize).observe(hero);
  else window.addEventListener('resize', resize);
  if (typeof IntersectionObserver !== 'undefined') new IntersectionObserver(function (entries) {
    inView = entries[0].isIntersecting;
    if (inView) start(); else { cancelAnimationFrame(frame); frame = 0; }
  }).observe(hero);
}

function initializeReferenceVideo() {
  var video = document.querySelector('.tecnofil-video');
  var button = document.querySelector('.banner-motion-control');
  if (!video || !button) return;
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  var visible = true, userPaused = false, userStarted = false;
  function label() {
    button.innerHTML = video.paused ? '<span aria-hidden="true">▷</span> Reproducir video' : '<span aria-hidden="true">Ⅱ</span> Pausar video';
    button.setAttribute('aria-label', video.paused ? 'Reproducir video de fondo' : 'Pausar video de fondo');
  }
  function update() {
    var saveData = navigator.connection && navigator.connection.saveData;
    var play = document.documentElement.dataset.design === 'tecnofil' && visible && !document.hidden && !userPaused && (userStarted || !reduced.matches && !saveData);
    if (play) {
      if (!video.getAttribute('src')) video.src = video.dataset.src;
      video.muted = true;
      var result = video.play();
      if (result) result.catch(label);
    } else video.pause();
    label();
  }
  button.addEventListener('click', function () { userPaused = !video.paused; userStarted = !userPaused; update(); });
  video.addEventListener('play', label); video.addEventListener('pause', label);
  video.addEventListener('error', function () { button.hidden = true; });
  window.addEventListener('designchange', update);
  document.addEventListener('visibilitychange', update);
  reduced.addEventListener('change', function () { userStarted = false; update(); });
  if (typeof IntersectionObserver !== 'undefined') new IntersectionObserver(function (entries) { visible = entries[0].isIntersecting; update(); }).observe(video.closest('#hero'));
}

function initializeReferenceReveals() {
  if (typeof IntersectionObserver === 'undefined') return;
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  var elements = document.querySelectorAll('.section-heading, .reference-value-card, .reference-education > div');
  elements.forEach(function (element) { element.classList.add('reference-reveal'); });
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) { entry.target.classList.toggle('reference-is-visible', entry.isIntersecting); });
  }, { rootMargin: '0px 0px -5% 0px', threshold: 0 });
  elements.forEach(function (element) { observer.observe(element); });
  function update() { document.documentElement.classList.toggle('reference-motion-enabled', !reduced.matches); }
  reduced.addEventListener('change', update); update();
}

function initializeReferenceDrag() {
  var gallery = document.querySelector('.reference-profile-values');
  if (!gallery) return;
  var startX = 0, startScroll = 0, dragging = false, pointer = null;
  gallery.addEventListener('pointerdown', function (event) {
    if (document.documentElement.dataset.design !== 'tecnofil' || event.pointerType !== 'mouse' || event.button !== 0) return;
    startX = event.clientX; startScroll = gallery.scrollLeft; pointer = event.pointerId;
  });
  gallery.addEventListener('pointermove', function (event) {
    if (pointer !== event.pointerId) return;
    var delta = event.clientX - startX;
    if (!dragging && Math.abs(delta) > 4) {
      dragging = true; gallery.classList.add('reference-is-dragging'); gallery.setPointerCapture(pointer);
    }
    if (dragging) { event.preventDefault(); gallery.scrollLeft = startScroll - delta; }
  });
  function stop() { dragging = false; pointer = null; gallery.classList.remove('reference-is-dragging'); }
  gallery.addEventListener('pointerup', stop); gallery.addEventListener('pointercancel', stop);
  gallery.addEventListener('lostpointercapture', stop);
  window.addEventListener('pointerup', stop);
  window.addEventListener('designchange', function () {
    stop();
    if (document.documentElement.dataset.design === 'tecnofil') { gallery.tabIndex = 0; gallery.setAttribute('aria-label', 'Especialidades, galería desplazable'); }
    else { gallery.removeAttribute('tabindex'); gallery.removeAttribute('aria-label'); }
  });
}

function initializeSystemsContact() {
  var widget = document.createElement('aside');
  widget.className = 'systems-contact-widget';
  widget.setAttribute('aria-label', 'Contacto por WhatsApp');
  widget.innerHTML = '<div class="systems-contact-box" id="systems-contact-box" hidden><div class="systems-contact-description">¡Hola! Escríbeme para conversar sobre tu proyecto.<button type="button" class="systems-contact-close" aria-label="Cerrar contacto">×</button></div><a href="https://wa.me/51973418632" target="_blank" rel="noopener noreferrer" class="systems-contact-account"><span class="systems-contact-avatar" aria-hidden="true">' + personalBrandMark() + '</span><span><strong>José Acosta</strong><small>Ingeniero de Sistemas</small></span></a></div><button type="button" class="systems-contact-toggle" aria-controls="systems-contact-box" aria-expanded="false"><i class="fab fa-whatsapp" aria-hidden="true"></i><span>Haga sus consultas</span></button>';
  document.body.appendChild(widget);
  var box = widget.querySelector('.systems-contact-box');
  var toggle = widget.querySelector('.systems-contact-toggle');
  function close() { box.hidden = true; toggle.setAttribute('aria-expanded', 'false'); }
  toggle.addEventListener('click', function () { box.hidden = !box.hidden; toggle.setAttribute('aria-expanded', String(!box.hidden)); });
  widget.querySelector('.systems-contact-close').addEventListener('click', function () { close(); toggle.focus(); });
  document.addEventListener('click', function (event) { if (!widget.contains(event.target)) close(); });
  document.addEventListener('keydown', function (event) { if (event.key === 'Escape' && !box.hidden) { close(); toggle.focus(); } });
  window.addEventListener('designchange', close);
}
