const admin = require("../middleware/auth");
const auth = require("../middleware/auth");
const { Rental, validate } = require("../models/rental");
const { Customer } = require("../models/customer");
const { Movie } = require("../models/movie");
const mongoose = require("mongoose");
const Fawn = require("fawn");
const express = require("express");
const router = express.Router();

Fawn.init(mongoose);

router.get("/", async (req, res) => {
  const rentals = await Rental.find().sort("-dateOut");

  res.send(rentals);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.params.id);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(400).send("Invalid Customer");

  const movie = await Movie.findById(req.body.movieId);
  if (!movie) return res.status(400).send("Invalid Movie");

  if (movie.numberInStock === 0)
    return res.status(400).send("Movie not in stock");

  let rental = new Rental({
    customer: {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone,
    },

    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate,
    },
  });

  try {
    new Fawn.Task()
      .save("rentals", rental)
      .update("movies", { _id: movie._id }, { $inc: { numberInStock: -1 } })
      .run();
  } catch (ex) {
    return res.status(500).send("Something failed");
  }
});

router.put("/:id", auth, async (req, res) => {
  const { error } = validate(req.params.id);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.find(req.body.customerId);
  if (!customer) return res.status(400).send("Invalid Customer");

  const movie = await Movie.find(req.body.movieId);
  if (!movie) return res.status(400).send("Invalid Movie");

  let rental = await Rental.findByIdAndUpdate(req.params.id, {
    customerId: req.body.customerId,
    movieId: req.body.movieId,
  });

  try {
    new Fawn.Task().save("rentals", rental).run();
  } catch (ex) {
    return res.status(500).send("Something Failed");
  }
});

router.delete("/:id", [auth, admin], async (req, res) => {
  const rental = await Rental.findByIdAndRemove(req.params.id);

  if (!rental)
    return res.status(404).send("There is no such rental in the database");

  res.send(rental);
});

router.get("/:id", async (req, res) => {
  const rental = await Rental.findById(req.params.id);

  if (!rental)
    return res.status(404).send("There is no such rental in the database");

  res.send(rental);
});

module.exports = router;
