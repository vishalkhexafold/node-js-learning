 const express = require('express');    
 const morgan = require('morgan');
 const app = express();     
 app.use(express.json());       
    //middleware
 app.use(morgan('dev'));

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');




 app.use((req, res, next) => {
    console.log('Middleware');
    next();
});
app.use((req, res, next) => {
req.requestTime = new Date().toISOString();
    next();
});

//ROUTES
app.use('/api/v1/tours',tourRouter );
app.use('/api/v1/users',userRouter );


module.exports=app;