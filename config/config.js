// config/config.js
require('dotenv').config();
const Sequelize = require('sequelize');

// Create a Sequelize instance with connection information read from environment variables
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: 'localhost', // or whatever your local/database host configuration is
  dialect: 'mysql', // assuming you're using MySQL
  port: 3306, // default port for MySQL
  dialectOptions: {
    decimalNumbers: true,
  },
});

module.exports = sequelize;
