document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".timeline-slide");

  // IntersectionObserver for timeline slides (if present)
  if (slides.length) {
    const options = { threshold: 0.6 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          slides.forEach(s => s.classList.remove("active"));
          entry.target.classList.add("active");
        }
      });
    }, options);
    slides.forEach(slide => observer.observe(slide));
  }

  // Mobile nav toggle behaviour: looks for a .nav-toggle button and toggles .open on .nav-links
  // Find the nav-toggle and operate relative to its nearest .nav-inner
  const navToggle = document.querySelector('.nav-toggle');
  if (navToggle) {
    const navInner = navToggle.closest('.nav-inner');
    const navLinks = navInner ? navInner.querySelector('.nav-links') : null;
    const navAuth = navInner ? navInner.querySelector('.nav-auth') : null;

    const toggleMenu = () => {
      if (!navInner) return;
      navInner.classList.toggle('menu-open');
      const isOpen = navInner.classList.contains('menu-open');
      // prevent body scroll when nav open on very small devices
      document.body.style.overflow = isOpen ? 'hidden' : '';

      if (navAuth) {
        if (window.innerWidth <= 768 && isOpen) navAuth.classList.add('hide-signup');
        else navAuth.classList.remove('hide-signup');
      }
    };

    navToggle.addEventListener('click', toggleMenu);

    // close menu when a link inside the navLinks is clicked
    if (navLinks) {
      navLinks.addEventListener('click', (e) => {
        if (e.target.tagName === 'A' && navInner.classList.contains('menu-open')) {
          navInner.classList.remove('menu-open');
          document.body.style.overflow = '';
          if (navAuth) navAuth.classList.remove('hide-signup');
        }
      });
    }

    // Ensure header state updates on resize (remove hide-signup on larger screens)
    window.addEventListener('resize', () => {
      if (!navAuth || !navInner) return;
      if (window.innerWidth > 768) navAuth.classList.remove('hide-signup');
      else {
        if (navInner.classList.contains('menu-open')) navAuth.classList.add('hide-signup');
      }
    });
  }
});


/* ===== SAHIKO SCROLL ANIMATION OBSERVER ===== */
const animatedEls = document.querySelectorAll("[data-animate]");

const sahikoObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        sahikoObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18 }
);

animatedEls.forEach(el => sahikoObserver.observe(el));
// Parallax depth effect
window.addEventListener("scroll", () => {
  const scrolled = window.scrollY;
  document.querySelectorAll(".intro, .lessons-hero").forEach(el => {
    el.style.transform = `translateY(${scrolled * 0.04}px)`;
  });
});


const sections = document.querySelectorAll("section");

const focusObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      entry.target.classList.toggle("dim", !entry.isIntersecting);
    });
  },
  { threshold: 0.4 }
);

sections.forEach(section => focusObserver.observe(section));

//header up
let lastScroll = 0;
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  const currentScroll = window.scrollY;
  navbar.style.transform =
    currentScroll > lastScroll && currentScroll > 100
      ? "translateY(-100%)"
      : "translateY(0)";
  lastScroll = currentScroll;
});


