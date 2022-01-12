const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  // database connection
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
};