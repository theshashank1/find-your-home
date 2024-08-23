const mongoose = require('mongoose');
const { Schema } = mongoose;

const propertySchema = new Schema({
  ownerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  location: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    postalCode: { type: String, required: true }
  },
  type: { type: String, enum: ['apartment', 'house', 'studio'], required: true },
  bedrooms: { type: Number, required: true },
  bathrooms: { type: Number, required: true },
  amenities: { type: [String] },
  images: { type: [String] },
  chat: {type: String, require: true}
}, 

{ timestamps: true }

);





// Create indexes to improve search performance
propertySchema.index({ title: 1 });
propertySchema.index({ description: 1 });
propertySchema.index({ 'location.address': 1 });
propertySchema.index({ 'location.city': 1 });
propertySchema.index({ 'location.country': 1 });
propertySchema.index({ 'location.postalCode': 1 });
propertySchema.index({ type: 1 });
propertySchema.index({ price: 1 });
propertySchema.index({ bedrooms: 1 });
propertySchema.index({ bathrooms: 1 });
propertySchema.index({ amenities: 1 });

module.exports = mongoose.model('Property', propertySchema);