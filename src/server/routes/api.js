import express from 'express';
const router = new express.Router();
import usersRoutes from './api/users.js';
import authRoutes from './api/authentication.js';
import apiMiddleware from './api/apiMiddleware.js';
import resetPassword from './api/passwordReset.js';
import payments from './api/payments.js';


router.use('/auth', authRoutes);
router.use('*', apiMiddleware);
router.use('/users', usersRoutes);
router.use('/reset-password', resetPassword);
router.use('/payments', payments);

export default router;
