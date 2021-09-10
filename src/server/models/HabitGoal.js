import mongoose from 'mongoose';
const Schema = mongoose.Schema;
let Habit;
// Create Schema
const GoalSchema = new Schema({
  strength: {
    type: Number
  },
  goalDate: {
    type    : String,
    required: true
  },
  startingPoint: {
    type: Number
  },
  color: {
    type: String
  },
  modified_at: {
    type    : Date,
    required: true
  },
  synced_at: {
    type: Date
  }
});

GoalSchema.methods.isNewerThan = function(incoming) {
  let currentlyStored = this;

  if (incoming.modified_at > currentlyStored.modified_at) {
    return this;
  }
  return null;
};

const Goal = GoalSchema;
const GoalModel = mongoose.model('goals', GoalSchema);

export {
  Goal,
  GoalModel
};
