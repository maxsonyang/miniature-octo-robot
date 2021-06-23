const Sequelize = require("sequelize");
require('dotenv').config();

const db = new Sequelize(
  'messenger',
  'postgres',
  'postgres',
  {
    host: 'localhost',
    dialect: 'postgres',
    port: '5432'
  }
);

module.exports = db;
