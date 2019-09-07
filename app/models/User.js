const mongoose = require("mongoose");
const {Habit} = require("./Habit.js");
const {Goal} = require("./Goal");
const {CoreValue} = require("./CoreValue");
const Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var User;
// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  habits: {
      type: [Habit]
  },
  goals: {
    type: [Goal]
  },
  corevalues: {
    type: [CoreValue]
  },
  pinned_habits: {
    type: [ObjectId]
  }
});

UserSchema.methods.syncGoals = function(incomingGoals) {

  incomingGoals.forEach(incomingGoal => {
    var exists = false;
    this.goals.forEach((storedGoal, index) => {
      if(incomingGoal._id == storedGoal._id) {
        exists = true;
        this.goals[index] = storedGoal;
      }
    });

    if(!exists) {
      this.goals.push(incomingGoal);
    }


  });

}

UserSchema.methods.syncCoreValues = function(incomingCoreValues) {

  incomingCoreValues.forEach(incomingCoreValue => {
    var exists = false;
    this.corevalues.forEach((storedCoreValue, index) => {
      if(incomingCoreValue.id == storedCoreValue._id) {
        exists = true;
        this.corevalues[index] = incomingCoreValue;
      }
    });

    if(!exists) {
      delete incomingCoreValue.id;
      this.corevalues.push(incomingCoreValue);
    }


  });

}

UserSchema.methods.syncHabits = function(incomingHabits) {

  
  incomingHabits.forEach(incomingHabit => {
    var exists = false;
    this.habits.forEach((storedHabit, index) => {

      if(incomingHabit._id == storedHabit._id) {
        incomingHabit.at = Date.parse(incomingHabit.at);
        exists = true;
        storedHabit.deleted = incomingHabit.deleted;
        storedHabit.syncCheckins(incomingHabit.checkins);
        this.habits[index] = storedHabit;
      }

    });

    if(!exists) {
      this.habits.push(incomingHabit);
    }
  });

};

module.exports = User = mongoose.model("users", UserSchema);