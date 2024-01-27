const winston = require("winston");
require("express-async-errors");

const logger = winston.createLogger({
  level: "info",
  transports: [
    new winston.transports.File({ filename: "logfile.log", level: "error" }),
    new winston.transports.Console({ format: winston.format.simple() }),
  ],
  exceptionHandlers: [
    new winston.transports.File({ filename: "uncaughtExceptions.log" }),
  ],
});

process.on("unhandledRejection", (ex) => {
  throw ex;
});

module.exports = logger;
