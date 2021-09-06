const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let PasswordReset;
// Create Schema
const PasswordResetSchema = new Schema({
  user: {
    type    : String,
    required: true
  },
  expires: {
    type    : Date,
    required: true
  }
});


module.exports = PasswordReset = mongoose.model('passwordReset', PasswordResetSchema);
