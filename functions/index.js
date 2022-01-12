const admin = require("firebase-admin");
const serviceAccount = require("./config.json");
const dotenv = require("dotenv");

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