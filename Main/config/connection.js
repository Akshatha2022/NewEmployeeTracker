const mysql = require('mysql2');

require('dotenv').config();

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'May@2017',
  database: 'employees_db'
});

module.exports = connection;