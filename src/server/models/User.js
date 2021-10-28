import mongoose from 'mongoose';
import {Habit} from './Habit.js';
const Schema = mongoose.Schema;
let ObjectId = mongoose.Schema.Types.ObjectId;
let toObjectId = mongoose.Types.ObjectId;
let User;
import { SAVE_HABIT } from '../../actions.js';

// Create Schema
const UserSchema = new Schema({
  name: {
    type    : String,
    required: true
  },
  email: {
    type    : String,
    required: true
  },
  password: {
    type    : String,
    required: true
  },
  date: {
    type   : Date,
    default: Date.now
  },
  habits: {
    type: [Habit]
  },
  subscription_type: {
    type: String
  }
});


UserSchema.methods.syncTopLevelItems = function(incomingDispatches) {
  incomingDispatches.forEach(dispatch => {
    let storeType;
    switch (dispatch.type) {
    case SAVE_HABIT:
      storeType = 'habits';
      break;
    default:
      return;
    }

    dispatch.payload._id = dispatch.payload.id;
    delete dispatch.payload.id;



    let storeItemIndex = this[storeType].findIndex(storableItem => {
      return storableItem._id === dispatch.payload._id;
    });
    if (storeItemIndex === -1) {
      this[storeType].push(dispatch.payload);
    } else {
      this[storeType][storeItemIndex] = Object.assign(this[storeType][storeItemIndex], dispatch.payload);
    }


  });
};

export default User = mongoose.model('users', UserSchema);
