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
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      
      const nombre = document.getElementById("nombre").value.trim();
      const email = document.getElementById("email").value.trim();
      const asunto = document.getElementById("asunto").value.trim();
      const mensaje = document.getElementById("mensaje").value.trim();

      if (!nombre || !email || !asunto || !mensaje) {
        alert("Por favor, completa todos los campos requeridos.");
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert("Por favor, ingresa un email válido.");
        return;
      }

      const mailtoLink = `mailto:gamar30@gmail.com?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(`Nombre: ${nombre}\nEmail: ${email}\n\nMensaje:\n${mensaje}`)}`;
      window.location.href = mailtoLink;
      contactForm.reset();
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
