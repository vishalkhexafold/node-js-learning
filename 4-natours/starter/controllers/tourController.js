// const fs = require('fs');

const Tour = require('../models/tourModels');

// const tour = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`, 'utf-8')
// );
// exports.checkID = (req, res, next, val) => {
//   console.log(`Tour id is: ${val}`);
//   if (req.params.id * 1 > tours.length) {
//     return res.status(404).json({
//       message: 'Tour not found',
//       status: 'error'
//     });
//   }

//   next();
// };

// exports.checkBody = (req, res, next) => {
//   if (!req.body.name || !req.body.price) {
//     return res.status(400).json({
//       message: 'Please provide all required fields',
//       status: 'error'
//     });
//   }
//   next();
// };

exports.getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find();
    res.status(200).json({
      result: tours.length,
      status: 'success',
      data: { tours }
    });
  } catch (error) {
    res.status(500).json({
      message: 'Could not get tours',
      status: 'error'
    });
  }
};

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: { tour }
    });
  } catch (error) {
    res.status(404).json({
      status: 'Not available'
    });
  }
};

exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    console.log(req.body);
    res.status(201).json({
      message: 'Tour added successfully',
      data: newTour
    });
  } catch (error) {
    res.status(400).json({
      message: 'Could not add tour',
      status: 'error'
    });
  }
};
// post tour data

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    console.log(req.body);
    res.status(201).json({
      message: 'Tour updated successfully',
      data: {
        tour: tour
      }
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: 'Could not add tour',
      status: error
    });
  }
};
exports.deleteTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndDelete(req.params.id, req.body);
    console.log(req.body);
    res.status(201).json({
      message: 'Tour deleted successfully',
      data: {
        tour: tour
      }
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: 'Could not delete tour',
      status: error
    });
  }

};
