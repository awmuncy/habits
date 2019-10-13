const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
// Load User model
const User = require("../../models/User");

import jwt_decode from 'jwt-decode';
import { DO_CHECKIN, NEW_HABIT, SAVE_CHECKIN, DECLARE_GOAL } from '../../resources/assets/js/actions';


// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
    // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  var user = User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });
      newUser.logToConsole("hi!");

      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

  // @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
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
        return res.status(404).json({ emailnotfound: "Email not found" });
      }
      // Check password
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          // User matched
          // Create JWT Payload
          const payload = {
            id: user.id,
            name: user.name
          };
          // Sign token
          jwt.sign(
            payload,
            keys.secretOrKey,
            {
              expiresIn: 31556926 // 1 year in seconds
            },
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token
              });
            }
          );
        } else {
          return res
            .status(400)
            .json({ passwordincorrect: "Password incorrect" });
        }
      });
    });
  });


var findStored = function(user, lastSync) {

  var dispatches = [];

  user.goals.forEach(goal => {
    if(goal.modified_at>lastSync) {
      var sendGoal = {id: goal.id};
      sendGoal = Object.assign(sendGoal, goal._doc);
      sendGoal.id = goal._id;
      sendGoal.endDate = new Date(sendGoal.endDate).getTime();
      delete sendGoal._id;
      console.log("HERE");
      dispatches.push({
        type: DECLARE_GOAL,
        goal: sendGoal
      });
    }
  });

  user.habits.forEach(habit => {

    if(habit.modified_at>lastSync) {
      var sendHabit = {id: habit.id};
      sendHabit = Object.assign(sendHabit, habit._doc);
      sendHabit.id = habit._id;
      delete sendHabit._id;

      dispatches.push({
        type: NEW_HABIT,
        habit: sendHabit
      });
    }


    habit.checkins.forEach(checkin=>{
      var modified_at = new Date(checkin.at).getTime()

      if(modified_at>lastSync) {
        dispatches.push({
          type: DO_CHECKIN,
          habit_id: habit._id,
          checkin: checkin
        });
      }
    });
  });

  return dispatches;
}

var saveNewer = function(user, incoming) {
  
  // Why two switch statements?
  // Because a habit needs to be
  // saved before it's checkins
  user.syncTopLevelItems(incoming);

  incoming.forEach(dispatch => {
    switch(dispatch.type) {
  
      case SAVE_CHECKIN:
        var habIndex = user.habits.findIndex(habit=>{
          return dispatch.habit_id==habit._id;
        });
        user.habits[habIndex].syncCheckins([dispatch.checkin]);
        break;
    }
  });
  

  user.save();
  

}

router.post("/sync", (req, res) => {

  var incomingDispatches, currentUser, lastSync;
  
  incomingDispatches = req.body.dispatches;
  currentUser = jwt_decode(req.body.userToken.value).id;
  lastSync = req.body.lastSync ? req.body.lastSync.value : 0;

  User.findById(currentUser).then((user) => {

    var dispatchesFromNewer = saveNewer(user, incomingDispatches);
    var dispatches = findStored(user, lastSync);
    
    res.json({
      timestamp: new Date().getTime(),
      dispatches: [...dispatches]
    });
  });

});

module.exports = router;



      //user.syncHabits(incomingHabits);
      // user.syncGoals(incomingGoals);
      // user.syncCoreValues(incomingCoreValues);
      // user.pinned_habits = req.body.pinned_habits[0]===undefined ? user.pinned_habits : req.body.pinned_habits;
