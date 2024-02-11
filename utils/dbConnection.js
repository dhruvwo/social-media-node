const mongoose = require("mongoose");
const config = require("../config");

let connection = undefined;

const initDatabaseConnection = async () => {
  mongoose.connect(config.dbURL);

  connection = mongoose.connection;

  connection.on("connected", () => {
    console.log("MongoDB :: Connected");
  });

  connection.on("disconnected", () => {
    console.log("MongoDB :: Disconnected");
  });

  connection.on("error", (error) => {
    console.log(`MongoDB :: Connection error : ${error}`);
    mongoose.disconnect();
  });
};

module.exports = {
  initDatabaseConnection,
  connection,
};
