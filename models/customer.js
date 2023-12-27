const Joi = require("joi");
const mongoose = require("mongoose");

const Customer = mongoose.model(
  "Customer",
  new mongoose.Schema({
    isGold: { type: Boolean, default: false },
    name: { type: String, required: true, minlength: 5, maxlength: 50 },
    phone: { type: String, required: true, minlength: 5, maxlength: 50 },
  })
);

function valdiateCustomer(customer) {
  const schema = {
    isGold: Joi.Boolean(),
    name: Joi.String().min(5).max(50).requred(),
    phone: Joi.String().min(11),
  };

  return Joi.validate(customer, schema);
}

exports.Customer = Customer;
module.exports.valdiateCustomer;
