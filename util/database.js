const mysql = require('mysql2');
// Make sure to add password.js file in the util folder
// password.js: exports.password = 'password';
const password = require('./password');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'node-complete',
  password: password,
});

module.exports = pool.promise();