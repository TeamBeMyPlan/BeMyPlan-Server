const { DataTypes } = require('sequelize');
const sequelize = require('../loaders/sequelize');

const area = sequelize.define('area', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    photo_url: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    is_activated: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    sequelize,
    modelName: 'area',
    freezeTableName: true,
    underscored: true,
    charset: 'utf8',
    collate: "utf8_general_ci",
    timestamps: true,
    paranoid: true,
    deletedAt: 'is_deleted'
});

module.exports = area;