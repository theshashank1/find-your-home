const express = require('express');
const router = express.Router();

// Chat via WhatsApp
router.get('/whatsapp', (req, res) => {
  try {
    const whatsappNumber = '+1234567890'; // Replace with actual WhatsApp number
    const message = `I am interested in your property "${title}" which is available for rent. Located At:"{${location.address}, ${location.city}, ${location.country}, ${location.postalCode}\nBedrooms: ${bedrooms}\nBathrooms: ${bathrooms}}`
    ;
    const redirectUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    res.json({ redirectUrl });
  } catch (err) {
    res.status(500).json({ message: 'Unable to redirect to WhatsApp chat' });
  }
});

module.exports = router;
