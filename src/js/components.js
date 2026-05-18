const siteHeaderTemplate = `
  <header class="site-header">
    <nav class="nav-inner">
      <a href="index.html" class="logo">
        <img data-field="logo-img" src="/src/images/logo.png" width="60" alt="Game Veda Logo" class="logo-img" />
      </a>

      <ul class="nav-links" id="navLinks">
        <li><a href="index.html#zones" class="nav-link">Zones</a></li>
        <li><a href="index.html#pricing" class="nav-link">Pricing</a></li>
        <li><a href="index.html#membership" class="nav-link">Membership</a></li>
        <li><a href="index.html#gallery" class="nav-link">Gallery</a></li>
      </ul>

      <div class="nav-right-actions">
        <button id="themeToggle" class="theme-toggle" aria-label="Toggle theme">
          <i data-lucide="sun" class="sun-icon"></i>
          <i data-lucide="moon" class="moon-icon"></i>
        </button>
        <a href="book.html" class="btn-primary nav-cta">Book Now</a>
        <button id="menuBtn" class="hamburger" aria-label="Open menu">
          <i data-lucide="menu"></i>
        </button>
      </div>
    </nav>

    <!-- Mobile menu -->
    <div id="mobileMenu" class="mobile-menu hidden">
      <a class="mobile-link" href="index.html">Home</a>
      <a class="mobile-link" href="index.html#zones">Zones</a>
      <a class="mobile-link" href="index.html#pricing">Pricing</a>
      <a class="mobile-link" href="index.html#membership">Membership</a>
      <a class="mobile-link" href="book.html">Book Now</a>
    </div>
  </header>
`;

const siteFooterTemplate = `
  <footer id="contact" class="site-footer">
    <div class="footer-top">
      <div class="container footer-grid">

        <!-- Visit Us -->
        <div class="footer-col reveal">
          <p class="footer-label"><i data-lucide="map-pin"></i> VISIT US</p>
          <div class="footer-logo-wrap">
            <img data-field="logo-img" src="/src/images/logo.png" alt="Game Veda Logo" class="footer-logo-img" />
          </div>
          <p class="footer-sub">Game Veda is a premium gaming café where fun meets competition. Play, compete &amp; create memories.</p>
          <ul class="footer-contact-list">
            <li><i data-lucide="map-pin"></i> <span data-field="address">Floor R2-123, Puram Nagar, Palam Colony, New Delhi - 110045</span></li>
            <li><i data-lucide="phone"></i> <a data-field="phone-link" href="tel:919717689596">+91 97176 89596</a></li>
            <li><i data-lucide="mail"></i> <span data-field="email">hello@gameveda.in</span></li>
            <li><i data-lucide="clock"></i> <span data-field="hours">Mon - Sun : 11:00 AM - 11:00 PM</span></li>
          </ul>
          <div class="social-row">
            <a data-field="instagram" href="https://instagram.com/gameveda" class="social-btn" aria-label="Instagram"><i data-lucide="instagram"></i></a>
            <a data-field="facebook" href="https://facebook.com/gameveda" class="social-btn" aria-label="Facebook"><i data-lucide="facebook"></i></a>
            <a data-field="youtube" href="https://youtube.com/@gameveda" class="social-btn" aria-label="YouTube"><i data-lucide="youtube"></i></a>
          </div>
        </div>

        <!-- Map -->
        <div class="footer-col map-col reveal delay-1">
          <div class="map-box">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.4663509644447!2d77.0895165!3d28.585783300000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1b001996f733%3A0xa77437414f1985a2!2sPalam%20ram%20Chowk!5e0!3m2!1sen!2sin!4v1777666616676!5m2!1sen!2sin" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          </div>
        </div>

        <!-- Help Links -->
        <div class="footer-col reveal delay-2">
          <div class="footer-links-row">
            <div>
              <p class="footer-label">HELP</p>
              <ul class="footer-links">
                <li><a href="contact.html"><i data-lucide="chevron-right"></i> Contact Us</a></li>
                <li><a href="faqs.html"><i data-lucide="chevron-right"></i> FAQs</a></li>
                <li><a href="terms.html"><i data-lucide="chevron-right"></i> Terms &amp; Conditions</a></li>
                <li><a href="privacy.html"><i data-lucide="chevron-right"></i> Privacy Policy</a></li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Ready to Play -->
        <div class="footer-col reveal delay-3">
          <p class="footer-label"><i data-lucide="zap"></i> READY TO PLAY?</p>
          <p class="footer-ready-sub">Book your slot now and level up your experience!</p>
          <div class="footer-cta-btns">
            <a href="book.html" class="btn-primary footer-cta"><i data-lucide="calendar-check"></i> BOOK YOUR SLOT</a>
            <a data-field="whatsapp-link" data-msg="Hi, I want to book a slot at Game Veda!" href="https://wa.me/919717689596" class="btn-whatsapp"><i data-lucide="message-circle"></i> WHATSAPP US</a>
          </div>
          <div class="footer-follow">
            <p class="footer-label">FOLLOW US</p>
            <div class="social-row">
              <a data-field="instagram" href="https://instagram.com/gameveda" class="social-btn" aria-label="Instagram"><i data-lucide="instagram"></i></a>
              <a data-field="youtube" href="https://youtube.com/@gameveda" class="social-btn" aria-label="YouTube"><i data-lucide="youtube"></i></a>
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- Footer bottom bar -->
    <div class="footer-bottom">
      <div class="container footer-bar">
        <div class="footer-brand-mini">
          <img data-field="logo-img" src="/src/images/logo.png" alt="Game Veda" class="footer-mini-logo" />
          <div>GAME <span>VEDA</span></div>
        </div>
        <p>© <span id="year"></span> <span data-field="brand-name">Game Veda</span>. All rights reserved.</p>
      </div>
    </div>
  </footer>
`;

// Inject components immediately (relies on script being deferred or placed at bottom of body)
const headerPlaceholder = document.getElementById('header-component');
const footerPlaceholder = document.getElementById('footer-component');

if (headerPlaceholder) {
  headerPlaceholder.innerHTML = siteHeaderTemplate;
}
if (footerPlaceholder) {
  footerPlaceholder.innerHTML = siteFooterTemplate;
}
