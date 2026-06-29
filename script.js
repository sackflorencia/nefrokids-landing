/* =================================================================
   NEFROKIDS · Landing page
   JavaScript principal (vanilla, sin dependencias)
   -----------------------------------------------------------------
   Funcionalidades:
     1. Inicialización de íconos Lucide
     2. Navbar: sombra al hacer scroll + menú móvil
     3. Animaciones de aparición (reveal) con IntersectionObserver
     4. Cierre del menú móvil al hacer click en un enlace
     5. Validación visual del formulario de contacto
     6. Año dinámico en el footer
================================================================= */

document.addEventListener("DOMContentLoaded", () => {
  /* ---- 1. Íconos Lucide ---- */
  if (window.lucide) {
    window.lucide.createIcons();
  }

  /* ---- 2. Navbar: sombra al hacer scroll ---- */
  const navbar = document.getElementById("navbar");
  const onScroll = () => {
    if (window.scrollY > 10) {
      navbar.classList.add("is-scrolled");
    } else {
      navbar.classList.remove("is-scrolled");
    }
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---- 2b. Menú móvil ---- */
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");

  navToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  /* ---- 4. Cerrar el menú móvil al navegar ---- */
  navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  /* ---- 3. Animaciones de aparición (fade-in al hacer scroll) ---- */
  const revealEls = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            // pequeño retraso escalonado para un efecto más elegante
            const delay = (index % 4) * 80;
            setTimeout(() => entry.target.classList.add("is-visible"), delay);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    revealEls.forEach((el) => observer.observe(el));
  } else {
    // Fallback: si no hay soporte, mostrar todo
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  /* ---- 5. Validación visual del formulario de contacto ---- */
  const form = document.getElementById("contactForm");
  const feedback = document.getElementById("formFeedback");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const nombre = form.nombre.value.trim();
      const email = form.email.value.trim();
      const mensaje = form.mensaje.value.trim();
      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      if (!nombre || !email || !mensaje) {
        feedback.textContent = "Por favor, completá todos los campos.";
        feedback.style.color = "var(--secondary-dk)";
        return;
      }

      if (!emailOk) {
        feedback.textContent = "Ingresá un correo electrónico válido.";
        feedback.style.color = "var(--secondary-dk)";
        return;
      }

      // Demo: no hay backend conectado todavía.
      feedback.textContent = "¡Gracias! Tu mensaje fue registrado. Te contactaremos pronto.";
      feedback.style.color = "var(--ink)";
      form.reset();
    });
  }

  /* ---- 6. Año dinámico en el footer ---- */
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});
