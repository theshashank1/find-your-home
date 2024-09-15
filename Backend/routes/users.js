const express = require('express');
const bcrypt = require('bcryptjs');

const router = express.Router();

const User = require('../models/users');
const { setUser, getUser } = require('../services/auth');



// Signup route
router.post('/signup', async (req, res) => {
  try {
    const { username, email, password, role, phone, whatsappNumber, profilePicture } = req.body;

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    user = new User({
      username,
      email,
      password: hashedPassword,
      role,
      phone,
      whatsappNumber,
      profilePicture
    });

    await user.save();

    res.status(201).json({ message: 'User created successfully', Data: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Creating JWT Token For Secure Auth Every time
    // For simplicity, we're just sending a success message
    console.log(user)
    token = setUser(user)
    res.cookie('user', token)
    console.log(getUser(token))
    res.json({ message: 'Logged in successfully', token: token });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


router.delete('/:id', async (req, res) => {

  try{
    const username = req.params.id

    // Check if user exists
    let user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    User.deleteOne({username})
    console.log('User Deleted')

  }
  catch (error){
    console.error(error)
    res.status(500).json({ message: 'Server error'})
  }

})

module.exports = router;


