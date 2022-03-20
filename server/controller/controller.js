const db = require('../model');
// require in bcrypt
const bcrypt = require('bcrypt');
//declare variable for user controller
const userController = {};
// declare a variable assigned to the value of how many saltRounds we want to have in our encryption algorithm
const saltRounds = 10;
//use username and password from req.body
//check to see if they exist or will SQL handle this ba res, next) => {
userController.createUser = async (req, res, next) => {  
  // get values - username and password - from the req object and store in variables
  const { username, password, nickname, email, tos } = req.body;
  // query string to query our sql database
  // use INSERT to add a new user into our users table
  // declare a new variable to be the encryptedPassword
  const encryptedPassword = await bcrypt.hash(password, saltRounds);
  try {
    const queryString =
    `
    INSERT INTO users (username, password, nickname, email, tos)
    VALUES ($1, $2, $3, $4, $5) 
    RETURNING *;
    `;
    // paramaters that need arguments: (username, password)
    // $1 represents username, $2 represents password when passing in arguments to query string using params label
    const params = [ username, encryptedPassword, nickname, email, tos];
    const result = await db.query(queryString, params);
    res.locals.newUser = result.rows[0];
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
  console.log('WE IN HERE - VERIFYIN');
  try {
    const queryString =
    `
    SELECT 
    username_id, username, password, nickname, email, tos, city, state
    FROM users
    WHERE username = $1;
    `;
    const params = [username];
    const result = await db.query(queryString, params);
    console.log('Result: ', result);
    // compare the hashed password stored in the database and our plainTextPassword
    // if the plaintext password and hashedPassword do not match, throw a new syntax error
    console.log('At 0: ', result[0]);
    console.log()
    const match = await bcrypt.compare(password, result.rows[0].password);
    // if the passwords are not a match, throw a custom error
    // the catch statement will grab the error thrown and invoke the global error handler
    if (!match) {
      throw new SyntaxError('Incorrect Password, Please Try Again');
    } 
    // add the found login user row to the res.locals object
    res.locals.foundUser = result.rows[0];
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