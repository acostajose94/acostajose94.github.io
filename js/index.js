document.addEventListener("DOMContentLoaded", () => {
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
      resultado.innerHTML = '';
      
      const formData = new FormData(contactForm);
      
      try {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          body: formData
        });
        
        const data = await response.json();
        
        if (data.success) {
          resultado.innerHTML = '<div class="alert alert-success"><i class="fa-solid fa-check-circle me-2"></i>¡Mensaje enviado! Te responderé pronto.</div>';
          contactForm.reset();
        } else {
          resultado.innerHTML = '<div class="alert alert-danger"><i class="fa-solid fa-exclamation-circle me-2"></i>Error al enviar. Intenta de nuevo.</div>';
        }
      } catch (error) {
        resultado.innerHTML = '<div class="alert alert-danger"><i class="fa-solid fa-exclamation-circle me-2"></i>Error de conexión. Intenta de nuevo.</div>';
      }
      
      btn.disabled = false;
      btn.innerHTML = '<i class="fa-solid fa-paper-plane me-2"></i>Enviar';
    });
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

  document.querySelectorAll(".stat-card, .skill-card, .timeline-item, .exp-card, .cert-card, .portfolio-card, .education-card").forEach(el => {
    observer.observe(el);
  });

  if (window.innerWidth >= 992) {
    const sections = document.querySelectorAll('.section');
    let isScrolling = false;
    
    window.addEventListener('wheel', (e) => {
      if (isScrolling) return;
      
      const delta = e.deltaY;
      const windowHeight = window.innerHeight;
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
});
