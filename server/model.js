// require in Pool from postgres
const { Pool } = require('pg');
const { AsyncDependenciesBlock } = require('webpack');
// create a PG URI to store the key to our database on Elephant SQL
const PG_URI = 'postgres://zsobeakn:1pfj5_RgFQHQ-tOYU0K97A2pj9urfqsO@kashin.db.elephantsql.com/zsobeakn';
// create a new pool to connect our server to our database
const pool = new Pool({
  connectionString: PG_URI,
})


// We export an object that contains a property called query,
// which is a function that returns the invocation of pool.query() after logging the query
// This will be required in the controllers to be the access point to the database
module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  }
};


// Tables and table paramaters for PG database:
// ============================================
// Users:
// ======
// _id         | Serial Prime Key
// username    | varchar
// password    | varchar
// city        | varchar
// state       | varchar
// country     | varchar



// Favorites:
// ==========
// _id        | integer 
// _userid    | integer  (foreign-Key)
// city       | varchar
// state      | varchar
// country    | varchar
// ============================================
//                      /
// Users ---------------- favorites 
//                      \
// ============================================
// export our pool

