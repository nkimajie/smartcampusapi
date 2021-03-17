const dotenv = require('dotenv').config();
const  sequelize  = require('sequelize');

module.exports = new sequelize(process.env.DATABASE, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
  host: process.env.DATABASE_HOST,
  dialect: 'mysql'
});
