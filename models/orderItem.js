const Sequelize = require('sequelize');
const db = require('../util/database');

const OrdreItem = db.define('orderItem', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  quantity: Sequelize.INTEGER
});

module.exports = OrdreItem;