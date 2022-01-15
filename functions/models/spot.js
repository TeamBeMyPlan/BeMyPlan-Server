const { DataTypes } = require('sequelize');
const sequelize = require('../loaders/sequelize');

const spot = sequelize.define(
  'spot',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    latitude: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    longitude: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    day: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sequence: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    next_spot_name: {
      type: DataTypes.STRING,
    },
    next_spot_required_time: {
      type: DataTypes.STRING,
    },
    next_spot_mobility: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: 'spot',
    freezeTableName: true,
    underscored: true,
    charset: 'utf8',
    collate: 'utf8_general_ci',
    timestamps: true,
    paranoid: true,
  },
);

module.exports = spot;
