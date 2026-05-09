var currentYearEl = document.getElementById("currentYear");
if (currentYearEl) currentYearEl.textContent = new Date().getFullYear();

document.addEventListener("DOMContentLoaded", function () {
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
  if (e.key === "Escape") closeProjectModal();
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
  toast.style.background = type === "success" ? "rgba(34, 197, 94, 0.9)" : "rgba(239, 68, 68, 0.9)";
  toast.innerHTML = message;
  document.body.appendChild(toast);
  setTimeout(function () {
    toast.style.opacity = "0";
    toast.style.transition = "opacity 0.5s ease";
    setTimeout(function () { toast.remove(); }, 500);
  }, 4000);
}
