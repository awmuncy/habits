import mongoose from 'mongoose';

const EphemeralSchema = new mongoose.Schema({
  title        : { type: String },
  description  : { type: String },
  cron         : { type: String },
  reminderTimes: { type: String },
  id           : { type: String },
  interval     : { type: Object },
  reminders    : { type: Array },
  onComplete   : { type: Array },
  lastPerformed: { type: Number },
  remindersSent: { type: Array }
});

const Ephemeral = mongoose.model('Ephemeral', EphemeralSchema);

export {
  EphemeralSchema,
  Ephemeral
};
