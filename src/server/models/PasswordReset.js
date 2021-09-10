import mongoose from 'mongoose';
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


export default PasswordReset = mongoose.model('passwordReset', PasswordResetSchema);
