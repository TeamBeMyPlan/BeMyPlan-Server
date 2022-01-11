const db = require('../models');

const connectDB = async () => {
  try {
    await db.sequelize
      .authenticate()
      .then(async () => {
        console.log('Connection Success!');
      })
      .catch((e) => {
        console.log('error : ', e);
      });

    //db.sequelize.sync({ force: false }).then(() => console.log('Table created'));
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;