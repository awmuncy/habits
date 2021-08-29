const mongoose = require("mongoose");

const Schema = mongoose.Schema;
var Recall;
// Create Schema
const RecallSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  body: {
      type: String,
      required: true
  },
  recalls: {
      type: Array,
      default: []
  }
});

module.exports = {
    Recall: RecallSchema,
    RecallModel: mongoose.model("Recalls", RecallSchema)
};