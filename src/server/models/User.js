const mongoose = require("mongoose");
const {Habit} = require("./Habit.js");
const {Goal} = require("./Goal");
const {CoreValue} = require("./CoreValue");
const Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;
var toObjectId = mongoose.Types.ObjectId;
var User;
import { SAVE_HABIT, DECLARE_GOAL, DECLARE_CORE_VALUE } from '../../actions';

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
  },
  subscription_type: {
    type: String
  }
});


UserSchema.methods.syncTopLevelItems = function(incomingDispatches) {
  incomingDispatches.forEach(dispatch => {
    var storeType;
    switch (dispatch.type) {
      case DECLARE_GOAL:
        storeType = "goals";
        break;
      case SAVE_HABIT: 
        storeType = "habits";
        break;
      case DECLARE_CORE_VALUE:
        storeType = "corevalues";
        break;
      default: 
        return;
    }

    dispatch.payload._id = dispatch.payload.id;
    delete dispatch.payload.id;



    var storeItemIndex = this[storeType].findIndex(storableItem => {
      return storableItem._id==dispatch.payload._id;
    });
    if(storeItemIndex==-1) {
      this[storeType].push(dispatch.payload);
    } else {
      this[storeType][storeItemIndex] = Object.assign(this[storeType][storeItemIndex], dispatch.payload);
    }


  });
}

module.exports = User = mongoose.model("users", UserSchema);