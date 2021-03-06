import express from 'express';
const router = new express.Router();
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import keys from '../../config/keys.js';
// Load input validation
import validateRegisterInput from '../../validation/register.js';
import validateLoginInput from '../../validation/login.js';
// Load User model
import User from '../../models/User.js';

import { newUserEmail } from '../../mail/email.js';


// @route POST api/users/register
// @desc Register user
// @access Public
router.post('/register', (req, res) => {
  // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  let user = User.findOne({ email: new RegExp(`^${req.body.email}$`, 'i') }).then(user => {
    if (user) {
      return res.status(400).json({ email: 'Email already exists' });
    } else {
      const newUser = new User({
        name    : req.body.name,
        email   : req.body.email,
        password: req.body.password
      });


      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        // eslint-disable-next-line no-console
        console.log(err);
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) { throw err; }
          newUser.password = hash;
          newUser
            .save()
            .then(user => {

              res.json({success: true});
            })
            // eslint-disable-next-line no-console
            .catch(err => console.log(err));

          newUserEmail(newUser.email, newUser.name);
        });
      });
    }
  });
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post('/login', (req, res) => {
  // Form validation
  const { errors, isValid } = validateLoginInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;
  // Find user by email
  User.findOne({ email }).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: 'Email not found' });
    }
    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload

        const payload = {
          id               : user.id,
          name             : user.name,
          subscription_type: user.subscription_type
        };
          // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926 // 1 year in seconds
          },
          (err, token) => {
            // eslint-disable-next-line no-console
            console.log(err);
            res.json({
              success: true,
              token  : 'Bearer ' + token
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: 'Password incorrect' });
      }
    });
  });
});

export default router;
