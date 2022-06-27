const mongoose = require("mongoose");
const config = require("config");

const mongoConnectUri = config.get("mongoUri");

const connectToDB = async () => {
  try {
    await mongoose.connect(mongoConnectUri, {
      useNewUrlParser: true,
    });

    console.log("Connected to mongoDB...");
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};

module.exports = connectToDB;
