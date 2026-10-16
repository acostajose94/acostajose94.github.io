var currentYearEl = document.getElementById("currentYear");
if (currentYearEl) currentYearEl.textContent = new Date().getFullYear();

document.addEventListener("DOMContentLoaded", function () {
  initializeDesignSwitch();

  var navbar = document.getElementById("navbar");
  if (navbar) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    });
  }

  var textElement = document.getElementById("typing-text");
  if (textElement) {
    var fullText = "Ingeniero de Sistemas | Analista TI";
    var index = 0;
    var typeInterval = setInterval(function () {
      if (index <= fullText.length) {
        textElement.textContent = fullText.slice(0, index);
        index++;
      } else {
        clearInterval(typeInterval);
      }
    }, 100);
  }

  var contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", async function (e) {
      e.preventDefault();
      var btn = document.getElementById("btnEnviar");
      btn.disabled = true;
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
      var formData = new FormData(contactForm);
      if (!formData.has("access_key")) {
        formData.append("access_key", "e174203b-7c32-4fb7-b01a-d5fabb6bfe5f");
      }
      try {
        var response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          body: formData,
        });
        var data = await response.json();
        if (data.success) {
          showToast("success", '<i class="fas fa-check-circle"></i> Mensaje enviado con exito.');
          contactForm.reset();
        } else {
          showToast("danger", '<i class="fas fa-exclamation-circle"></i> Error al enviar. Intenta de nuevo.');
        }
      } catch (error) {
        showToast("danger", '<i class="fas fa-exclamation-circle"></i> Error de conexion. Intenta de nuevo.');
      }
      btn.disabled = false;
      btn.innerHTML = '<i class="fas fa-paper-plane"></i> Enviar Mensaje';
    });
  }

  if (typeof Swiper !== "undefined") {
    new Swiper(".projectSwiper", {
      slidesPerView: 1,
      spaceBetween: 24,
      loop: true,
      autoplay: { delay: 5000 },
      pagination: { el: ".swiper-pagination", clickable: true },
      navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
      breakpoints: {
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      },
    });
    new Swiper(".appsSwiper", {
      slidesPerView: 1,
      spaceBetween: 24,
      loop: true,
      autoplay: { delay: 6000 },
      pagination: { el: ".swiper-pagination", clickable: true },
      navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
      breakpoints: {
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 4 },
      },
    });
  }
});

function initializeDesignSwitch() {
  var root = document.documentElement;
  if (!root.dataset.design) {
    try {
      var saved = localStorage.getItem("ja-design") || "original";
      root.dataset.design = saved === "classic" ? "original" : saved === "atelier" ? "tecnofil" : saved;
    } catch (error) { root.dataset.design = "original"; }
  }
  var designs = [
    { id: "original", name: "Original" },
    { id: "systems", name: "Sistemas Perú Web" },
    { id: "tecnofil", name: "Tecnofil" },
  ];
  var themeColors = { original: "#020617", systems: "#3161A3", tecnofil: "#FFDB00" };
  var browserThemeColor = document.querySelector('meta[name="theme-color"]');
  var switcher = document.createElement("button");
  switcher.type = "button";
  switcher.className = "design-switch";
  switcher.innerHTML = '<span class="design-switch__icon" aria-hidden="true"><i class="fa-solid fa-layer-group"></i></span><span class="design-switch__copy"><span class="design-switch__eyebrow">ESTÁS VIENDO</span><span class="design-switch__label" aria-live="polite"></span><span class="design-switch__next"></span></span>';
  document.body.appendChild(switcher);

  var cursor = document.createElement("div");
  cursor.id = "puntero";
  cursor.className = "puntero cursor cursor--plus";
  cursor.setAttribute("aria-hidden", "true");
  cursor.innerHTML = '<span class="cursor__bg"></span><i class="fa-solid fa-plus" aria-hidden="true"></i><i class="fa-solid fa-arrow-left" aria-hidden="true"></i><i class="fa-solid fa-arrow-right" aria-hidden="true"></i><i class="fa-solid fa-xmark" aria-hidden="true"></i>';
  document.body.appendChild(cursor);

  function updateSwitch() {
    var index = designs.findIndex(function (design) { return design.id === root.dataset.design; });
    if (index < 0) index = 0;
    root.dataset.design = designs[index].id;
    var next = designs[(index + 1) % designs.length];
    switcher.querySelector(".design-switch__label").textContent = designs[index].name;
    switcher.querySelector(".design-switch__next").textContent = "Siguiente: " + next.name + "  ↗";
    switcher.setAttribute("aria-label", "Estás viendo " + designs[index].name + ". Cambiar al diseño " + next.name);
    if (browserThemeColor) browserThemeColor.content = themeColors[designs[index].id];
    if (root.dataset.design === "systems") initializeSystemsCanvas();
    var referenceVideo = document.querySelector(".tecnofil-video");
    if (referenceVideo) {
      if (root.dataset.design === "tecnofil") {
        referenceVideo.preload = "metadata";
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          referenceVideo.pause();
        } else {
          var playback = referenceVideo.play();
          if (playback && playback.catch) playback.catch(function () {});
        }
      } else {
        referenceVideo.pause();
      }
    }
  }
  updateSwitch();

  switcher.addEventListener("click", function () {
    var currentIndex = designs.findIndex(function (design) { return design.id === root.dataset.design; });
    root.dataset.design = designs[(currentIndex + 1) % designs.length].id;
    try { localStorage.setItem("ja-design", root.dataset.design); } catch (error) { /* La selección sigue activa durante esta visita. */ }
    updateSwitch();
  });

  if (window.matchMedia && window.matchMedia("(pointer: fine)").matches) {
    window.addEventListener("pointermove", function (event) {
      cursor.style.left = event.clientX + "px";
      cursor.style.top = event.clientY + "px";
    });

    document.addEventListener("pointerover", function (event) {
      var target = event.target.closest("a, button, .swiper-slide");
      if (!target || root.dataset.design !== "tecnofil") return;
      cursor.classList.add("cursor--scale");
      cursor.classList.toggle("cursor--yellow", target.closest(".design-switch, #navbar.scrolled"));
      cursor.classList.toggle("cursor--contrast", !!target.closest("#navbar"));
      cursor.classList.toggle("cursor--close", !!target.closest("#navbar button.md\\:hidden") && document.getElementById("mobileMenu").classList.contains("flex"));
      cursor.classList.toggle("cursor--plus", !target.closest("#navbar button.md\\:hidden"));
    });
    document.addEventListener("pointerout", function (event) {
      if (!event.target.closest("a, button, .swiper-slide")) return;
      cursor.classList.remove("cursor--scale", "cursor--yellow", "cursor--contrast", "cursor--left", "cursor--right", "cursor--close");
      cursor.classList.add("cursor--plus");
    });
  }
}

var systemsCanvasStarted = false;
function initializeSystemsCanvas() {
  if (systemsCanvasStarted) return;
  var hero = document.getElementById("hero");
  var cacheCanvas = hero && hero.querySelector(".systems-canvas--cache");
  var canvas = hero && hero.querySelector(".systems-canvas--main");
  if (!cacheCanvas || !canvas) return;
  systemsCanvasStarted = true;

  var ctx = canvas.getContext("2d");
  var cacheCtx = cacheCanvas.getContext("2d");
  var bounds = { width: 0, height: 0 };
  var paths = [];
  var dpr = window.devicePixelRatio || 1;
  var grid = 100;
  var t = 0;
  var target = 1;
  var velocity = 0;
  var frame = 0;

  function clamp(value, min, max) { return Math.min(Math.max(value, min), max); }
  function quantize(value) { return Math.floor(value / grid) * grid + grid / 2; }
  function randomPoint() { return [quantize(Math.random() * bounds.width), quantize(Math.random() * bounds.height)]; }

  function makePath(startX, startY, endX, endY) {
    var dx = endX - startX;
    var dy = endY - startY;
    var angle = Math.atan2(dy, -dx) + Math.PI * 1.25;
    var elbowX;
    var elbowY;
    if (angle % Math.PI < Math.PI / 2) {
      if (Math.random() > .5) { elbowX = endX - Math.abs(dy) * Math.sign(dx); elbowY = startY; }
      else { elbowX = startX + Math.abs(dy) * Math.sign(dx); elbowY = endY; }
    } else if (Math.random() > .5) {
      elbowX = startX; elbowY = endY - Math.abs(dx) * Math.sign(dy);
    } else {
      elbowX = endX; elbowY = startY + Math.abs(dx) * Math.sign(dy);
    }
    return [startX, startY, elbowX, elbowY, endX, endY];
  }

  function makePaths(startX, startY) {
    var count = Math.floor(bounds.width * bounds.height / 50000 * dpr);
    paths = new Array(count);
    for (var i = 0; i < count; i++) {
      var start = startX === null ? randomPoint() : [startX, startY];
      var end = randomPoint();
      paths[i] = makePath(start[0], start[1], end[0], end[1]);
    }
  }

  function pointOnPath(path, progress) {
    var segment = clamp(progress, 0, .999999) * 2;
    var index = Math.floor(segment) * 2;
    var fraction = segment - Math.floor(segment);
    return [path[index] + (path[index + 2] - path[index]) * fraction, path[index + 1] + (path[index + 3] - path[index + 1]) * fraction];
  }

  function drawLines() {
    cacheCtx.clearRect(0, 0, bounds.width, bounds.height);
    cacheCtx.beginPath();
    paths.forEach(function (path) {
      cacheCtx.moveTo(path[0], path[1]);
      cacheCtx.lineTo(path[2], path[3]);
      cacheCtx.lineTo(path[4], path[5]);
    });
    cacheCtx.stroke();
  }

  function draw() {
    ctx.clearRect(0, 0, bounds.width, bounds.height);
    ctx.beginPath();
    paths.forEach(function (path) {
      var from = pointOnPath(path, t - .1);
      var to = pointOnPath(path, t + .1);
      ctx.moveTo(from[0], from[1]);
      var bend = pointOnPath(path, .5);
      if (t - .1 < .5 && t + .1 > .5) ctx.lineTo(bend[0], bend[1]);
      ctx.lineTo(to[0], to[1]);
    });
    ctx.stroke();
    paths.forEach(function (path) {
      var start = pointOnPath(path, 0);
      var end = pointOnPath(path, 1);
      ctx.beginPath(); ctx.arc(start[0], start[1], Math.max(0, t * 10), 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.arc(end[0], end[1], Math.max(0, t * 10), 0, Math.PI * 2); ctx.fill();
    });
  }

  function resize() {
    var rect = hero.getBoundingClientRect();
    bounds.width = rect.width;
    bounds.height = rect.height;
    dpr = window.devicePixelRatio || 1;
    [canvas, cacheCanvas].forEach(function (element) {
      element.width = Math.round(bounds.width * dpr);
      element.height = Math.round(bounds.height * dpr);
      element.style.width = bounds.width + "px";
      element.style.height = bounds.height + "px";
    });
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    cacheCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.lineWidth = 4; ctx.strokeStyle = "#32E4B0"; ctx.fillStyle = "#32E4B0";
    cacheCtx.lineWidth = 2; cacheCtx.strokeStyle = "rgba(0,0,0,.2)";
    makePaths(null, null); drawLines(); t = 0; target = 1;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { t = .5; draw(); }
  }

  function animateFrom(x, y) { makePaths(x, y); drawLines(); t = 0; target = 1; }
  function loop() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    frame = requestAnimationFrame(loop);
    velocity += (-8.5 * (t - target) - 61 * velocity) / 200;
    if (Math.abs(velocity) > .0001) { t = clamp(t + velocity, 0, .999999); draw(); }
  }

  hero.addEventListener("pointermove", function (event) {
    var rect = hero.getBoundingClientRect();
    target = clamp((event.clientX - rect.left) / bounds.width, 0, .999999);
  });
  hero.addEventListener("pointerdown", function (event) {
    var rect = hero.getBoundingClientRect();
    animateFrom(event.clientX - rect.left, event.clientY - rect.top);
  });
  window.addEventListener("resize", resize);
  resize();
  frame = requestAnimationFrame(loop);
}

function scrollToSection(id) {
  var element = document.getElementById(id);
  if (element) {
    var top = element.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top: top, behavior: "smooth" });
  }
}

function toggleMobileMenu() {
  var menu = document.getElementById("mobileMenu");
  if (menu) {
    menu.classList.toggle("hidden");
    menu.classList.toggle("flex");
    var isOpen = menu.classList.contains("flex");
    document.body.classList.toggle("menu-is-open", isOpen);
    var trigger = document.querySelector('#navbar button[aria-controls="mobileMenu"]');
    if (trigger) {
      trigger.setAttribute("aria-expanded", isOpen ? "true" : "false");
      trigger.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
    }
    var cursor = document.getElementById("puntero");
    if (cursor && document.documentElement.dataset.design === "tecnofil") {
      cursor.classList.toggle("cursor--close", isOpen);
      cursor.classList.toggle("cursor--plus", !isOpen);
    }
  }
}

function openProjectModal(imgSrc, title) {
  var modal = document.getElementById("projectModal");
  var modalImg = document.getElementById("modalImage");
  modalImg.src = imgSrc;
  modalImg.alt = title;
  modal.classList.remove("hidden");
  modal.classList.add("flex");
  document.body.style.overflow = "hidden";
}

function closeProjectModal() {
  var modal = document.getElementById("projectModal");
  modal.classList.add("hidden");
  modal.classList.remove("flex");
  document.body.style.overflow = "auto";
}

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeProjectModal();
    var menu = document.getElementById("mobileMenu");
    if (menu && menu.classList.contains("flex")) toggleMobileMenu();
  }
});

document.addEventListener("click", function (e) {
  var modal = document.getElementById("projectModal");
  if (e.target === modal) closeProjectModal();
});

function showToast(type, message) {
  var existing = document.querySelector(".toast-notification");
  if (existing) existing.remove();
  var toast = document.createElement("div");
  toast.className = "toast-notification fixed top-20 right-5 z-50 p-4 rounded-lg text-white";
  toast.setAttribute("role", "status");
  toast.setAttribute("aria-live", "polite");
  toast.style.background = type === "success" ? "rgba(34, 197, 94, 0.9)" : "rgba(239, 68, 68, 0.9)";
  toast.innerHTML = message;
  document.body.appendChild(toast);
  setTimeout(function () {
    toast.style.opacity = "0";
    toast.style.transition = "opacity 0.5s ease";
    setTimeout(function () { toast.remove(); }, 500);
  }, 4000);
}
