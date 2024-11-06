const Tour = require('../models/tourModels');

exports.aliasTopTours = async (req, res, next) => {
  req.query.limit = 5;
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,difficulty';
  next();
};

exports.getAllTours = async (req, res) => {
  try {
    // BUILD QUERY
    const queryObj = { ...req.query };
    const excludeFields = ['page', 'limit', 'sort', 'fields'];
    excludeFields.forEach((el) => delete queryObj[el]);
    console.log(queryObj);
    let queryStr = JSON.stringify(queryObj);

    //advance filtering
    queryStr = queryStr.replace(
      /\b(gt|gte|lt|lte|in)\b/g,
      (match) => `$${match}`
    );

    let query = Tour.find(JSON.parse(queryStr));
    //BUILDING SORT QUERY
    if (req.query.sort) {
      const sortStr = req.query.sort.split(',').join(' ');
      query = query.sort(sortStr);
    } else {
      query = query.sort('-createdAt');
    }

    // FIELD LIMITING
    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');
      query = query.select(fields);
    } else {
      query = query.select('-__v');
    }

    // PAGINATION
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 100;
    const startIndex = (page - 1) * limit;

    query = query.skip(startIndex).limit(limit);
    if (req.query.page) {
      const total = await Tour.countDocuments();
      if (startIndex >= total) throw new Error('Page not found');
    }

    // EXECUTE QUERY
    const tours = await query;

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
