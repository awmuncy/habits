const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var Habit;
// Create Schema
const CheckinSchema = new Schema({
  checkinFor: {
    type: String,
    required: true
  },
  at: {
    type: Date,
    required: true
  },
  status: {
    type: Boolean
  },
  note: {
    type: String
  }
});

CheckinSchema.methods.isNewerThan = function(incoming) {
  var currentlyStored = this;

  if(incoming.at > currentlyStored.at) {
    return this;
  }
  return null;
};

module.exports = {
  Checkin: CheckinSchema,
  CheckinModel: mongoose.model("checkins", CheckinSchema)
};