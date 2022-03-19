// import in path and express
const path = require('path');
const express = require('express');
const cors = require('cors');
// import in bodyParser and cookieParser
// const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');
// require in the route handlers
//
const userRouter = require('./routes/routes');
// declare a variable that specifies which port we are listening on
const PORT = 3000;
// create an application for routing HTTP requests, configuring middleware
const app = express();

// handle parsing incoming data
app.use(cors({credentials: true, origin: 'http://localhost:8080'}));
app.use(express.json());
app.use(express.urlencoded( { extended: true }));

// handle requests for static files -> specify the root directory to serve static assets
// utilize an absolute path
app.use(express.static(path.resolve(__dirname, '../client')));

// create a route handler
app.use('/user', userRouter);


// Handles requests made to unknown routes and sends back a 404 error status to the client
app.use((req, res) => res.sendStatus(404));

// global error handling object
app.use((err, req, res, next) => {
    const defaultErr = {
      log: 'Express error handler caught unknown middleware error',
      status: 400,
      message: { err: 'An error occurred' },
    };
    const errorObj = Object.assign({}, defaultErr, err);
    console.log(errorObj.log);
    return res.status(errorObj.status).json(errorObj.message);
  });

// have the application listening on the specified PORT 
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});