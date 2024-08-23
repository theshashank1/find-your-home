const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['landlord', 'customer'], required: true },
  phone: { type: String, required: true },
  whatsappNumber: { type: String, required: true },
  profilePicture: { type: String }
}, { timestamps: true });


const User = mongoose.model('User', userSchema);
module.exports = User;
