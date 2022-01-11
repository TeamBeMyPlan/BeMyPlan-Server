const admin = require("firebase-admin");
const serviceAccount = require("./wesopt29-328c5-firebase-adminsdk-lppnh-b4d0354e59.json");
const dotenv = require("dotenv");

// import connectDB from './loaders/connect';
const connectDB = require('./loaders/connect');

dotenv.config();

connectDB();

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