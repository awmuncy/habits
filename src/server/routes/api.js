const express = require('express');
const router = new express.Router();
const usersRoutes = require('./api/users');
const authRoutes = require('./api/authentication');
const apiMiddleware = require('./api/apiMiddleware');

router.use('/auth', authRoutes);
router.use('*', apiMiddleware);
router.use('/users', usersRoutes);
// router.use('/ephemeral', ephemeralRoutes);

module.exports = router;
