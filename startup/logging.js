const winston = require("winston");
const { MongoDB } = require("winston-mongodb");
require("express-async-errors");

module.exports = function () {
  winston.handleExceptions(
    new winston.transports.Console({ colorize: true, prettyPrint: true }),
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
};
