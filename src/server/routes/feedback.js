import express from 'express';
const router = new express.Router();
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { feedbackEmail } from '../mail/email.js';


import PasswordReset from '../models/PasswordReset.js';
import User from '../models/User.js';

import { passwordResetTemplate } from '../useHandlebars.js';




// This route receives the form
router.post('/', (req, res) => {


  let currentUser = req.body.userToken;


  User.findById(currentUser).then((user) => {

    feedbackEmail(req.body.feedback, user.name, user.email);
    res.redirect('/home');
  });




});

export default router;
