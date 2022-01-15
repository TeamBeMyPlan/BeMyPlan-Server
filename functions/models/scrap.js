const { DataTypes } = require('sequelize');
const sequelize = require('../loaders/sequelize');

const scrap = sequelize.define(
  'scrap',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
  },
  {
    sequelize,
    modelName: 'scrap',
    freezeTableName: true,
    underscored: true,
    charset: 'utf8',
    collate: 'utf8_general_ci',
    timestamps: true,
    paranoid: true,
  },
);

module.exports = scrap;
