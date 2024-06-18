const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.TOKEN_KEY;
const { User } = require("../model/user");

const express = require("express");
const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = await req.body;

    if (!(name && email && password)) {
      res.status(400).send("All input is required");
    }

    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    // Create token
    const token = jwt.sign(
      { user_id: user._id, email },
      SECRET_KEY,
      { expiresIn: "2h" }
    );

    // Save user token
    // user.token = token;

    res.status(201).json({ user, token });
  } catch (err) {
    console.log(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    const user = await User.findOne({ email });

    if (user && password === user.password) {

      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        SECRET_KEY,
        { expiresIn: "2h" }
      );

      res.status(200).json({ user, token });
    } else {
      res.status(400).send("Invalid Credentials");
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
