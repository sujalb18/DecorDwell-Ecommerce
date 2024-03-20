const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'products', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'customerRegister', required: true },
  title: {type: String, required:true},
  rating: { type: Number, required: true },
  comment: { type: String },
});

const Review = mongoose.model('reviews', ReviewSchema);
module.exports = Review;