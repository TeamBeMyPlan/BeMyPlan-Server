const { DataTypes } = require('sequelize');
const sequelize = require('../loaders/sequelize');

const spot_photo = sequelize.define('spot_photo', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    photo_url: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'spot_photo',
    freezeTableName: true,
    underscored: true,
    charset: 'utf8',
    collate: "utf8_general_ci",
    timestamps: true,
    paranoid: true,
    deletedAt: 'is_deleted'
});

module.exports = spot_photo;