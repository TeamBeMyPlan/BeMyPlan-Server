const { DataTypes } = require('sequelize');
const sequelize = require('../loaders/sequelize');

const user = sequelize.define(
  'user',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nickname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    social_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    social_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'user',
    freezeTableName: true,
    underscored: true,
    charset: 'utf8',
    collate: 'utf8_general_ci',
    timestamps: true,
    paranoid: true,
  },
);

module.exports = user;
