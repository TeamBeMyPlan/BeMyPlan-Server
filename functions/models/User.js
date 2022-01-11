const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../loaders/sequelize');

class User extends Model {}

User.init({
    nickname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    socialType: {
        type: DataTypes.STRING,
        allowNull: false
    },
    token: {
        type: DataTypes.STRING,
        allowNull: false
    },
    sequelize, // We need to pass the connection instance
    modelName: 'User',
    freezeTableName: true,
    charset: 'utf8',
})