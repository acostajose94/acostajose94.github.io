document.addEventListener("DOMContentLoaded", () => {
  // Navbar toggle
  const toggler = document.querySelector(".navbar-toggler");
  const nav = document.querySelector(".navbar-collapse");
  if (toggler && nav) {
    toggler.addEventListener("click", (e) => {
      e.stopPropagation();
      nav.classList.toggle("show");
    });
    document.addEventListener("click", (e) => {
      if (!toggler.contains(e.target) && !nav.contains(e.target)) {
        nav.classList.remove("show");
      }
    });
    nav.querySelectorAll(".nav-link").forEach(link => {
      link.addEventListener("click", () => {
        nav.classList.remove("show");
      });
    });
  }

  const scrollBtn = document.querySelector(".scroll-down");
  if (scrollBtn) {
    scrollBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.querySelector("#perfil");
      if (target) target.scrollIntoView({ behavior: "smooth" });
    });
  }

  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });

  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      
      const btn = document.getElementById("btnEnviar");
      const resultado = document.getElementById("resultadoForm");
      
      btn.disabled = true;
      btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin me-2"></i>Enviando...';
      
      const formData = new FormData(contactForm);
      
      try {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          body: formData
        });
        
        const data = await response.json();
        
        if (data.success) {
          showToast('success', '<i class="fa-solid fa-check-circle me-2"></i>¡Mensaje enviado! Te responderé pronto.');
          contactForm.reset();
        } else {
          showToast('danger', '<i class="fa-solid fa-exclamation-circle me-2"></i>Error al enviar. Intenta de nuevo.');
        }
      } catch (error) {
        showToast('danger', '<i class="fa-solid fa-exclamation-circle me-2"></i>Error de conexión. Intenta de nuevo.');
      }
      
      btn.disabled = false;
      btn.innerHTML = '<i class="fa-solid fa-paper-plane me-2"></i>Enviar';
    });
  }

  function showToast(type, message) {
    const toast = document.createElement('div');
    toast.className = `alert alert-${type} toast-notification`;
    toast.innerHTML = message;
    toast.style.cssText = 'position:fixed;top:80px;right:20px;z-index:9999;max-width:350px;animation:fadeInUp 0.3s ease';
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.5s ease';
      setTimeout(() => toast.remove(), 500);
    }, 4000);
  }

  const observerOptions = {
    threshold: 0.3,
    rootMargin: "0px"
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in-up");
      }
    });
  }, observerOptions);

  const animatedElements = document.querySelectorAll(".stat-card, .skill-card, .timeline-item, .exp-card, .cert-card, .portfolio-card, .education-card");
  animatedElements.forEach(el => observer.observe(el));

  const mediaQuery = window.matchMedia('(min-width: 992px)');
  
  function initScrollSnapping() {
    if (!mediaQuery.matches) return;
    
    const sections = document.querySelectorAll('.section');
    const windowHeight = window.innerHeight;
    let isScrolling = false;
    
    window.addEventListener('wheel', (e) => {
      if (isScrolling) return;
      
      const modal = document.getElementById('imgModal');
      if (modal && modal.classList.contains('active')) return;
      
      const delta = e.deltaY;
      const currentScroll = window.scrollY;
      
      let targetSection = Math.round(currentScroll / windowHeight);
      
      if (delta > 0 && targetSection < sections.length - 1) {
        targetSection++;
      } else if (delta < 0 && targetSection > 0) {
        targetSection--;
      } else {
        return;
      }
      
      isScrolling = true;
      sections[targetSection].scrollIntoView({ behavior: 'smooth' });
      
      setTimeout(() => { isScrolling = false; }, 600);
    }, { passive: true });
  }
  
  mediaQuery.addEventListener('change', initScrollSnapping);
  initScrollSnapping();
});
