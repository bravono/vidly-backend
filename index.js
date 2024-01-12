require("dotenv").config();
const winston = require("winston");
const error = require("./middleware/error");
const config = require("config");
const mongoose = require("mongoose");
const genres = require("./routes/genres");
const home = require("./routes/home");
const customers = require("./routes/customers");
const movies = require("./routes/movies");
const rentals = require("./routes/rentals");
const users = require("./routes/users");
const Auth = require("./routes/auth");
const express = require("express");
const app = express();

winston.add(winston.transports.File, { filename: "logfile.log" });

if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwtPrivatekey is not defined");
  process.exit(1);
}

mongoose
  .connect("mongodb://localhost/vidly")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Could not connect to MongoDB"));

app.use(express.json());
app.use("/", home);
app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/rentals", rentals);
app.use("/api/movies", movies);
app.use("/api/users", users);
app.use("/api/auth", Auth);
app.use(error);

const port = process.env.PORT || 5000;
app.listen(5000, () => {
  console.log(`Listening on port ${port}...`);
});
