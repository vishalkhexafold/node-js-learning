// eslint-disable-next-line import/no-extraneous-dependencies
const mongoose = require('mongoose'); // Add this line to require mongoose

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: [true, 'A tour must have a name'],
    trim: true
  },
  duration: {
    type: Number,
    required: [true, 'A tour must have a duration']
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'A tour must have a maximum group size']
  },
  difficulty: {
    type: String,
    required: [true, 'A tour must have a difficulty level']
  },
  summary: {
    type: String,
    required: [true, 'A tour must have a summary'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'A tour must have a description'],
    trim: true
  },

  price: {
    type: Number,
    required: [true, 'A tour must have a price']
  },

  priceDiscount: {
    type: Number,
    default: 0
  },

  rating: {
    type: Number,
    required: true,
    default: 4.5
  },
  ratingsQuantity: {
    type: Number,
    required: true,
    default: 0
  },
  ratingAverage: {
    type: Number,
    required: true,
    default: 4.5
  },
  imageCover: {
    type: String,
    required: true,
    default:
      'https://st4.depositphotos.com/17828278/24401/v/450/depositphotos_244011872-stock-illustration-image-vector-symbol-missing-available.jpg'
  },
  images: [
    {
      type: String,
      required: true,
      default:
        'https://st4.depositphotos.com/17828278/24401/v/450/depositphotos_244011872-stock-illustration-image-vector-symbol-missing-available.jpg'
    } // Add this line to add an array of images
  ],
  startDates: [
    {
      type: Date
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Tour = mongoose.model('Tour', tourSchema);
module.exports = Tour;
