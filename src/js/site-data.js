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

    // Combo group
    const comboGroup = document.createElement('optgroup');
    comboGroup.label = 'Combo Deals';
    d.pricing.combos.forEach((c, i) => {
      const o = new Option(`${c.label} (₹${c.price})`, `combo-${i + 1}`);
      comboGroup.appendChild(o);
    });
    sel.appendChild(comboGroup);

    // Restore selected value from URL param
    const params = new URLSearchParams(window.location.search);
    const pkg = params.get('package');
    if (pkg) sel.value = pkg;
    else if (currentVal) sel.value = currentVal;
  }

  /* ── WhatsApp booking message ───────────────────── */
  // Let book.js use d.contact.whatsapp
  window.__siteData = d;

  /* ── Copyright year ─────────────────────────────── */
  document.querySelectorAll('#year, [data-field="year"]').forEach(el => {
    el.textContent = new Date().getFullYear();
  });
})();
