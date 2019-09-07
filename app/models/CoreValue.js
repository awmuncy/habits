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
    required: true
  },
  deleted: {
    type: Boolean
  }
});


module.exports = {
  CoreValue: CoreValue
};