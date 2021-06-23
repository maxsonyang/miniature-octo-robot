const Sequelize = require("sequelize");
require('dotenv').config();

const db = new Sequelize(
  'messenger',
  'postgres',
  process.env.CLIENT_PASSWORD,
  {
    host: 'localhost',
    dialect: 'postgres',
    port: '5432'
  }
);

module.exports = db;
