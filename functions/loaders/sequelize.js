const { Sequelize } = require('sequelize');
const dbConfig = require('../config/dbConfig');

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
  host: dbConfig.host,
  dialect: 'postgres',
  logging: true
  }
);

module.exports = { sequelize, };