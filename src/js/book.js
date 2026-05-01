document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const packageParam = urlParams.get('package');
  const packageSelect = document.getElementById('package');
  
  if (packageParam && packageSelect) {
    const validOptions = Array.from(packageSelect.options).map(opt => opt.value);
    if (validOptions.includes(packageParam)) {
      packageSelect.value = packageParam;
    }
  }

  const bookingForm = document.getElementById('bookingForm');
  const successMessage = document.getElementById('successMessage');
  const waLinkFallback = document.getElementById('waLinkFallback');
  const bookAnother = document.getElementById('bookAnother');

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const fullName = document.getElementById('fullName').value;
      const phone = document.getElementById('phone').value;
      const date = document.getElementById('bookingDate').value;
      const time = document.getElementById('bookingTime').value;
      const packageSelected = document.getElementById('package').options[document.getElementById('package').selectedIndex].text;
      const people = document.getElementById('people').value;
      const requests = document.getElementById('requests').value;

      // Construct WhatsApp message
      const waNumber = '918595924912';
      let message = `*New Booking Request - Game Veda*\n\n`;
      message += `*Name:* ${fullName}\n`;
      message += `*Phone:* ${phone}\n`;
      message += `*Date:* ${date}\n`;
      message += `*Time:* ${time}\n`;
      message += `*Package/Zone:* ${packageSelected}\n`;
      message += `*People:* ${people}\n`;
      
      if (requests.trim()) {
        message += `*Special Requests:* ${requests}\n`;
      }
      
      const encodedMessage = encodeURIComponent(message);
      const waUrl = `https://wa.me/${waNumber}?text=${encodedMessage}`;

      // Update fallback link and show success
      if (waLinkFallback) {
        waLinkFallback.href = waUrl;
      }
      
      bookingForm.classList.add('hidden');
      if (successMessage) {
        successMessage.classList.remove('hidden');
      }

      // Open WhatsApp in a new tab
      window.open(waUrl, '_blank');
    });
  }

  if (bookAnother) {
    bookAnother.addEventListener('click', () => {
      if (successMessage) successMessage.classList.add('hidden');
      if (bookingForm) {
        bookingForm.reset();
        bookingForm.classList.remove('hidden');
      }
    });
  }
});
