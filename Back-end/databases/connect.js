const mongoose = require("mongoose");

const dbConnection = mongoose
  .connect("mongodb://127.0.0.1:27017/Trek_Tales")
  .then(() => {
    console.log("Database Connection established");
  })
  .catch((err) => console.error(`Error connecting to Database : ${err}`));

module.exports = dbConnection;
