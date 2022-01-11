const Sequelize = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

module.exports = new Sequelize('postgres://postgres:dlwpwns0625@db-sopt-server.cqswmyfj82vm.ap-northeast-2.rds.amazonaws.com:5432/postgres')
