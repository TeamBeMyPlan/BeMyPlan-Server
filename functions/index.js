const admin = require("firebase-admin");
const serviceAccount = require("./config.json");
const dotenv = require("dotenv");

// import connectDB from './loaders/connect';
const sequalize = require('./loaders/sequelize');

dotenv.config();

sequalize.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => console.log('Error: ' + err))

let firebase;
if (admin.apps.length === 0) {
  firebase = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
} else {
  firebase = admin.app();
}

module.exports = {
  api: require("./api"),
};