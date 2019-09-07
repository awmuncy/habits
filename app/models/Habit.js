const mongoose = require("mongoose");
const {Checkin, CheckinModel} = require("./Checkin.js");

const Schema = mongoose.Schema;
var Habit;
// Create Schema
const HabitSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  position: {
    type: Number
  },
  beginDate: {
    type: Date,
    required: true
  },
  deleted: {
    type: Boolean
  },
  checkins: {
    type: [Checkin],
    default: []
  }
});

HabitSchema.methods.syncCheckins = function(newCheckins) {

  newCheckins.forEach(newCheckin => {
    var exists = false;

    this.checkins.forEach((storedCheckin, index) => {
      if(storedCheckin._id == newCheckin._id) {
        if(storedCheckin.isNewerThan(newCheckin)){
          this.checkins[index] = newCheckin;
          
        }        
        exists = true;
      }
    });
    if(!exists) {
      this.checkins.push(newCheckin);
    }
  });  

};

module.exports = {
  Habit: HabitSchema,
  HabitModel: mongoose.model("habits", HabitSchema)
};