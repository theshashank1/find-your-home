const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

const Property = require('../models/properties');
const User = require('../models/users')
const { getUser } = require('../services/auth');

// Helper function for ObjectId validation
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// // Add Property
// router.post('/', async (req, res) => {
//   try {
//     const { title, description, price, location, type, bedrooms, bathrooms, amenities } = req.body;

//     // Get the token from the cookie
//     const token = req.cookies.user;
    
//     if (!token) {
//       return res.status(401).json({ message: 'No token provided' });
//     }

//     // Get user from token
//     const user = getUser(token);

//     console.log(user)
    
//     if (!user) {
//       return res.status(401).json({ message: 'Invalid or expired token' });
//     }

//     const ownerId = user._doc._id;
//     const message = `Hello,\n\nI am interested in your property "${title}" which is available for rent.\n\nLocated at:\n${location.address}, ${location.city}, ${location.country}, ${location.postalCode}\n\n With the property features:\n- Bedrooms: ${bedrooms}\n- Bathrooms: ${bathrooms}\n\nPlease let me know more details about the availability and rental terms.\n\nThank you!`;


//     const chat = `https://wa.me/${user._doc.whatsappNumber.replaceAll(" ", "")}?text=${encodeURIComponent(message)}`

//     // Validate presence of required fields
//     if (!ownerId || !title || !description || !price || !location || !type || !bedrooms || !bathrooms) {
//       return res.status(400).json({ message: 'All fields are required' });
//     }

//     // Validate ObjectId
//     if (!isValidObjectId(ownerId)) {
//       return res.status(400).json({ message: 'Invalid owner ID' });
//     }

//     // If validation passes, create the new property
//     const property = new Property({
//       ownerId,
//       title,
//       description,
//       price,
//       location,
//       type,
//       bedrooms,
//       bathrooms,
//       amenities,
//       chat
//     });

//     await property.save();
//     res.status(201).json(property);
//   } catch (err) {
//     res.status(400).json({ message: 'Validation error', error: err.message });
//   }
// });


const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = 'E:\\FinalProjects\\Find Your Home\\media';
    // Ensure the directory exists
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Appending extension
  }
});

const upload = multer({ storage: storage });

// Add Property
router.post('/', upload.array('images', 5), async (req, res) => {
  try {
    const { title, description, price, location, type, bedrooms, bathrooms, amenities } = req.body;

    // Get the token from the cookie
    const token = req.cookies.user;
    
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    // Get user from token
    const user = getUser(token);

    if (!user) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }

    const ownerId = user._doc._id;

    // Validate presence of required fields
    if (!ownerId || !title || !description || !price || !location || !type || !bedrooms || !bathrooms) {
      return res.status(400).json({ message: 'All required fields must be provided' });
    }

    // Validate ObjectId
    if (!isValidObjectId(ownerId)) {
      return res.status(400).json({ message: 'Invalid owner ID' });
    }

    // Validate location object
    if (!location.address || !location.city || !location.country || !location.postalCode) {
      return res.status(400).json({ message: 'All location fields are required' });
    }

    // Validate property type
    if (!['apartment', 'house', 'studio'].includes(type)) {
      return res.status(400).json({ message: 'Invalid property type' });
    }

    const message = `Hello,\n\nI am interested in your property "${title}" which is available for rent.\n\nLocated at:\n${location.address}, ${location.city}, ${location.country}, ${location.postalCode}\n\n With the property features:\n- Bedrooms: ${bedrooms}\n- Bathrooms: ${bathrooms}\n\nPlease let me know more details about the availability and rental terms.\n\nThank you!`;

    const chat = `https://wa.me/${user._doc.whatsappNumber.replaceAll(" ", "")}?text=${encodeURIComponent(message)}`;

    // Process uploaded images
    const images = req.files ? req.files.map(file => file.path) : [];

    // Create the new property
    const property = new Property({
      ownerId,
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

    // Save to MongoDB
    await property.save();
    res.status(201).json(property);
  } catch (err) {
    res.status(400).json({ message: 'Validation error', error: err.message });
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
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: 'Invalid property ID' });
    }

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
