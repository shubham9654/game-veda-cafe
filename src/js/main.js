const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
const yearEl = document.getElementById("year");
const themeToggle = document.getElementById("themeToggle");

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
    localStorage.setItem(
      "theme",
      document.body.classList.contains("light-mode") ? "light" : "dark"
    );
  });
}

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

// Hero Image Slider
const heroSlider = document.getElementById('heroSlider');
if (heroSlider) {
  const slides = heroSlider.querySelectorAll('.slide');
  let currentSlide = 0;
  
  if (slides.length > 1) {
    setInterval(() => {
      slides[currentSlide].classList.remove('slide-active');
      currentSlide = (currentSlide + 1) % slides.length;
      slides[currentSlide].classList.add('slide-active');
    }, 3500);
  }
}

// Header Scroll Effect
const header = document.querySelector('.site-header');
if (header) {
  const handleScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  
  window.addEventListener('scroll', handleScroll);
  // Check on initial load
  handleScroll();
}

// Reviews slider dynamic rendering and scroll buttons
const reviewsSlider = document.getElementById('reviewsSlider');
const reviewPrev = document.getElementById('reviewPrev');
const reviewNext = document.getElementById('reviewNext');

if (reviewsSlider && window.REVIEWS_DATA) {
  // Render reviews from JS data
  window.REVIEWS_DATA.forEach((review, index) => {
    const article = document.createElement('article');
    article.className = 'testimonial reveal';
    article.style.animationDelay = `${index * 0.1}s`;
    
    article.innerHTML = `
      <div class="reviewer-top">
        <span class="avatar-big" style="background:${review.avatar}"></span>
        <div>
          <strong>${review.name}</strong>
          <div class="stars-row sm">
            ${'<i data-lucide="star" class="star-filled"></i>'.repeat(review.rating)}
          </div>
        </div>
      </div>
      <p>"${review.text}"</p>
    `;
    reviewsSlider.appendChild(article);
    if (typeof revealObserver !== 'undefined') {
      revealObserver.observe(article);
    }
  });
  
  // Re-initialize lucide icons for the newly added icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  if (reviewPrev && reviewNext) {
    const scrollAmount = 320;
    reviewPrev.addEventListener('click', () => {
      reviewsSlider.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });
    reviewNext.addEventListener('click', () => {
      reviewsSlider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
  }
}

// Pricing Card Option Selection
const selectors = document.querySelectorAll('.price-selector');
const buttons = document.querySelectorAll('.price-btn');

selectors.forEach(selector => {
  selector.addEventListener('change', (e) => {
    const zone = selector.dataset.zone;
    const selectedValue = e.target.value;
    const button = document.querySelector(`.price-btn[data-zone="${zone}"]`);
    const card = selector.closest('.price-card');
    const priceRows = card.querySelectorAll('.price-row');
    
    // Remove all highlights
    priceRows.forEach(row => row.classList.remove('highlight-row'));
    
    if (selectedValue) {
      button.disabled = false;
      button.title = 'Click to book';
      button.dataset.package = selectedValue;
      
      // Highlight selected row
      const selectedIndex = parseInt(selectedValue.split('-')[1]) - 1;
      if (priceRows[selectedIndex]) {
        priceRows[selectedIndex].classList.add('highlight-row');
      }
    } else {
      button.disabled = true;
      button.title = 'Select an option first';
      delete button.dataset.package;
    }
  });
});

buttons.forEach(button => {
  button.addEventListener('click', (e) => {
    if (!button.disabled && button.dataset.package) {
      e.preventDefault();
      window.location.href = `book.html?package=${button.dataset.package}`;
    }
  });
});
