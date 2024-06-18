const verifyToken = require("../middleware/authMiddleware");
const { Task } = require("../model/task");
const { User } = require("../model/user");

const express = require("express");
const router = express.Router();

router.post("/create", verifyToken, async (req, res) => {
  try {
    const { title, description, dueDate } = req.body;

    const user = await User.findOne({ email: req.user.email });

    const task = await Task.create({
      title,
      description,
      dueDate,
      owner: user,
    });

    res.status(200).json(task);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});

router.post("/get", verifyToken, async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email});

    const tasks = await Task.find({ owner: user });

    res.status(201).json(tasks);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});

module.exports = router
