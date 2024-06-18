const express = require("express");
const router = express.Router();

const authRoutes = require("./auth");
const profileUpdateRoutes = require("./profileUpdate")
const taskRoutes = require("./task");
// const groupRoutes = require('./group');

router.use("/auth", authRoutes);
router.use("/auth", profileUpdateRoutes);
router.use("/task", taskRoutes);
// router.use('/group', groupRoutes);

module.exports = router;
