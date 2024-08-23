const Property = require('../models/properties');
const { fuzzyMatch } = require('../utils/fuzzyMatch');  // Import a utility for fuzzy matching if you have one

async function searchProperties(query) {
  // Use regex for case-insensitive search
  const regex = new RegExp(query, 'i');
  
  // Search in title, description, and location fields
  const properties = await Property.find({
    $or: [
      { title: regex },
      { description: regex },
      { 'location.city': regex },
      { 'location.address': regex },
      { 'location.country': regex },
      { 'location.postalCode': regex },
    ]
  });

  return properties;
}

module.exports = searchProperties;
