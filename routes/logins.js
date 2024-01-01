const { Login, validate } = require("../models/login");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const login = new Login(
    {
      username: req.body.username,
      password: req.body.password,
    },
    { new: true }
  );

  await login.save();

  res.send(login);
});

module.exports = router;
