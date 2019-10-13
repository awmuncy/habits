const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CoreValue = new Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String
  },
  position: {
    type: Number,
    required: false
  },
  deleted: {
    type: Boolean
  },
  modified_at: {
    type: Number
  }
});


module.exports = {
  CoreValue: CoreValue
};