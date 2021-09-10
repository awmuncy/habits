import mongoose from 'mongoose';
import {Checkin, CheckinModel} from './Checkin.js';
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
  beginDate: {
    type    : Date,
    required: true
  },
  deleted: {
    type: Boolean
  },
  checkins: {
    type   : [Checkin],
    default: []
  },
  profile: {
    type: Object
  },
  modified_at: {
    type: Number
  },
  dormant: {
    type: Object
  },
  goals: {
    type: Array
  }
});

HabitSchema.methods.syncCheckins = function(newCheckins) {

  newCheckins.forEach(newCheckin => {
    let exists = false;
    newCheckin.synced_at = new Date();

    this.checkins.forEach((storedCheckin, index) => {
      if (storedCheckin.checkinFor === newCheckin.checkinFor) {
        if (storedCheckin.isNewerThan(newCheckin)) {
          this.checkins[index] = newCheckin;

        }
        exists = true;
      }
    });
    if (!exists) {
      this.checkins.push(newCheckin);
    }
  });

};

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
