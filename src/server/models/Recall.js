import mongoose from 'mongoose';

const Schema = mongoose.Schema;
// Create Schema
const RecallSchema = new Schema({
  title: {
    type    : String,
    required: true
  },
  body: {
    type    : String,
    required: true
  },
  recalls: {
    type   : Array,
    default: []
  }
});


const RecallModel = mongoose.model('Recalls', RecallSchema);
export {
  RecallSchema as Recall,
  RecallModel
};
