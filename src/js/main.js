const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
const yearEl = document.getElementById("year");

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

if (menuBtn && mobileMenu) {
  menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
    });
  });
}

const revealItems = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14, rootMargin: "0px 0px -5% 0px" }
);

revealItems.forEach((item) => revealObserver.observe(item));

const tiltCard = document.querySelector(".tilt-card");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (tiltCard && !reducedMotion) {
  let frame;

  const onMove = (event) => {
    const rect = tiltCard.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateY = ((x / rect.width) - 0.5) * 8;
    const rotateX = (0.5 - (y / rect.height)) * 8;

    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      tiltCard.style.transform = `perspective(900px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;
    });
  };

  const resetTilt = () => {
    tiltCard.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
  };

  tiltCard.addEventListener("mousemove", onMove);
  tiltCard.addEventListener("mouseleave", resetTilt);
}
