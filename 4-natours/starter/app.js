 const express = require('express');    
 const fs = require('fs');     
 const app = express();     
 app.use(express.json());       
    



const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, 'utf-8'));   
const getAllTours = (req,res) => {  
    const data =  tours;
  res.status(200).json({
        result: data.length,
        status: 'success',
        data: {data},
     });       
    };   

    const getTour =(req,res) => {  
    
        console.log(req.params);   
        const id = req.params.id*1;
    
        const tour = tours.find(tour => tour.id === id);
        if (!tour) {
            return res.status(404).json({
                message: 'Tour not found',
                status: 'error',
            });
        }
        const data = id ? tour : tours;
    return    res.status(200).json({
            result: data.length,
            status: 'success',
            data: data, 
        });       
        };

    


    const createTour = (req, res) => { 
        const newId = tours[tours.length - 1].id + 1;
        const newTour = Object.assign({ id: newId }, req.body);
        tours.push(newTour);
        fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`,JSON.stringify (tours),err => {    
            console.log('File changed');});

        console.log(req.body);
        res.status(201).json({
            message: 'Tour added successfully',
            data: req.body,
        });
    };
    // post tour data    

const updateTour =  (req, res) => {
    const id = req.params.id * 1; // Extracting ID from the request parameters
    const tour = tours.find(tour => tour.id === id); // Finding the tour

    if (!tour) {
        return res.status(404).json({
            message: 'Tour not found',
            status: 'error',
        });
    }

    // Updating the tour with the provided data in the request body
    Object.assign(tour, req.body);

    // Writing the updated tours array back to the JSON file
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
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
    });
};
const deleteTour =  (req, res) => {
    const id = req.params.id * 1; // Extracting ID from the request parameters
    const tourIndex = tours.findIndex(tour => tour.id === id); // Finding the tour index

    if (tourIndex === -1) {
        return res.status(404).json({
            message: 'Tour not found',
            status: 'error',
        });
    }

    // Removing the tour from the array
    tours.splice(tourIndex, 1);

    // Writing the updated tours array back to the JSON file
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
        if (err) {
            return res.status(500).json({
                message: 'Could not delete the tour',
                status: 'error',
            });
        }
        res.status(204).json({ // 204 No Content
            message: 'Tour deleted successfully',
        });
    });
};



    app.get('/api/v1/tours',getAllTours);
    app.get('/api/v1/tours/:id?',getTour);   
    app.post('/api/v1/tours', createTour);
    app.patch('/api/v1/tours/:id',updateTour);  
    app.delete('/api/v1/tours/:id',deleteTour);

    app
    .route('/api/v1/tours')
    .get(getTour)
    .post(createTour);

    app.route('/api/v1/tours/:id')
    .get(getTour)
    .patch(updateTour)
    .delete(deleteTour);
 const port = 3000;    

 app.listen(port, () => {        
   console.log(`Server running on port ${port}`);   
 });     

