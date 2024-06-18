const { User } = require("../model/user");
const verifyToken = require("../middleware/authMiddleware");

const express = require("express");
const router = express.Router();

router.put("/update", verifyToken, async (req, res) => {
  try {
    const { name, password } = await req.body;

    if (!(name && password)) {
      return res.status(400).send("All input is required");
    }

    const changedUser = await User.findOneAndUpdate(
      { email: req.user.email },
      {
        name: name,
        password: password,
      }
    );

    res.status(200).json(changedUser);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
