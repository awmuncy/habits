import mongoose from 'mongoose';

import {Goal, GoalModel} from './HabitGoal.js';

const Schema = mongoose.Schema;

// Create Schema
const HabitSchema = new Schema({
  title: {
    type    : String,
    required: true
  },
  position: {
    type: Number
  },
  deleted: {
    type: Boolean
  },
  profile: {
    type: Object
  },
  checkins: {
    type   : [Number],
    default: []
  },
  modified_at: {
    type: Number
  },
  sleep: {
    type: Boolean
  },
  goals: {
    type: Array
  }
});



HabitSchema.methods.syncGoals = function(newGoals) {

  newGoals.forEach(newGoal => {
    let exists = false;
    newGoal.synced_at = new Date();
    this.goals.forEach((storedGoal, index) => {
      if (storedGoal._id === newGoal._id) {
        if (storedGoal.isNewerThan(newGoal)) {
          this.goal[index] = newGoal;
        }
        exists = true;
      }
    });
    if (!exists) {
      this.goals.push(newGoal);
    }
  });

};

const Habit = HabitSchema;
const HabitModel = mongoose.model('habits', HabitSchema);

export {
  Habit,
  HabitModel
};
