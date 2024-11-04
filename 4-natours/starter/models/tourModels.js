// eslint-disable-next-line import/no-extraneous-dependencies
const mongoose = require('mongoose'); // Add this line to require mongoose

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price']
  },
  rating: {
    type: Number,
    required: true,
    default: 4.5
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Tour = mongoose.model('Tour', tourSchema);
module.exports = Tour;
