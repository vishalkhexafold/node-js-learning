const Tour = require('../models/tourModels');
const ApiFeatures = require('../utils/apiFeatures');

exports.aliasTopTours = async (req, res, next) => {
  req.query.limit = 5;
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,difficulty';
  next();
};

exports.getAllTours = async (req, res) => {
  try {
    // EXECUTE QUERY
    const features = new ApiFeatures(Tour.find(), req.query)
      .filter()
      // .sort()
      .limitFields()
      .pagination();
    const tours = await features.query;

    // const tours = await query;

    res.status(200).json({
      result: tours.length,
      status: 'success',
      data: { tours }
    });
  } catch (error) {
    console.log(error);
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
