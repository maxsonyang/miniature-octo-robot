const Sequelize = require("sequelize");
require('dotenv').config();

const db = new Sequelize(
  'messenger',
  'postgres',
  process.env.DATABASE_PASSWORD,
  {
    host: 'localhost',
    dialect: 'postgres',
    port: '5432'
  }
);

module.exports = db;
