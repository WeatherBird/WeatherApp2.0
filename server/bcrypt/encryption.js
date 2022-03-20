// require in bcrypt to encrypt passwords
const bcrypt = require('bcrypt');

// function that will be invoked, taking a password argument
// will return the newly encrypted password to store in database
// function async encryption(password) {
//   // declare the salt Rounds we want for our encryption algorithm
//   const saltRounds = 10;
//   return await bcrypt.hash(password)
// }

// module.exports = encryption;