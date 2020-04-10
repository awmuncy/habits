const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var Habit;
// Create Schema
const GoalSchema = new Schema({
  strength: {
      type: Number
  },
  goalDate: {
    type: String,
    required: true
  },
  startingPoint: {
    type: Number
  },
  color: {
    type: String
  },
  modified_at: {
    type: Date,
    required: true
  },
  synced_at: {
    type: Date
  }
});

GoalSchema.methods.isNewerThan = function(incoming) {
  var currentlyStored = this;

  if(incoming.modified_at > currentlyStored.modified_at) {
    return this;
  }
  return null;
};

module.exports = {
  Goal: GoalSchema,
  GoalModel: mongoose.model("goals", GoalSchema)
};