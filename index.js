require("dotenv").config();
const winston = require("winston");
const express = require("express");
const app = express();

require("./startup/logging");
require("./startup/routes")(app);
require("./startup/database")();
require("./startup/config")();
require("./startup/validation")();

const port = process.env.PORT || 5000;
const server = app.listen(5000, () => {
  winston.info(`Listening on port ${port}...`);
});

module.exports = server;
