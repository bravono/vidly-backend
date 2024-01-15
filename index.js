require("dotenv").config();
const winston = require("winston");
const { MongoDB } = require("winston-mongodb");
const config = require("config");
const mongoose = require("mongoose");
const express = require("express");
const app = express();
require("./startup/routes")(app);
require("./startup/database")();

winston.handleExceptions(
  new winston.transports.File({ filename: "uncaughtExceptions.log" })
);

process.on("unhandledRejection", (ex) => {
  throw ex;
});

winston.add(winston.transports.File, { filename: "logfile.log" });
// winston.add(winston.transports.MongoDB, {
//   db: "mongodb://loclahost/vidly",
//   collection: "log",
// });

const logger = new winston.Logger({
  transports: [
    new MongoDB({
      db: "mongodb://localhost/vidly",
      collection: "log",
      // Other MongoDB connection options if needed
    }),
  ],
  level: "error  ", // Only log errors
});

if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwtPrivatekey is not defined");
  process.exit(1);
}

const port = process.env.PORT || 5000;
app.listen(5000, () => {
  console.log(`Listening on port ${port}...`);
});
