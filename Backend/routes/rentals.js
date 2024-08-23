const express = require('express');
const router = express.Router();
const Rental = require('../models/rentals'); // Assuming you have a Rental model

// Create Rental
router.post('/', async (req, res) => {
  try {
    const { propertyId, tenantId, rentalStartDate, rentalEndDate, monthlyRent, status } = req.body;

    // Validate data here...

    const rental = new Rental({
      propertyId,
      tenantId,
      rentalStartDate,
      rentalEndDate,
      monthlyRent,
      status
    });

    await rental.save();
    res.status(201).json(rental);
  } catch (err) {
    res.status(400).json({ message: 'Validation error' });
  }
});

// Get Rentals
router.get('/', async (req, res) => {
  try {
    const rentals = await Rental.find();
    res.json(rentals);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get Rental
router.get('/:id', async (req, res) => {
  try {
    const rental = await Rental.findById(req.params.id);

    if (!rental) {
      return res.status(404).json({ message: 'Rental not found' });
    }

    res.json(rental);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
