const { DataTypes } = require('sequelize');
const sequelize = require('../loaders/sequelize');
const db = require('../models');

const post = sequelize.define(
  'post',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    thumbnail_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    order_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    recommended: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    recommended_date: {
      type: DataTypes.DATE,
    },
    tag_theme: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tag_count_spot: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tag_count_day: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tag_count_restaurant: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tag_partner: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tag_money: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tag_mobility: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tag_month: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'post',
    freezeTableName: true,
    underscored: true,
    charset: 'utf8',
    collate: 'utf8_general_ci',
    timestamps: true,
    paranoid: true,
    hooks: {
      afterDestroy: async (sentence, option) => {
        await db.order.destroy({
          where: {
            post_id: post.get('id'),
          },
        });

        await db.scrap.destroy({
          where: {
            post_id: post.get('id'),
          },
        });
      },
    },
  },
);

module.exports = post;
