const Joi = require("joi");
const mongoose = require("mongoose");

const Login = mongoose.model(
  "Login",
  new mongoose.Schema({
    username: {
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
      maxlength: 255,
      trim: true,
    },
  })
);

function validateLogin(login) {
  const schema = {
    username: Joi.email().required(),
    password: Joi.password(),
  };
}

exports.Login = Login;
exports.validate = validateLogin;
