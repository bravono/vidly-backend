const mongoose = require("mongoose");
const genres = require("./routes/genres");
const home = require("./routes/home");
const customers = require(".routes/customers");
const express = require("express");
const app = express();

mongoose
  .connect("mongodb://localhost/vidly")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Could not connect to MongoDB"));

app.use(express.json());
app.use("/api/genres", genres);
app.use("/", home);
app.use("/api/customers", customers);

const port = process.env.PORT || 5000;
app.listen(5000, () => {
  console.log(`Listening on port ${port}...`);
});
