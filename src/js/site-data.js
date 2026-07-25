/**
 * site-data.js
 * Loads /src/data/site.json and populates all [data-field] elements across every page.
 * Change data in site.json → every page updates automatically.
 */

(async function () {
  let d;
  try {
    const res = await fetch('/src/data/site.json');
    d = await res.json();
  } catch (e) {
    console.warn('site-data.js: could not load site.json', e);
    return;
  }

  /* ── Helper ─────────────────────────────────────── */
  function fill(selector, value) {
    document.querySelectorAll(selector).forEach(el => {
      if (el.tagName === 'A') el.href = value;
      else if (el.tagName === 'IMG') el.src = value;
      else el.textContent = value;
    });
  }
  function attr(selector, attribute, value) {
    document.querySelectorAll(selector).forEach(el => el.setAttribute(attribute, value));
  }

  /* ── Brand ──────────────────────────────────────── */
  fill('[data-field="brand-name"]', d.brand.name);
  fill('[data-field="brand-tagline"]', d.brand.tagline);
  attr('[data-field="logo-img"]', 'src', d.brand.logo);
  attr('[data-field="logo-img"]', 'alt', d.brand.logoAlt);

  /* ── Contact ────────────────────────────────────── */
  fill('[data-field="phone"]', d.contact.phone);
  fill('[data-field="email"]', d.contact.email);
  fill('[data-field="address"]', d.contact.address);
  fill('[data-field="hours"]', d.contact.hours);

  // Phone hrefs
  document.querySelectorAll('[data-field="phone-link"]').forEach(el => {
    el.href = 'tel:' + d.contact.phoneRaw;
    el.textContent = d.contact.phone;
  });

  // WhatsApp hrefs
  document.querySelectorAll('[data-field="whatsapp-link"]').forEach(el => {
    const msg = el.dataset.msg || 'Hi, I want to book a slot at Game Veda!';
    el.href = `https://wa.me/${d.contact.whatsapp}?text=${encodeURIComponent(msg)}`;
  });

  /* ── Social ─────────────────────────────────────── */
  attr('[data-field="instagram"]', 'href', d.social.instagram);
  attr('[data-field="facebook"]',  'href', d.social.facebook);
  attr('[data-field="youtube"]',   'href', d.social.youtube);

  /* ── Booking form – package select ─────────────── */
  const sel = document.getElementById('package');
  if (sel) {
    const currentVal = sel.value;

    // Clear all except placeholder
    while (sel.options.length > 1) sel.remove(1);

    // Membership group
    const memGroup = document.createElement('optgroup');
    memGroup.label = 'Membership Plans';
    d.membership.forEach(m => {
      const o = new Option(`${m.name} Plan – ${m.hours}h (₹${m.price.toLocaleString('en-IN')})`, m.id);
      memGroup.appendChild(o);
    });
    sel.appendChild(memGroup);

    // PlayStation group
    const psGroup = document.createElement('optgroup');
    psGroup.label = 'PlayStation';
    d.pricing.playstation.forEach((p, i) => {
      const o = new Option(`PlayStation – ${p.label} (₹${p.price})`, `ps-${i + 1}`);
      psGroup.appendChild(o);
    });
    sel.appendChild(psGroup);

    // VR group
    const vrGroup = document.createElement('optgroup');
    vrGroup.label = 'VR Experience';
    d.pricing.vr.forEach((v, i) => {
      const o = new Option(`VR – ${v.label} (₹${v.price})`, `vr-${i + 1}`);
      vrGroup.appendChild(o);
    });
    sel.appendChild(vrGroup);

    // 8 Ball Pool group
    const poolGroup = document.createElement('optgroup');
    poolGroup.label = '8 Ball Pool';
    d.pricing['8 ball pool'].forEach((p, i) => {
      const o = new Option(`8 Ball Pool – ${p.label} (₹${p.price})`, `pool-${i + 1}`);
      poolGroup.appendChild(o);
    });
    sel.appendChild(poolGroup);

    // Restore selected value from URL param
    const params = new URLSearchParams(window.location.search);
    const pkg = params.get('package');
    if (pkg) sel.value = pkg;
    else if (currentVal) sel.value = currentVal;
  }

  /* ── WhatsApp booking message ───────────────────── */
  // Let book.js use d.contact.whatsapp
  window.__siteData = d;

  /* ── Dynamic Pricing & Membership Rendering ────── */
  function renderPricing() {
    const grid = document.querySelector('.pricing-grid');
    if (!grid) return;

    // Clear existing static content
    grid.innerHTML = '';

    // Helper to create a price card
    function createCard(title, iconName, zoneKey, zoneAttr, colorClass) {
      const article = document.createElement('article');
      article.className = 'price-card reveal';
      if (colorClass) article.classList.add(colorClass);

      const head = document.createElement('div');
      head.className = 'price-head';
      head.innerHTML = `<span class="price-icon ${colorClass || ''}"><i data-lucide="${iconName}"></i></span><h3>${title}</h3>`;
      article.appendChild(head);

      const rows = document.createElement('div');
      rows.className = 'price-rows';

      (d.pricing[zoneKey] || []).forEach((p, idx) => {
        const row = document.createElement('div');
        row.className = 'price-row';
        row.dataset.index = idx;

        const amt = document.createElement('span');
        amt.className = 'price-amt';
        amt.textContent = `₹${p.price}*`;
        row.appendChild(amt);

        const dur = document.createElement('span');
        dur.className = 'price-dur';
        dur.textContent = ` / ${p.label}`;
        row.appendChild(dur);

        if (p.tag) {
          const tag = document.createElement('span');
          tag.className = 'price-tag';
          tag.textContent = p.tag.toUpperCase();
          row.appendChild(tag);
        }
        if (p.popular) {
          const pop = document.createElement('span');
          pop.className = 'badge-popular';
          pop.textContent = 'MOST POPULAR';
          row.appendChild(pop);
        }
        if (p.best) {
          const best = document.createElement('span');
          best.className = 'badge-best';
          best.textContent = 'BEST VALUE';
          row.appendChild(best);
        }

        rows.appendChild(row);
      });

      article.appendChild(rows);

      // Select
      const sel = document.createElement('select');
      sel.className = 'price-selector';
      sel.dataset.zone = zoneAttr;
      sel.innerHTML = '<option value="">Select an option</option>';
      (d.pricing[zoneKey] || []).forEach((p, i) => {
        const opt = document.createElement('option');
        opt.value = `${zoneAttr}-${i + 1}`;
        opt.textContent = `${p.label} - ₹${p.price}*`;
        sel.appendChild(opt);
      });
      article.appendChild(sel);

      const btn = document.createElement('button');
      btn.className = 'btn-price price-btn';
      btn.disabled = true;
      btn.dataset.zone = zoneAttr;
      btn.title = 'Select an option first';
      btn.textContent = zoneAttr === 'ps' ? 'PLAY NOW' : (zoneAttr === 'vr' ? 'EXPERIENCE NOW' : 'PLAY NOW');
      if (colorClass) btn.classList.add(`${colorClass}-btn`);
      article.appendChild(btn);

      return article;
    }

    // Create VR, PlayStation and 8 Ball Pool in the order expected
    grid.appendChild(createCard('VR EXPERIENCE', 'glasses', 'vr', 'vr', 'purple'));
    const psCard = createCard('PLAYSTATION', 'gamepad-2', 'playstation', 'ps', 'blue');
    psCard.classList.add('featured');
    grid.appendChild(psCard);
    grid.appendChild(createCard('8 BALL POOL', 'circle-dot', '8 ball pool', 'pool', 'gold'));

    // Re-init lucide icons for new nodes
    if (window.lucide) window.lucide.createIcons();
  }

  function renderMembership() {
    const grid = document.querySelector('.membership-grid');
    if (!grid) return;
    grid.innerHTML = '';

    d.membership.forEach(m => {
      const art = document.createElement('article');
      art.className = 'member-card reveal';
      if (m.popular) art.classList.add('popular');

      art.innerHTML = `
        <div class="member-head">
          <span class="member-icon ${m.tier}"><i data-lucide="${m.icon}"></i></span>
          <div>
            <h3>${m.name.toUpperCase()} ${m.popular ? '<span class="badge-popular">MOST POPULAR</span>' : ''}</h3>
            <span class="member-price">₹${m.price}</span>
          </div>
        </div>
        <p class="member-hours"><i data-lucide="clock"></i> ${m.hours} Hours Playtime</p>
        <ul class="member-features">
          ${m.features.map(f => `<li><i data-lucide="check"></i> ${f}</li>`).join('')}
        </ul>
        <a href="book.html?package=${m.id}" class="btn-member ${m.popular ? (m.tier === 'purple' ? 'purple-member-btn' : 'gold-member-btn') : ''}">GET ${m.name.toUpperCase()}</a>
      `;

      grid.appendChild(art);
    });

    if (window.lucide) window.lucide.createIcons();
  }

  // Render dynamic sections
  renderPricing();
  renderMembership();

  /* ── Ensure reveal animations and price bindings ── */
  // Force-show any newly added reveal elements (covers cases where observer wasn't attached)
  document.querySelectorAll('.reveal').forEach(el => el.classList.add('show'));

  // Initialize price selector/button behavior if main.js didn't run after rendering
  function initPriceBindings() {
    const selectors = document.querySelectorAll('.price-selector');
    if (!selectors.length) return;

    selectors.forEach(selector => {
      if (selector.dataset.inited) return;
      selector.dataset.inited = '1';
      selector.addEventListener('change', (e) => {
        const zone = selector.dataset.zone;
        const selectedValue = e.target.value;
        const button = document.querySelector(`.price-btn[data-zone="${zone}"]`);
        const card = selector.closest('.price-card');
        const priceRows = card ? card.querySelectorAll('.price-row') : [];

        priceRows.forEach(row => row.classList.remove('highlight-row'));

        if (selectedValue) {
          if (button) {
            button.disabled = false;
            button.title = 'Click to book';
            button.dataset.package = selectedValue;
          }

          const selectedIndex = parseInt(selectedValue.split('-')[1]) - 1;
          if (priceRows[selectedIndex]) priceRows[selectedIndex].classList.add('highlight-row');
        } else {
          if (button) {
            button.disabled = true;
            button.title = 'Select an option first';
            delete button.dataset.package;
          }
        }
      });
    });

    // Buttons
    const buttons = document.querySelectorAll('.price-btn');
    buttons.forEach(btn => {
      if (btn.dataset.inited) return;
      btn.dataset.inited = '1';
      btn.addEventListener('click', (e) => {
        if (!btn.disabled && btn.dataset.package) {
          e.preventDefault();
          window.location.href = `book.html?package=${btn.dataset.package}`;
        }
      });
    });
  }

  initPriceBindings();

  /* ── Copyright year ─────────────────────────────── */
  document.querySelectorAll('#year, [data-field="year"]').forEach(el => {
    el.textContent = new Date().getFullYear();
  });
})();
