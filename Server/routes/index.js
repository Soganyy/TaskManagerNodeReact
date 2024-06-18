const express = require('express');
const router = express.Router();

const authRoutes = require('./auth');
const taskRoutes = require('./task');
// const groupRoutes = require('./group');

router.use('/auth', authRoutes);
router.use('/task', taskRoutes);
// router.use('/group', groupRoutes);

module.exports = router;
