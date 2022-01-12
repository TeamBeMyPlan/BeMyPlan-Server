const { Sequelize } = require('sequelize');
const sequelize = require('../loaders/sequelize');

const db = {
    Sequelize,
    sequelize,

    // table
};

module.exports = db;