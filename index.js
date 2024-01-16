require("dotenv").config();
const config = require("config");
const express = require("express");
const app = express();

require("./startup/logging")();
require("./startup/routes")(app);
require("./startup/database")();

if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwtPrivatekey is not defined");
  process.exit(1);
}

const port = process.env.PORT || 5000;
app.listen(5000, () => {
  console.log(`Listening on port ${port}...`);
});
