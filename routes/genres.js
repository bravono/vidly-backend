const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

mongoose
  .connect("mongodb://localhost/genres")
  .then(() => console.log("Connect to the DB"))
  .catch((ex) => console.log("Cannot connect to the DB", ex));

const schema = {
  name: { type: String, required: true },
};

const Genre = mongoose.model("Genre", genreSchema);

async function createGenre() {
  const genre = new Genre({ name: "Tragedy" });
  const result = await genre.save();
}

// const genres = [
//   {
//     id: 1,
//     name: "Thriller",
//   },
//   {
//     id: 2,
//     name: "Action",
//   },
//   {
//     id: 3,
//     name: "Comedy",
//   },
// ];

async function getGenre(id) {
  const genre = await Genre.find();
}

async function updateGenre(id) {}

async function removeGenre(id) {}

module.exports = router;
