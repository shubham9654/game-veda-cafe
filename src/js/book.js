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

      // Construct WhatsApp message
      const businessNumber = '918595924912';
      let message = `Hello! I want to book a slot at Game Veda\n\n`;
      message += `📝 *Booking Details:*\n`;
      message += `Name: ${fullName}\n`;
      message += `Contact: ${phone}\n`;
      message += `Date: ${date}\n`;
      message += `Time: ${time}\n`;
      message += `Package: ${packageSelected}\n\n`;
      message += `Please confirm my booking.`;
      
      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/${businessNumber}?text=${encodedMessage}`;

      // Update fallback link and show success
      const waLinkFallback = document.getElementById('waLinkFallback');
      if (waLinkFallback) {
        waLinkFallback.href = whatsappUrl;
      }
      
      bookingForm.classList.add('hidden');
      if (successMessage) {
        successMessage.classList.remove('hidden');
      }

      // Open WhatsApp
      window.open(whatsappUrl, '_blank');
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
