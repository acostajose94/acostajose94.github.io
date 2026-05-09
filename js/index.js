// Base styles - Tailwind handles most styling

document.addEventListener("DOMContentLoaded", () => {
  // Navbar scroll effect
  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Typing effect
  const textElement = document.getElementById("typing-text");
  if (textElement) {
    const fullText = "Desarrollador Full Stack";
    let index = 0;
    
    const typeInterval = setInterval(() => {
      if (index <= fullText.length) {
        textElement.textContent = fullText.slice(0, index);
        index++;
      } else {
        clearInterval(typeInterval);
      }
    }, 100);
  }

  // Contact form
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      
      const btn = document.getElementById("btnEnviar");
      btn.disabled = true;
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
      
      const formData = new FormData(contactForm);
      formData.append("access_key", "a1b2c3d4-e5f6-7890-abcd-ef1234567890");
      
      try {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          body: formData
        });
        
        const data = await response.json();
        
        if (data.success) {
          showToast("success", '<i class="fas fa-check-circle"></i> ¡Mensaje enviado! Te responderé pronto.');
          contactForm.reset();
        } else {
          showToast("danger", '<i class="fas fa-exclamation-circle"></i> Error al enviar. Intenta de nuevo.');
        }
      } catch (error) {
        showToast("danger", '<i class="fas fa-exclamation-circle"></i> Error de conexión. Intenta de nuevo.');
      }
      
      btn.disabled = false;
      btn.innerHTML = '<i class="fas fa-paper-plane"></i> Enviar Mensaje';
    });
  }
});

// Scroll to section
function scrollTo(id) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
}

// Toggle mobile menu
function toggleMobileMenu() {
  const menu = document.getElementById("mobile-menu");
  if (menu) {
    menu.classList.toggle("hidden");
    menu.classList.toggle("flex");
  }
}

// Project modal
function openProjectModal(imgSrc, title) {
  const modal = document.getElementById("projectModal");
  const modalImg = document.getElementById("modalImage");
  modalImg.src = imgSrc;
  modalImg.alt = title;
  modal.classList.remove("hidden");
  modal.classList.add("flex");
  document.body.style.overflow = "hidden";
}

function closeProjectModal() {
  const modal = document.getElementById("projectModal");
  modal.classList.add("hidden");
  modal.classList.remove("flex");
  document.body.style.overflow = "auto";
}

// Close modal on escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeProjectModal();
  }
});

// Close modal on click outside
document.addEventListener("click", (e) => {
  const modal = document.getElementById("projectModal");
  if (e.target === modal) {
    closeProjectModal();
  }
});

// Toast notification
function showToast(type, message) {
  const existing = document.querySelector(".toast-notification");
  if (existing) existing.remove();
  
  const toast = document.createElement("div");
  toast.className = `toast-notification fixed top-20 right-5 z-50 p-4 rounded-lg text-white`;
  toast.style.background = type === "success" ? "rgba(34, 197, 94, 0.9)" : "rgba(239, 68, 68, 0.9)";
  toast.innerHTML = message;
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transition = "opacity 0.5s ease";
    setTimeout(() => toast.remove(), 500);
  }, 4000);
}