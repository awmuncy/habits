const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Goal = new Schema({
  title: {
    type: String,
    required: true
  },
  position: {
    type: Number
  },
  endDate: {
    type: Date,
    required: true
  },
  status: {
    type: Boolean
  },
  deleted: {
    type: Boolean
  }
});

module.exports = {
  Goal: Goal
};