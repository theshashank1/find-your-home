const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Property = require('../models/properties');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = 'uploads/';
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Serve the 'uploads' folder as static
router.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Add Property
router.post('/', upload.array('images', 5), async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      type,
      bedrooms,
      bathrooms,
      amenities,
      whatsappNumber
    } = req.body;

    const location = {
      address: req.body['location.address'],
      city: req.body['location.city'],
      country: req.body['location.country'],
      postalCode: req.body['location.postalCode']
    };

    // Validate all required fields
    if (!title || !description || !price || !type || !bedrooms || !bathrooms || !amenities || !whatsappNumber || !location.address || !location.city || !location.country || !location.postalCode) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Generate the chat message and link
    const message = `Hello,\n\nI am interested in your property "${title}" which is available for rent.\n\nLocated at:\n${location.address}, ${location.city}, ${location.country}, ${location.postalCode}\n\nWith the property features:\n- Bedrooms: ${bedrooms}\n- Bathrooms: ${bathrooms}\n\nPlease let me know more details about the availability and rental terms.\n\nThank you!`;

    const chat = `https://wa.me/${whatsappNumber.replace(/\s+/g, '')}?text=${encodeURIComponent(message)}`;

    // Process uploaded images, replacing backslashes with forward slashes
    const images = req.files ? req.files.map(file => file.path.replace(/\\/g, '/')) : [];

    // Create a new Property instance
    const property = new Property({
      title,
      description,
      price: parseFloat(price),
      location,
      type,
      bedrooms: parseInt(bedrooms),
      bathrooms: parseInt(bathrooms),
      amenities: amenities ? amenities.split(',').map(item => item.trim()) : [],
      images,
      chat
    });

    // Save the property to MongoDB
    await property.save();
    res.status(201).json(property);
  } catch (err) {
    console.error('Error:', err);
    res.status(400).json({ message: 'Validation error', error: err.message });
  }
});




// Update Property Status by ID
router.patch('/:id', async (req, res) => {
  try {
    const propertyId = req.params.id;
    const { status } = req.body;

    // Validate the status field
    if (!status) {
      return res.status(400).json({ message: 'Status field is required' });
    }

    // Find the property by ID and update its status
    const updatedProperty = await Property.findByIdAndUpdate(
      propertyId,
      { status: status },
      { new: true }  // Return the updated document
    );

    
    if (!updatedProperty) {
      return res.status(404).json({ message: 'Property not found' });
    }

    
    res.status(200).json(updatedProperty);
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
});






// Get Properties
router.get('/', async (req, res) => {
  try {
    const properties = await Property.find();
    res.json(properties);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});


// Get Property by ID
router.get('/:id', async (req, res) => {
  try {
   
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    res.json(property);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});


// Update Property
router.put('/:id', async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: 'Invalid property ID' });
    }

    const { price, description } = req.body;

    // Validate price and description if they are provided
    if (price !== undefined && (typeof price !== 'number' || price <= 0)) {
      return res.status(400).json({ message: 'Price must be a positive number' });
    }

    if (description !== undefined && typeof description !== 'string') {
      return res.status(400).json({ message: 'Description must be a string' });
    }

    const property = await Property.findByIdAndUpdate(
      req.params.id,
      { price, description },
      { new: true }
    );

    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    res.json(property);
  } catch (err) {
    res.status(400).json({ message: 'Validation error', error: err.message });
  }
});



// Delete Property
router.delete('/:id', async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: 'Invalid property ID' });
    }

    const property = await Property.findByIdAndDelete(req.params.id);

    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
