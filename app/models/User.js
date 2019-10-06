const mongoose = require("mongoose");
const {Habit} = require("./Habit.js");
const {Goal} = require("./Goal");
const {CoreValue} = require("./CoreValue");
const Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;
var toObjectId = mongoose.Types.ObjectId;
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
    var habitIndex = this.habits.findIndex(storedHabit=>{
      return storedHabit._id == incomingHabit.id;
    });

    incomingHabit._id = toObjectId(incomingHabit.id); 

    delete incomingHabit.id;
    
    
    if(habitIndex==-1) {
      console.log("No match");
      this.habits.push(incomingHabit);
    } else {
      delete incomingHabit.checkins;
      this.habits[habitIndex] = Object.assign(this.habits[habitIndex], incomingHabit);
    }
    
  });

  
};

module.exports = User = mongoose.model("users", UserSchema);