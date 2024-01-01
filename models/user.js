const Joi = require("joi");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 225,
    trim: true,
  },

  lastName: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 225,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 225,
    trim: true,
    unique: true,
  },

  phone: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    trim: true,
  },

  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
    trim: true,
  },
});

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = {
    firstName: Joi.string().min(5).max(225).required(),
    lastName: Joi.string().min(5).max(225).required(),
    email: Joi.string().min(5).max(225).required().email(),
    phone: Joi.string().min(5).max(225).required(),
    password: Joi.string().min(5).max(225).required(),
  };

  return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;
