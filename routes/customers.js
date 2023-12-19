const mongoose = require("mongoose");
const express = require("express");
const Joi = require("joi");
const func = require("joi/lib/types/func");
const router = express.Router();

router.get("/", async (req, res) => {
  const customers = await Customer.findById().sort("name");
  res.send(customers);
});

router.post("/", async (req, res) => {
  const { error } = valdiateCustomer(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let customer = new Customer({
    isGold: req.body.isGold,
    name: req.body.name,
    phone: req.body.phone,
  });

  customer = await customer.save();
  res.send(customer);
});

router.put("/:id", async (req, res) => {
  const { error } = valdiateCustomer(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findByIdAndUpdate(
    req.params.id,
    {
      isGold: req.body.isGold,
      name: req.body.name,
      phone: req.body.phone,
    },
    { new: true }
  );

  if (!customer)
    return res
      .status(404)
      .send("The customer you're looking for doesn't exist");
});

router.delete("/:id", async (req, res) => {
  const customer = await Customer.findByIdAndRemove(req.params.id);

  if (!customer)
    return res
      .status(404)
      .send("The customer you're looking for doesn't exist");

  res.send(customer);
});

router.get("/:id", async (req, res) => {
  const customer = await Customer.findById(req.params.id);

  if (!customer)
    return res
      .status(404)
      .send("The customer you're looking for doesn't exist");

  res.send(customer);
});

function valdiateCustomer(customer) {
  const schema = {
    isGold: Joi.Boolean(),
    name: Joi.String().min(5).max(50).requred(),
    phone: Joi.String().min(11),
  };

  return Joi.validate(customer, schema);
}

module.exports = router;
