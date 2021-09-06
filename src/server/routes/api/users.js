const express = require('express');
const router = new express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
// Load input validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');
// Load User model
const User = require('../../models/User');

let { newUserEmail } = require('../../mail/email');

import jwt_decode from 'jwt-decode';
import { DO_CHECKIN, NEW_HABIT, SAVE_CHECKIN } from '../../../actions';


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


let findStored = function(user, lastSync) {

  let dispatches = [];




  user.habits.forEach(habit => {

    if (habit.modified_at > lastSync) {
      let sendHabit = {id: habit.id};
      sendHabit = Object.assign(sendHabit, habit._doc);
      sendHabit.id = habit._id;
      delete sendHabit._id;

      dispatches.push({
        type : NEW_HABIT,
        habit: sendHabit
      });
    }


    habit.checkins.forEach(checkin=>{
      let synced_at = new Date(checkin.synced_at).getTime();

      if (synced_at > lastSync) {
        dispatches.push({
          type    : DO_CHECKIN,
          habit_id: habit._id,
          checkin : checkin
        });
      }
    });
    habit.goals = habit.goals ? habit.goals : [];
    habit.goals.forEach(goal=>{
      let synced_at = new Date(goal.synced_at).getTime();

      if (synced_at > lastSync) {
        dispatches.push({
          type    : 'NEW_HABIT_GOAL',
          habit_id: habit._id,
          goal    : goal
        });
      }
    });

  });

  return dispatches;
};

let saveNewer = function(user, incoming) {

  // Why two switch statements?
  // Because a habit needs to be
  // saved before it's checkins
  user.syncTopLevelItems(incoming);

  incoming.forEach(dispatch => {
    let habIndex;
    switch (dispatch.type) {

    case SAVE_CHECKIN:
      habIndex = user.habits.findIndex(habit=>{

        return dispatch.habit_id === habit._id.toString();
      });
      user.habits[habIndex].syncCheckins([dispatch.checkin]);
      break;

    case 'NEW_HABIT_GOAL':
      habIndex = user.habits.findIndex(habit=>{
        return dispatch.habit_id === habit._id;
      });

      user.habits[habIndex].syncGoals([dispatch.goal]);
      break;
    }
  });


  user.save();


};

router.use('*', AuthenticateUser);

async function AuthenticateUser(req, res, next) {

  let currentUser;

  try {
    currentUser = jwt_decode(req.body.userToken && req.body.userToken.value).id;

    currentUser = User.findById(currentUser);

  } catch (err) {
    res.status(401).send('User not authenticated');
  }


  req.user = currentUser;
  next();
}

router.post('/sync', (req, res) => {

  let incomingDispatches, currentUser, lastSync;

  incomingDispatches = req.body.dispatches;


  req.user.then((user) => {

    let lastSync = req.body.lastSync ? req.body.lastSync.value : 0;
    let dispatchesFromNewer = saveNewer(user, incomingDispatches);
    let dispatches = findStored(user, lastSync);

    res.json({
      timestamp : new Date().getTime(),
      dispatches: [...dispatches]
    });
  });

});

module.exports = router;
