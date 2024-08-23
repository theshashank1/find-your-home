const express = require('express');
const router = express.Router();
const Property = require('../models/properties');

// Helper function to build the search query from natural language input
const buildSearchQuery = (query) => {
  const criteria = {};

  // Normalize and split query
  const normalizedQuery = query.toLowerCase();
  const words = normalizedQuery.split(/\s+/);

  // Extract type from words
  if (words.includes('house')) {
    criteria.type = 'house';
  } else if (words.includes('apartment')) {
    criteria.type = 'apartment';
  } else if (words.includes('studio')) {
    criteria.type = 'studio';
  }

  // Extract city if 'in' is present
  const inIndex = words.indexOf('in');
  if (inIndex !== -1 && inIndex < words.length - 1) {
    criteria['location.city'] = words.slice(inIndex + 1).join(' ');
  }

  return criteria;
};

// Define the /search route
router.get('/search', async (req, res) => {
  try {
    const query = req.query.q || '';
    if (!query) {
      return res.status(400).json({ message: 'Query parameter is required' });
    }

    const searchCriteria = buildSearchQuery(query);
    const regex = new RegExp(query, 'i'); // Case-insensitive search

    // Construct query with parsed criteria
    const properties = await Property.find({
      $and: [
        searchCriteria,
        {
          $or: [
            { title: regex },
            { description: regex },
            { 'location.address': regex },
            { 'location.city': regex },
            { 'location.country': regex },
            { 'location.postalCode': regex },
            { amenities: regex } // Match any element in the amenities array
          ]
        }
      ]
    });

    if (properties.length === 0) {
      return res.status(404).json({ message: 'No properties found' });
    }

    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
