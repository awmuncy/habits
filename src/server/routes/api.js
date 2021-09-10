import express from 'express';
const router = new express.Router();
import usersRoutes from './api/users.js';
import authRoutes from './api/authentication.js';
import apiMiddleware from './api/apiMiddleware.js';

router.use('/auth', authRoutes);
router.use('*', apiMiddleware);
router.use('/users', usersRoutes);
// router.use('/ephemeral', ephemeralRoutes);

export default router;
