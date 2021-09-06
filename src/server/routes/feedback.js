const express = require('express');
const router = new express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
let { feedbackEmail } = require('../mail/email');


let PasswordReset = require('../models/PasswordReset');
let User = require('../models/User');

import { PasswordResetTemplate } from '../useHandlebars';




// This route receives the form
router.post('/', (req, res) => {


  let currentUser = req.body.userToken;


  User.findById(currentUser).then((user) => {

    feedbackEmail(req.body.feedback, user.name, user.email);
    res.redirect('/home');
  });




});

module.exports = router;
