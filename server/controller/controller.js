const db = require('../model');



//declare variable for user controller
const userController = {};

//use username and password from req.body
//check to see if they exist or will SQL handle this based on schema?
userController.createUser = async (req, res, next) => {
  console.log('WE ARE IN CREATE USER');
  // get values - username and password - from the req object and store in variables
  const { username, password, nickname, email, tos } = req.body;
  // query string to query our sql database
  // use INSERT to add a new user into our users table
  try {
    const queryString =
    `
    INSERT INTO users (username, password, nickname, email, tos)
    VALUES ($1, $2, $3, $4, $5) 
    RETURNING *;
    `;
    // paramaters that need arguments: (username, password)
    // $1 represents username, $2 represents password when passing in arguments to query string using params label
    const params = [ username, password, nickname, email, tos ]
    const result = await db.query(queryString, params);
    console.log('Result: ', result);
    // store 
    res.locals.newUser = result.rows[0];
    console.log("res.locals.newUser" + res.locals.newUser)
    next ();
}
  catch (err) {
      next({
          log: `userController.createUser  ERROR: ${err}`,
          message: { err: 'Error occured in userController.createUser'}
      })
  }
  // query our database and pass in our query string as an argument
    // utilizing promise chain -> 
    // add the output to our res.locals object for use in routes.js
    // return next if no errors
    // catch statement ->
     // if there is an error, return next passing in an error object
      // invoking the globalasync (req, res, next) => {
}


// verify a user is inside of our database
// expecting username and password in req.body
userController.verifyUser = async (req, res, next) => {
  const { username, password } = req.body;
  console.log('req'+ req)
  try {
    const queryString =
    `
    SELECT 
    username_id, username, password, nickname, email, tos, city, state
    FROM users
    WHERE username = $1 AND password = $2;
    `;
    const params = [username, password]
    const result = await db.query(queryString, params);
    // add the found login user row to the res.locals object
    console.log('Login Result: ', result);
    res.locals.foundUser = result.rows[0];
    console.log('Found User: ', res.locals.foundUser);
    // invoke next to enter the next middleware function
    next();
  }
  catch (err) {
    next({
      log: `userController.verifyUser  ERROR: ${err}`,
      message: { err: 'Error occured in userController.verifyUser'}
  })
  }
}


//


// export the userController - controller methods will be properties on the userController object
module.exports = userController;