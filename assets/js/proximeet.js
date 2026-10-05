const menuToggle = document.querySelector(".menu-toggle");
const primaryNav = document.querySelector(".primary-nav");

const header = document.querySelector(".site-header");
if (header && document.body.classList.contains("page-home")) {
  const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 24);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 },
);
document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

const loader = document.createElement("div");
loader.className = "page-loader";
loader.setAttribute("aria-hidden", "true");
loader.innerHTML = '<div class="loader-rings"><i></i><i></i><i></i><span class="loader-pin"></span></div>';
document.body.appendChild(loader);

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

document.addEventListener("click", (event) => {
  const link = event.target.closest("a[href]");
  if (!link || event.defaultPrevented || event.button !== 0) return;
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  if (link.target || link.hasAttribute("download")) return;
  const href = link.getAttribute("href");
  if (!href || href.startsWith("#") || /^(https?:|mailto:|tel:)/.test(href)) return;
  event.preventDefault();
  document.body.classList.add("is-leaving");
  setTimeout(() => { window.location.href = href; }, reducedMotion.matches ? 0 : 420);
});

window.addEventListener("pageshow", (event) => {
  if (event.persisted) document.body.classList.remove("is-leaving");
});


if (menuToggle && primaryNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Open menu" : "Close menu");
    primaryNav.classList.toggle("is-open", !isOpen);
  });

  primaryNav.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open menu");
      primaryNav.classList.remove("is-open");
    }
  });
}

document.querySelectorAll("[data-year]").forEach((year) => {
  year.textContent = new Date().getFullYear();
});

document.querySelectorAll("[data-async-form]").forEach((form) => {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const button = form.querySelector('button[type="submit"]');
    const status = form.querySelector(".form-status");
    button.disabled = true;
    status.textContent = "Sending...";

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });

      if (!response.ok) throw new Error("Submission failed");
      form.reset();
      status.textContent = "Thanks. Your message has been sent.";
    } catch {
      status.textContent = "We could not send that just now. Please email developer@proximeet.ca.";
    } finally {
      button.disabled = false;
    }
  });
});
document.querySelectorAll("[data-carousel]").forEach((carousel) => {
  const track = carousel.querySelector(".carousel-track");
  const prev = carousel.querySelector(".carousel-btn--prev");
  const next = carousel.querySelector(".carousel-btn--next");
  const dotsWrap = carousel.querySelector(".carousel-dots");
  if (!track || !prev || !next || !dotsWrap) return;
  const slides = Array.from(track.children);
  if (slides.length < 2) return;

  let index = 0;
  let timer = null;

  const dots = slides.map((_, i) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "carousel-dot";
    dot.setAttribute("aria-label", `Go to photo ${i + 1} of ${slides.length}`);
    dot.addEventListener("click", () => {
      goTo(i);
      restart();
    });
    dotsWrap.appendChild(dot);
    return dot;
  });

  function goTo(i) {
    index = (i + slides.length) % slides.length;
    track.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((dot, j) => dot.classList.toggle("is-active", j === index));
  }

  function restart() {
    clearInterval(timer);
    if (!reducedMotion.matches) timer = setInterval(() => goTo(index + 1), 5500);
  }

  prev.addEventListener("click", () => {
    goTo(index - 1);
    restart();
  });
  next.addEventListener("click", () => {
    goTo(index + 1);
    restart();
  });

  let startX = null;
  carousel.addEventListener("pointerdown", (event) => {
    if (event.target.closest("button")) return;
    startX = event.clientX;
  });
  carousel.addEventListener("pointerup", (event) => {
    if (startX === null) return;
    const dx = event.clientX - startX;
    startX = null;
    if (Math.abs(dx) > 40) {
      goTo(index + (dx < 0 ? 1 : -1));
      restart();
    }
  });
  carousel.addEventListener("pointercancel", () => {
    startX = null;
  });

  carousel.addEventListener("mouseenter", () => clearInterval(timer));
  carousel.addEventListener("mouseleave", restart);

  goTo(0);
  restart();
});
