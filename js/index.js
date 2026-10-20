var projectModalReturnFocus = null;

document.addEventListener('DOMContentLoaded', function () {
  var year = document.getElementById('currentYear');
  if (year) year.textContent = new Date().getFullYear();

  if (typeof initializeReferenceDesigns === 'function') initializeReferenceDesigns();
  if (typeof initializeModernDesigns === 'function') initializeModernDesigns();
  initializeDesignSwitch();
  initializeProjectPreviews();
  initializeCarousels();

  var menu = document.getElementById('mobileMenu');
  if (menu) {
    menu.setAttribute('role', 'dialog');
    menu.setAttribute('aria-modal', 'true');
    menu.setAttribute('aria-label', 'Navegación principal');
    menu.addEventListener('click', function (event) {
      if (event.target === menu) setMobileMenu(false);
    });
  }
  window.addEventListener('resize', function () {
    var trigger = document.querySelector('.menu-toggle');
    if (trigger && getComputedStyle(trigger).display === 'none') setMobileMenu(false);
  });

  var form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', async function (event) {
      event.preventDefault();
      var button = document.getElementById('btnEnviar');
      if (button.disabled) return;
      button.disabled = true;
      button.setAttribute('aria-busy', 'true');
      button.innerHTML = '<i class="fas fa-spinner fa-spin" aria-hidden="true"></i> Enviando…';
      var formData = new FormData(form);
      if (!formData.has('access_key')) formData.append('access_key', 'e174203b-7c32-4fb7-b01a-d5fabb6bfe5f');
      try {
        var response = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: formData });
        var data = await response.json();
        if (response.ok && data.success) {
          showToast('success', 'Mensaje enviado con éxito.');
          form.reset();
        } else {
          showToast('danger', 'No se pudo enviar. Intenta de nuevo.');
        }
      } catch (error) {
        showToast('danger', 'Error de conexión. Intenta de nuevo.');
      } finally {
        button.disabled = false;
        button.removeAttribute('aria-busy');
        button.innerHTML = '<i class="fas fa-paper-plane" aria-hidden="true"></i> Enviar mensaje';
      }
    });
  }

  // A and B use grids. Original and C have independently configured carousels.
});

function initializeCarousels() {
  if (typeof Swiper === 'undefined') return;
  function update() {
    var design = document.documentElement.dataset.design;
    document.querySelectorAll('.swiper').forEach(function (element) {
      if (element.swiper && element.dataset.carouselDesign !== design) element.swiper.destroy(true, true);
      if (!['original', 'campus'].includes(design)) {
        if (element.swiper) element.swiper.destroy(true, true);
        element.querySelectorAll('.swiper-slide').forEach(function (slide) { slide.inert = false; });
        return;
      }
      if (element.swiper) { element.swiper.update(); return; }
      var apps = element.classList.contains('appsSwiper');
      element.dataset.carouselDesign = design;
      new Swiper(element, {
        slidesPerView: 1,
        spaceBetween: 24,
        loop: false,
        watchOverflow: true,
        watchSlidesProgress: true,
        speed: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 300,
        pagination: { el: element.querySelector('.swiper-pagination'), clickable: true },
        navigation: {
          nextEl: element.querySelector('.swiper-button-next'),
          prevEl: element.querySelector('.swiper-button-prev'),
        },
        a11y: {
          prevSlideMessage: 'Anterior', nextSlideMessage: 'Siguiente',
          paginationBulletMessage: 'Ir al grupo {{index}}',
          slideLabelMessage: '{{index}} de {{slidesLength}}',
          containerMessage: apps ? 'Aplicaciones y juegos' : 'Proyectos destacados',
        },
        breakpoints: apps
          ? { 640: { slidesPerView: 2 }, 1200: { slidesPerView: design === 'campus' ? 3 : 4 } }
          : { 768: { slidesPerView: 2 }, 1200: { slidesPerView: design === 'campus' ? 2 : 3 } },
        on: { init: updateVisibleSlides, setTranslate: updateVisibleSlides, update: updateVisibleSlides },
      });
    });
  }
  window.addEventListener('designchange', update);
  window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', function (event) {
    document.querySelectorAll('.swiper').forEach(function (element) {
      if (element.swiper) element.swiper.params.speed = event.matches ? 0 : 300;
    });
  });
  update();
}

document.addEventListener('DOMContentLoaded', function () {
  // Supply keyboard shortcuts to content on internal pages as well.
  if (!document.querySelector('.skip-to-content')) {
    var main = document.querySelector('main');
    if (main) {
      main.id = main.id || 'main-content';
      var skip = document.createElement('a');
      skip.className = 'skip-to-content';
      skip.href = '#' + main.id;
      skip.textContent = 'Saltar al contenido';
      document.body.prepend(skip);
    }
  }
  document.querySelectorAll('a[target="_blank"]').forEach(function (link) { link.rel = 'noopener noreferrer'; });
});

function updateVisibleSlides(swiper) {
  // Offscreen links must not pull keyboard focus behind the carousel viewport.
  if (!swiper.slides.some(function (slide) { return slide.classList.contains('swiper-slide-visible'); })) return;
  swiper.slides.forEach(function (slide) { slide.inert = !slide.classList.contains('swiper-slide-visible'); });
}

function initializeDesignSwitch() {
  var root = document.documentElement;
  var designs = [
    { id: 'original', name: 'Original', color: '#070d12' },
    { id: 'systems', name: 'A', color: '#3161a3' },
    { id: 'tecnofil', name: 'B', color: '#ffdb00' },
    { id: 'campus', name: 'C', color: '#0d0022' },
  ];
  var switcher = document.createElement('button');
  switcher.type = 'button';
  switcher.className = 'design-switch';
  switcher.innerHTML = '<span class="design-switch__icon" aria-hidden="true"><i class="fa-solid fa-layer-group"></i></span><span class="design-switch__copy"><span class="design-switch__eyebrow">DISEÑO</span><span class="design-switch__label" aria-live="polite"></span><span class="design-switch__next"></span></span>';
  document.body.appendChild(switcher);
  var themeMeta = document.querySelector('meta[name="theme-color"]');
  if (!themeMeta) {
    themeMeta = document.createElement('meta');
    themeMeta.name = 'theme-color';
    document.head.appendChild(themeMeta);
  }

  function update() {
    var index = designs.findIndex(function (design) { return design.id === root.dataset.design; });
    if (index < 0) index = 0;
    root.dataset.design = designs[index].id;
    var next = designs[(index + 1) % designs.length];
    switcher.querySelector('.design-switch__label').textContent = designs[index].name;
    switcher.querySelector('.design-switch__next').textContent = 'Cambiar a ' + next.name;
    switcher.setAttribute('aria-label', 'Diseño actual: ' + designs[index].name + '. Cambiar a ' + next.name);
    switcher.title = switcher.getAttribute('aria-label');
    themeMeta.content = designs[index].color;
    window.dispatchEvent(new Event('designchange'));
  }
  update();
  switcher.addEventListener('click', function () {
    var section = Array.from(document.querySelectorAll('main > section')).find(function (item) {
      var rect = item.getBoundingClientRect();
      return rect.top <= 120 && rect.bottom > 120;
    });
    var offset = section ? section.getBoundingClientRect().top : 0;
    var keepPosition = window.scrollY > 100;
    setMobileMenu(false, false);
    var index = designs.findIndex(function (design) { return design.id === root.dataset.design; });
    root.dataset.design = designs[(index + 1) % designs.length].id;
    try { localStorage.setItem('ja-design', root.dataset.design); } catch (error) { /* Keep the in-memory selection. */ }
    update();
    if (section && keepPosition) window.scrollTo({ top: window.scrollY + section.getBoundingClientRect().top - offset, behavior: 'instant' });
  });
}

function initializeProjectPreviews() {
  var cards = document.querySelectorAll('[onclick^="openProjectModal"]');
  if (!cards.length) return;
  if (!document.getElementById('projectModal')) {
    var modal = document.createElement('div');
    modal.id = 'projectModal';
    modal.className = 'hidden';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-label', 'Vista previa del proyecto');
    modal.tabIndex = -1;
    modal.innerHTML = '<div><button type="button" class="modal-close" aria-label="Cerrar vista previa">&times;</button><img id="modalImage" alt=""></div>';
    modal.querySelector('button').addEventListener('click', closeProjectModal);
    document.body.appendChild(modal);
  }
  cards.forEach(function (card) {
    var image = card.querySelector('img');
    if (!image) return;
    card.removeAttribute('onclick');
    var button = document.createElement('button');
    button.type = 'button';
    button.className = 'project-preview';
    button.innerHTML = '<i class="fas fa-expand" aria-hidden="true"></i> Ampliar captura';
    button.setAttribute('aria-label', 'Ampliar captura de ' + image.alt);
    button.addEventListener('click', function () { openProjectModal(image.src, image.alt); });
    card.appendChild(button);
    image.style.cursor = 'zoom-in';
    image.addEventListener('click', function () { openProjectModal(image.src, image.alt, button); });
  });
}

function scrollToSection(id) {
  var element = document.getElementById(id);
  if (!element) return;
  var header = document.getElementById('navbar');
  var headerPosition = header ? getComputedStyle(header).position : '';
  var headerOffset = headerPosition === 'fixed' ? header.offsetHeight : 0;
  if (headerPosition === 'sticky') headerOffset = header.querySelector('.nav-frame').offsetHeight;
  var top = element.getBoundingClientRect().top + window.scrollY - headerOffset - 20;
  if (id === 'hero') top = 0;
  window.scrollTo({ top: top, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
}

function syncOverlayState() {
  var menu = document.getElementById('mobileMenu');
  var modal = document.getElementById('projectModal');
  var menuOpen = !!menu && menu.classList.contains('flex');
  var modalOpen = !!modal && modal.classList.contains('flex');
  document.body.classList.toggle('menu-is-open', menuOpen);
  document.body.classList.toggle('overlay-is-open', menuOpen || modalOpen);
  document.querySelectorAll('main, footer').forEach(function (element) { element.inert = menuOpen || modalOpen; });
  var nav = document.getElementById('navbar');
  var switcher = document.querySelector('.design-switch');
  if (nav) nav.inert = modalOpen;
  if (switcher) switcher.inert = menuOpen || modalOpen;
  var contactWidget = document.querySelector('.systems-contact-widget');
  if (contactWidget) contactWidget.inert = menuOpen || modalOpen;
  if (nav && menuOpen) nav.classList.remove('reference-header-hidden');
  window.dispatchEvent(new Event('reference-menuchange'));
}

function setMobileMenu(open, restoreFocus) {
  var menu = document.getElementById('mobileMenu');
  if (!menu) return;
  var wasOpen = menu.classList.contains('flex');
  menu.classList.toggle('hidden', !open);
  menu.classList.toggle('flex', open);
  var trigger = document.querySelector('.menu-toggle');
  if (trigger) {
    trigger.setAttribute('aria-expanded', String(open));
    trigger.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    var icon = trigger.querySelector('i');
    if (icon) { icon.classList.toggle('fa-bars', !open); icon.classList.toggle('fa-xmark', open); }
  }
  syncOverlayState();
  if (open) {
    var first = menu.querySelector('a, button');
    if (first) first.focus({ preventScroll: true });
  } else if (wasOpen && trigger && restoreFocus !== false) trigger.focus({ preventScroll: true });
}

function toggleMobileMenu() {
  var menu = document.getElementById('mobileMenu');
  if (menu) setMobileMenu(!menu.classList.contains('flex'));
}

function openProjectModal(src, title, returnFocus) {
  var modal = document.getElementById('projectModal');
  if (!modal) return;
  projectModalReturnFocus = returnFocus || document.activeElement;
  var image = modal.querySelector('img');
  image.src = src;
  image.alt = title;
  modal.setAttribute('aria-label', 'Vista previa: ' + title);
  modal.classList.replace('hidden', 'flex');
  modal.querySelector('button').focus({ preventScroll: true });
  syncOverlayState();
}

function closeProjectModal() {
  var modal = document.getElementById('projectModal');
  if (!modal || !modal.classList.contains('flex')) return;
  modal.classList.replace('flex', 'hidden');
  syncOverlayState();
  if (projectModalReturnFocus && projectModalReturnFocus.isConnected) projectModalReturnFocus.focus({ preventScroll: true });
  projectModalReturnFocus = null;
}

document.addEventListener('keydown', function (event) {
  var modal = document.querySelector('#projectModal.flex');
  var menu = document.querySelector('#mobileMenu.flex');
  if (event.key === 'Escape') {
    if (modal) closeProjectModal();
    else if (menu) setMobileMenu(false);
  }
  if (event.key !== 'Tab' || (!modal && !menu)) return;
  var scope = modal || menu;
  var focusable = Array.from(scope.querySelectorAll('a[href], button:not([disabled]), [tabindex="0"]'));
  if (!modal) focusable.unshift(document.querySelector('.menu-toggle'));
  focusable = focusable.filter(function (element) { return element && element.getClientRects().length; });
  var first = focusable[0];
  var last = focusable[focusable.length - 1];
  if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
  else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
});

document.addEventListener('click', function (event) {
  if (event.target === document.getElementById('projectModal')) closeProjectModal();
});

function showToast(type, message) {
  var existing = document.querySelector('.toast-notification');
  if (existing) existing.remove();
  var toast = document.createElement('div');
  toast.className = 'toast-notification';
  toast.setAttribute('role', type === 'success' ? 'status' : 'alert');
  toast.style.background = type === 'success' ? '#166534' : '#991b1b';
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(function () { toast.remove(); }, 5000);
}
