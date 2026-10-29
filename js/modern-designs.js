/* Original: a pointer-reactive particle field. C: a manually controlled banner.
 * No analytics, university branding or third-party interaction code is used. */
var modernAssetRoot = new URL('../', document.currentScript.src).href;

function initializeModernDesigns() {
  var root = typeof referenceAssetRoot === 'string' ? referenceAssetRoot : modernAssetRoot;
  var header = document.getElementById('navbar');
  if (header) {
    var bar = document.createElement('div');
    bar.className = 'campus-utility';
    bar.innerHTML = '<div><span class="campus-utility__socials"><a href="https://github.com/acostajose94" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><i class="fab fa-github" aria-hidden="true"></i></a><a href="https://www.linkedin.com/in/ivan-acosta-figueroa/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><i class="fab fa-linkedin" aria-hidden="true"></i></a><a href="mailto:gamar30@gmail.com" aria-label="Correo electrónico"><i class="fas fa-envelope" aria-hidden="true"></i></a></span><span class="campus-utility__links"><a href="' + root + '#about">Sobre mí</a><a href="' + root + 'estudios/">Formación</a><a href="' + root + 'experiencia/">Trayectoria</a><a href="' + root + 'contacto/">Contacto</a><button type="button" class="campus-search-toggle" aria-label="Buscar en el portafolio"><i class="fas fa-search" aria-hidden="true"></i></button></span></div>';
    header.prepend(bar);
    var logo = header.querySelector('.site-logo');
    if (logo) logo.insertAdjacentHTML('afterend', '<a class="campus-brand-copy" href="' + root + '">JOSÉ ACOSTA<span>INGENIERÍA<br>DE SISTEMAS</span></a>');
    var menuToggle = header.querySelector('.menu-toggle');
    if (menuToggle) menuToggle.insertAdjacentHTML('beforebegin', '<button type="button" class="campus-search-toggle campus-search-toggle--mobile" aria-label="Buscar en el portafolio"><i class="fas fa-search" aria-hidden="true"></i></button>');
    var menu = header.querySelector('#mobileMenu > div');
    if (menu) menu.insertAdjacentHTML('beforeend', '<div class="campus-mobile-secondary"><a href="' + root + 'estudios/">Formación completa</a><a href="' + root + 'experiencia/">Trayectoria profesional</a><a href="' + root + 'contacto/">Contacto directo</a><div><a href="https://github.com/acostajose94" target="_blank" rel="noopener noreferrer">GitHub</a><a href="https://www.linkedin.com/in/ivan-acosta-figueroa/" target="_blank" rel="noopener noreferrer">LinkedIn</a></div></div>');
    initializeCampusSearch(header, root);
  }
  var labels = { projects: '01 / PROYECTOS', about: '02 / PERFIL', skills: '03 / TECNOLOGÍAS', experience: '04 / TRAYECTORIA', education: '05 / FORMACIÓN', contact: '06 / CONECTEMOS' };
  Object.keys(labels).forEach(function (id) {
    var heading = document.querySelector('#' + id + ' .section-heading');
    if (heading) heading.dataset.technicalLabel = labels[id];
  });
  document.querySelectorAll('#projects img').forEach(function (image) { image.loading = 'lazy'; image.decoding = 'async'; });
  initializeParticleField();
  initializeCampusSlider();
}

function initializeCampusSearch(header, root) {
  var dialog = document.createElement('dialog');
  dialog.className = 'campus-search';
  dialog.setAttribute('aria-labelledby', 'campus-search-title');
  dialog.innerHTML = '<div class="campus-search__head"><h2 id="campus-search-title">Buscar en el portafolio</h2><button type="button" aria-label="Cerrar búsqueda">×</button></div><label for="campus-search-input">¿Qué estás buscando?</label><input id="campus-search-input" type="search" placeholder="Proyectos, experiencia, formación…" autocomplete="off"><p class="campus-search__status" role="status"></p><ul class="campus-search__results"></ul>';
  document.body.appendChild(dialog);
  var input = dialog.querySelector('input');
  var list = dialog.querySelector('ul');
  var entries = [
    { name: 'Sobre mí · Perfil profesional', path: '#about', keywords: 'ingeniero sistemas analista' },
    { name: 'Proyectos · Desarrollo web, apps y juegos', path: 'portafolio/', keywords: 'software react angular android kotlin' },
    { name: 'Habilidades · Tecnologías y herramientas', path: '#skills', keywords: 'sql python javascript java docker datos' },
    { name: 'Experiencia · Trayectoria profesional', path: 'experiencia/', keywords: 'trabajo empresas aval etl' },
    { name: 'Formación · Estudios y certificaciones', path: 'estudios/', keywords: 'universidad titulo cursos' },
    { name: 'Contacto · Hablemos de tu proyecto', path: 'contacto/', keywords: 'correo email telefono whatsapp freelance' },
  ];
  function normalize(value) { return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase(); }
  function update() {
    var query = normalize(input.value.trim());
    var matches = entries.filter(function (entry) { return normalize(entry.name + ' ' + entry.keywords).includes(query); });
    list.replaceChildren();
    matches.forEach(function (entry) {
      var item = document.createElement('li');
      var link = document.createElement('a');
      link.href = root + entry.path; link.textContent = entry.name;
      link.addEventListener('click', function () { dialog.close(); });
      item.appendChild(link); list.appendChild(item);
    });
    dialog.querySelector('.campus-search__status').textContent = matches.length ? matches.length + ' secciones disponibles' : 'No se encontraron secciones. Prueba con otra palabra.';
  }
  header.querySelectorAll('.campus-search-toggle').forEach(function (button) {
    button.setAttribute('aria-haspopup', 'dialog');
    button.addEventListener('click', function () {
      if (typeof setMobileMenu === 'function') setMobileMenu(false, false);
      input.value = ''; update(); dialog.showModal(); input.focus();
    });
  });
  input.addEventListener('input', update);
  dialog.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') { event.preventDefault(); dialog.close(); }
  });
  dialog.querySelector('button').addEventListener('click', function () { dialog.close(); });
  window.addEventListener('designchange', function () { if (dialog.open) dialog.close(); });
}

function initializeCampusSlider() {
  var cover = document.querySelector('.campus-cover');
  if (!cover) return;
  var slides = Array.from(cover.querySelectorAll('[data-campus-slide]'));
  var dots = Array.from(cover.querySelectorAll('[data-campus-goto]'));
  var index = 0;
  cover.setAttribute('role', 'region');
  cover.setAttribute('aria-roledescription', 'carrusel');
  slides.forEach(function (slide, i) {
    slide.setAttribute('role', 'group');
    slide.setAttribute('aria-roledescription', 'diapositiva');
    slide.setAttribute('aria-label', (i + 1) + ' de ' + slides.length);
  });
  function prioritizeCover() {
    if (document.documentElement.dataset.design !== 'campus') return;
    var image = slides[index].querySelector('img');
    if (image) { image.fetchPriority = 'high'; image.loading = 'eager'; }
  }
  window.addEventListener('designchange', prioritizeCover);
  // Give the banner a persistent page heading, including on slides 2 and 3.
  var heading = cover.querySelector('h1');
  function show(next) {
    index = (next + slides.length) % slides.length;
    slides.forEach(function (slide, i) { slide.hidden = i !== index; });
    dots.forEach(function (dot, i) {
      if (i === index) dot.setAttribute('aria-current', 'true');
      else dot.removeAttribute('aria-current');
    });
    cover.querySelector('.campus-slider-status').textContent = (index + 1) + ' de ' + slides.length;
    // A screen-reader-only heading remains available when its slide is hidden.
    cover.querySelector('.campus-page-title').hidden = index === 0;
    prioritizeCover();
  }
  var pageTitle = document.createElement('h1');
  pageTitle.className = 'campus-page-title sr-only';
  pageTitle.textContent = heading.textContent;
  pageTitle.hidden = true;
  cover.prepend(pageTitle);
  cover.querySelector('[data-campus-prev]').addEventListener('click', function () { show(index - 1); });
  cover.querySelector('[data-campus-next]').addEventListener('click', function () { show(index + 1); });
  dots.forEach(function (dot, i) { dot.addEventListener('click', function () { show(i); }); });
  cover.addEventListener('keydown', function (event) {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault(); show(index + (event.key === 'ArrowLeft' ? -1 : 1));
  });
  // Deliberately no autoplay: users control reading time and motion.
}

function initializeParticleField() {
  var canvas = document.getElementById('particle-field');
  if (!canvas) return;
  var scene = canvas.parentElement;
  var hero = canvas.closest('#hero');
  var trigger = hero.querySelector('.particle-trigger');
  var ctx;
  try { ctx = canvas.getContext('2d'); } catch (error) { ctx = null; }
  if (!ctx) {
    if (trigger) trigger.disabled = true;
    document.getElementById('particle-hint').textContent = 'Red de partículas conectadas';
    return; // Keep the inline vector fallback if Canvas is unavailable.
  }
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  var pointer = { x: 0, y: 0, active: false };
  var width = 0, height = 0, density = 0, frame = 0, lastTime = 0, linkReach = 0;
  var visible = true, nodes = [], pulse = null;
  function active() { return document.documentElement.dataset.design === 'original' && visible && !document.hidden; }
  function wake() { if (active() && !frame) frame = requestAnimationFrame(render); }
  function resize() {
    if (!active()) return;
    var w = scene.clientWidth, h = scene.clientHeight;
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    if (!w || !h) return;
    if (w !== width || h !== height || dpr !== density) {
      width = w; height = h; density = dpr;
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      nodes = [];
      // A jittered, flat lattice, not the previous rotating sphere.
      var columns = Math.max(7, Math.min(14, Math.round(w / 110)));
      var rows = Math.max(6, Math.min(9, Math.round(h / 110)));
      linkReach = Math.max(w * .88 / (columns - 1), h * .84 / (rows - 1)) * 1.6;
      for (var row = 0; row < rows; row++) {
        for (var col = 0; col < columns; col++) {
          var i = row * columns + col;
          var x = w * (.06 + col / (columns - 1) * .88 + Math.sin(i * 12.7) * .014);
          var y = h * (.08 + row / (rows - 1) * .84 + Math.cos(i * 8.3) * .02);
          nodes.push({ bx: x, by: y, x: x, y: y, light: 0 });
        }
      }
      pulse = null;
    }
    wake();
  }
  function render(time) {
    frame = 0;
    if (!active() || !width || !height) return;
    var step = lastTime ? Math.min(time - lastTime, 40) / 16.67 : 1;
    lastTime = time;
    var ease = reduced.matches ? 1 : 1 - Math.pow(.82, step);
    var reach = Math.min(width, height) * .32;
    var progress = pulse && !reduced.matches ? Math.max(0, (time - pulse.time) / 1300) : 0;
    if (progress >= 1) pulse = null;
    var radius = pulse ? (reduced.matches ? 28 : progress * Math.hypot(width, height)) : 0;
    var moving = false;
    nodes.forEach(function (node) {
      var tx = node.bx, ty = node.by;
      var dx = pointer.x - node.bx, dy = pointer.y - node.by;
      var distance = Math.hypot(dx, dy);
      node.light = pointer.active ? Math.max(0, 1 - distance / reach) : 0;
      if (pointer.active) {
        var attraction = node.light * node.light * .48;
        tx += dx * attraction; ty += dy * attraction;
      }
      if (pulse && !reduced.matches) {
        var px = node.bx - pulse.x, py = node.by - pulse.y;
        var pd = Math.hypot(px, py) || 1;
        var band = pd - radius;
        var force = Math.cos(band * .07) * Math.exp(-band * band / 1800) * (1 - progress) * 38;
        tx += px / pd * force; ty += py / pd * force;
        node.light = Math.max(node.light, Math.exp(-band * band / 1800) * (1 - progress));
      }
      node.x += (tx - node.x) * ease; node.y += (ty - node.y) * ease;
      if (Math.abs(tx - node.x) + Math.abs(ty - node.y) > .08) moving = true;
    });
    ctx.clearRect(0, 0, width, height);
    // The pointer illuminates the nearby network as well as moving its nodes.
    if (pointer.active || pulse) {
      var gx = pointer.active ? pointer.x : pulse.x;
      var gy = pointer.active ? pointer.y : pulse.y;
      var glow = ctx.createRadialGradient(gx, gy, 0, gx, gy, reach);
      glow.addColorStop(0, 'rgba(109,235,200,.11)'); glow.addColorStop(1, 'rgba(109,235,200,0)');
      ctx.fillStyle = glow; ctx.fillRect(0, 0, width, height);
    }
    for (var a = 0; a < nodes.length; a++) {
      for (var b = a + 1; b < nodes.length; b++) {
        var first = nodes[a], second = nodes[b];
        var length = Math.hypot(first.x - second.x, first.y - second.y);
        if (length > linkReach) continue;
        var light = Math.max(first.light, second.light);
        ctx.strokeStyle = 'rgba(109,235,200,' + ((1 - length / linkReach) * .36 + light * .38) + ')';
        ctx.lineWidth = light > .5 ? 1.2 : .7;
        ctx.beginPath(); ctx.moveTo(first.x, first.y); ctx.lineTo(second.x, second.y); ctx.stroke();
      }
    }
    nodes.forEach(function (node, index) {
      var bright = index % 8 === 0 || node.light > .45;
      ctx.fillStyle = bright ? '#d9fff3' : index % 3 === 0 ? '#86c8ef' : '#6debc8';
      ctx.shadowColor = '#6debc8'; ctx.shadowBlur = bright ? 10 : 0;
      ctx.beginPath(); ctx.arc(node.x, node.y, (bright ? 2.5 : 1.5) + node.light * 1.5, 0, Math.PI * 2); ctx.fill();
    });
    ctx.shadowBlur = 0;
    if (pulse) {
      ctx.strokeStyle = 'rgba(109,235,200,' + (reduced.matches ? .65 : (1 - progress) * .65) + ')';
      ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(pulse.x, pulse.y, radius, 0, Math.PI * 2); ctx.stroke();
    }
    if (pointer.active) {
      ctx.strokeStyle = 'rgba(220,255,244,.8)'; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(pointer.x - 7, pointer.y); ctx.lineTo(pointer.x + 7, pointer.y);
      ctx.moveTo(pointer.x, pointer.y - 7); ctx.lineTo(pointer.x, pointer.y + 7); ctx.stroke();
    }
    scene.classList.add('is-rendered');
    // Idle fields consume no animation frames. Motion is interaction-driven.
    if (!reduced.matches && (moving || pulse)) wake();
    else lastTime = 0;
  }
  function localPoint(event) {
    var rect = scene.getBoundingClientRect();
    return { x: event.clientX - rect.left - scene.clientLeft, y: event.clientY - rect.top - scene.clientTop };
  }
  hero.addEventListener('pointermove', function (event) {
    if (event.pointerType === 'touch' || !active()) return;
    var point = localPoint(event);
    pointer.x = point.x; pointer.y = point.y; pointer.active = true; wake();
  }, { passive: true });
  hero.addEventListener('pointerleave', function () { pointer.active = false; wake(); });
  function createPulse(point) {
    if (!active()) return;
    pulse = { x: point.x, y: point.y, time: performance.now() };
    wake();
  }
  hero.addEventListener('click', function (event) {
    // Never hijack navigation, social links or the foreground action buttons.
    if (event.target.closest('a, button, input, textarea, select')) return;
    createPulse(localPoint(event));
  });
  if (trigger) trigger.addEventListener('click', function () {
    createPulse({ x: width * .72, y: height * .45 });
  }); // The native foreground button also supports Enter and Space.
  function sync() {
    cancelAnimationFrame(frame); frame = 0; lastTime = 0;
    pointer.active = false; pulse = null;
    if (active()) resize();
  }
  if (typeof ResizeObserver !== 'undefined') new ResizeObserver(resize).observe(scene);
  else window.addEventListener('resize', resize);
  if (typeof IntersectionObserver !== 'undefined') new IntersectionObserver(function (entries) { visible = entries[0].isIntersecting; sync(); }).observe(hero);
  window.addEventListener('designchange', sync);
  document.addEventListener('visibilitychange', sync);
  window.addEventListener('blur', sync);
  reduced.addEventListener('change', sync);
  resize();
}
