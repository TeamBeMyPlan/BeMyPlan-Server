const { Sequelize } = require('sequelize');
const sequelize = require('../loaders/sequelize');

const User = require('./User');

const db = {
    Sequelize,
    sequelize,
  
    // table
    User,
};

module.exports = {db,};