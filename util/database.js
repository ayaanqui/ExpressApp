const Sequelize = require('sequelize');
const password = require('./password');

const sequelize = new Sequelize(
  'node-complete',
  'root',
  password.password,
  {
    dialect: 'mysql',
    host: 'localhost'
  }
);

module.exports = sequelize;