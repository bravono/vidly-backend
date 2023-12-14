const genres = require("./routes/genres");
const home = require("./routes/home");
const express = require("express");
const app = express();



// const genres = ["Action", "Triller", "Comedy"];

app.use(express.json());
app.use("/api/genres", genres);
app.use("/", home);

const port = process.env.PORT || 5000;
app.listen(5000, () => {
  console.log(`Listening on port ${port}...`);
});
