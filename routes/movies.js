const Genre = require("../models/genre");
const { Movie, validateMovie } = require("../models/movie");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const movies = await Movie.findById().sort("name");

  res.send(movies);
});

router.post("/", async (req, res) => {
  const { error } = validateMovie(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send("Invalid genre.");

  const movie = new Movie({
    title: req.body.title,
    genre: {
      _id: genre.id,
      name: genre.name,
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate,
  });

  movie.save();

  res.send(movie);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const movie = await Movie.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      numberInStock: req.body.numberInStock,
    },
    { new: true }
  );

  if (!movie) return res.send("There is no such movie in the database");
});
module.exports = router;
