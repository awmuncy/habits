const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let Habit;
// Create Schema
const CheckinSchema = new Schema({
  checkinFor: {
    type    : String,
    required: true
  },
  at: {
    type    : Date,
    required: true
  },
  synced_at: {
    type: Date
  },
  status: {
    type: Boolean
  },
  note: {
    type: String
  }
});

CheckinSchema.methods.isNewerThan = function(incoming) {
  let currentlyStored = this;

  if (incoming.at > currentlyStored.at) {
    return this;
  }
  return null;
};

module.exports = {
  Checkin     : CheckinSchema,
  CheckinModel: mongoose.model('checkins', CheckinSchema)
};
