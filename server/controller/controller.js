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
// userController.verifyUser = async (req, res, next) => {
//   const { username, password } = req.body;
//   console.log('WE IN HERE - VERIFYIN');
//   try {
//     const queryString =
//     `
//     SELECT 
//     users.username_id, users.username, users.password, users.nickname, users.email, users.tos, users.city, users.state,
//     favorites.city, favorites.state
//     FROM favorites 
//     INNER JOIN users
//     ON favorites.username_id = users.username_id
//     WHERE username = $1;
//     `;

//     const params = [username];
//     const result = await db.query(queryString, params);
//     // console.log('Result: ', result);
//     // compare the hashed password stored in the database and our plainTextPassword
//     // if the plaintext password and hashedPassword do not match, throw a new syntax error
//     console.log('Results: ', result);
//     console.log('Rows: ', result.rows)
//     const match = await bcrypt.compare(password, result.rows[0].password);
//     // if the passwords are not a match, throw a custom error
//     // the catch statement will grab the error thrown and invoke the global error handler
//     if (!match) {
//       throw new SyntaxError('Incorrect Password, Please Try Again');
//     } 
//     // add the found login user row to the res.locals object
//     // const newRows = result.rows.reduce((acc, cur) => {
      
//     // }, []);
//     res.locals.foundUser = result.rows;
//     // invoke next to enter the next middleware function
//     next();
//   }
//   catch (err) {
//     next({
//       log: `userController.verifyUser  ERROR: ${err}`,
//       message: { err: 'Error occured in userController.verifyUser'}
//   })
//   }
// }


userController.updateUserLocation = async (req, res, next) => {
  console.log('WE ARE UPDATING LOCATION');
  const { username } = req.params;
  const { city, state } = req.body;
  try {
    const queryString =
    `
      UPDATE users
      SET city = $1, state = $2
      WHERE username = $3
      RETURNING *
    `;
    const params = [ city, state, username ]
    const result = await db.query(queryString, params);
    console.log('Result: ', result);
    // store 
    res.locals.updatedLocation = result.rows;
    console.log("res.locals.updatedLocation" + res.locals.updatedLocation)
    next ();
}
  catch (err) {
      next({
          log: `userController.updateUserLocation ERROR: ${err}`,
          message: { err: 'Error occured in userController.updateUserLocation'}
      })
  }
}


//how do we automatically populate user?
// insert new favorite into favorites table - associated 
userController.addFavorite = async (req, res, next) => {
  console.log('WE ARE ADDING FAVORITE LOCATION');
  console.log('REQUEST IS ', req.body)
  //const { userId } = req.params;
  const { userId, city, state, country } = req.body; //
  try {
    const queryString = `INSERT INTO favorites (username_id, city, state, country)
    VALUES ($1, $2, $3, $4);`;

    // WHERE username_id = $3;

    const params = [ userId, city, state, country ]
    console.log("PARAMS ", params);
    const result = await db.query(queryString, params);
    // console.log('Result: ', result);
    // // store 
    // console.log(result.rows);
    // res.locals.favoriteLocation = result.rows[0];
    // console.log("res.locals.updatedLocation" + res.locals.favoriteLocation)
    return next();
  }
  catch (err) {
    return next({
      log: `userController.addFavorites ERROR: ${err}`,
      message: { err: 'Error occured in userController.setFavorite'}
    })
  }
}

/* 
[
    {
        "favorite_id": 25,
        "city": "Portland",
        "state": "Oregon"
    }
]
*/

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
    // console.log('Result: ', result);
    // compare the hashed password stored in the database and our plainTextPassword
    // if the plaintext password and hashedPassword do not match, throw a new syntax error
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

// returning the favorites list associated with a user after inserting a new favorite
userController.returnFavorites = async (req, res, next) => {
  console.log('WE ARE RETURNING THE FAVORITES!');

  const { userId } = req.body;
  try {
    const queryString =
    `
    SELECT favorite_id, city, state 
    FROM favorites
    WHERE username_id = $1
    `;
    
    const params = [ userId ]
    const result = await db.query(queryString, params);

    // console.log('Resulut: ', result);
    res.locals.favorites = result.rows; // all favorites for that user
    console.log();
    return next();
  }
  catch (err) {
    return next({
      log: `userController.returnFavorites ERROR: ${err}`,
      message: { err: 'Error occured in userController.favoriteLocation'}
    })
  }
}

// DELETE FROM favorites
//  WHERE favorite_id = 9;

// DELETE FROM favorites
//     WHERE favorite_id = 8;

// receives an id, city, and state and deletes that from the favorites table
userController.deleteUser = async (req, res, next) => {
  // destructure the variables on the request body
  const { favorite_id } = req.body;
  console.log('Body: ', req.body);
  console.log('favorite_id: ', favorite_id);
  try {
    const queryString = 
    `DELETE FROM favorites
    WHERE favorite_id = $1;
    `;

    const params = [favorite_id];
    console.log('Params: ', params[0]);
    const result = await db.query(queryString, params);
    console.log('Delete Result: ', result);
    // invoke the next middleware function which will return the new favorites
    next();
  }
  catch (err) {
    next({
      log: `userController.deleteFavorite  ERROR: ${err}`,
      message: { err: 'Error occured in userController.deleteFavorite'}
    })
  }
}

// export the userController - controller methods will be properties on the userController object
module.exports = userController;







// userController.deleteFavorite = async (req, res, next) => {
//   console.log('WE ARE DELETING FAVORITE LOCATION');
//   const { city, state } = req.body;
//   try {
//     const queryString =
//     `
//     INSERT INTO favorites (city, state)
//     VALUES ($1, $2) 
//     RETURNING *;
//     `;
//     const params = [ city, state ]
//     const result = await db.query(queryString, params);
//     console.log('Result: ', result);
//     // store 
//     res.locals.favoriteLocation = result.rows[0];
//     console.log("res.locals.updatedLocation" + res.locals.favoriteLocation)
//     next();
//   }
//   catch (err) {
//     next({
//       log: `userController.favoriteLocation ERROR: ${err}`,
//       message: { err: 'Error occured in userController.favoriteLocation'}
//     })
//   }
// }
//