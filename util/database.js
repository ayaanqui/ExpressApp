const Sequelize = require('sequelize');
const password = require('./password');

const sequelize = new Sequelize(
  'expressapp',
  'root',
  password,
  {
    dialect: 'mysql',
    host: 'localhost'
  }
);

module.exports = sequelize;