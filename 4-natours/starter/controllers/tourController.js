const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`, 'utf-8'),
);
exports.checkID = (req, res, next, val) => {
  console.log(`Tour id is: ${val}`);
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      message: 'Tour not found',
      status: 'error',
    });
  }

  next();
};

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      message: 'Please provide all required fields',
      status: 'error',
    });
  }
  next();
};

exports.getAllTours = (req, res) => {
  const data = tours;
  res.status(200).json({
    result: data.length,
    status: 'success',
    data: { data },
  });
};

exports.getTour = (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1;

  const tour = tours.find((currentTour) => currentTour.id === id);
  if (!tour) {
    return res.status(404).json({
      message: 'Tour not found',
      status: 'error',
    });
  }
  const data = id ? tour : tours;
  return res.status(200).json({
    result: data.length,
    status: 'success',
    data: data,
  });
};

exports.createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  // eslint-disable-next-line node/no-unsupported-features/es-syntax
  const newTour = { id: newId, ...req.body };
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    () => {
      console.log('File changed');
    },
  );

  console.log(req.body);
  res.status(201).json({
    message: 'Tour added successfully',
    data: req.body,
  });
};
// post tour data

exports.updateTour = (req, res) => {
  const id = req.params.id * 1; // Extracting ID from the request parameters
  const tour = tours.find((currentTour) => currentTour.id === id); // Finding the tour

  if (!tour) {
    return res.status(404).json({
      message: 'Tour not found',
      status: 'error',
    });
  }

  // Updating the tour with the provided data in the request body
  Object.assign(tour, req.body);

  // Writing the updated tours array back to the JSON file
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      if (err) {
        return res.status(500).json({
          message: 'Could not update the tour',
          status: 'error',
        });
      }
      res.status(200).json({
        message: 'Tour updated successfully',
        data: tour,
      });
    },
  );
};
exports.deleteTour = (req, res) => {
  const id = req.params.id * 1; // Extracting ID from the request parameters
  const tourIndex = tours.findIndex((tour) => tour.id === id); // Finding the tour index

  if (tourIndex === -1) {
    return res.status(404).json({
      message: 'Tour not found',
      status: 'error',
    });
  }

  // Removing the tour from the array
  tours.splice(tourIndex, 1);

  // Writing the updated tours array back to the JSON file
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      if (err) {
        return res.status(500).json({
          message: 'Could not delete the tour',
          status: 'error',
        });
      }
      res.status(204).json({
        // 204 No Content
        message: 'Tour deleted successfully',
      });
    },
  );
};
