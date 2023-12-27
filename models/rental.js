const Joi = require("joi");
const date = require("joi/lib/types/date");
const mongoose = require("mongoose");

const rentalSchema = new mongoose.Schema({
  custome: {
    type: new mongoose.Schema({
      name: {
        type: String,
        trim: true,
        minlength: 5,
        maxlength: 255,
        required: true,
      },

      isGold: {
        type: Boolean,
        default: false,
      },
      phone: {
        type: Number,
        minlength: 5,
        maxlength: 50,
        required: true,
      },
    }),
  },

  movie: {
    type: new mongoose.Schema({
      title: {
        type: String,
        trim: true,
        minlength: 5,
        maxlength: 50,
        required: true,
      },

      dailyRentalRate: {
        type: Number,
        min: 0,
        max: 255,
        required: true,
      },
    }),
  },

  dateOut: {
    type: Date,
    default: Date.now,
  },

  dateReturned: {
    type: Date,
  },

  retntalFee: {
    type: Number,
    min: 0,
  },
});
const Rental = mongoose.model("Rental", rentalSchema);

function validateRental(rental) {
  const schema = {
    customerId: Joi.objectId().required(),
    movieId: Joi.objectId().required(),
  };

  return Joi.validate(rental, schema);
}

exports.Rental = Rental;
module.exports.validateRental;
