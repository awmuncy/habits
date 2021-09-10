const express = require('express');
const router = new express.Router();

import { DO_CHECKIN, NEW_HABIT, SAVE_CHECKIN } from '../../../actions';


let findStored = function(user, lastSync) {

  let dispatches = [];




  user.habits.forEach(habit => {

    if (habit.modified_at > lastSync) {
      let sendHabit = {id: habit.id};
      sendHabit = Object.assign(sendHabit, habit._doc);
      sendHabit.id = habit._id;
      delete sendHabit._id;

      dispatches.push({
        type : NEW_HABIT,
        habit: sendHabit
      });
    }


    habit.checkins.forEach(checkin=>{
      let synced_at = new Date(checkin.synced_at).getTime();

      if (synced_at > lastSync) {
        dispatches.push({
          type    : DO_CHECKIN,
          habit_id: habit._id,
          checkin : checkin
        });
      }
    });
    habit.goals = habit.goals ? habit.goals : [];
    habit.goals.forEach(goal=>{
      let synced_at = new Date(goal.synced_at).getTime();

      if (synced_at > lastSync) {
        dispatches.push({
          type    : 'NEW_HABIT_GOAL',
          habit_id: habit._id,
          goal    : goal
        });
      }
    });

  });

  return dispatches;
};

let saveNewer = function(user, incoming) {

  // Why two switch statements?
  // Because a habit needs to be
  // saved before it's checkins
  user.syncTopLevelItems(incoming);

  incoming.forEach(dispatch => {
    let habIndex;
    switch (dispatch.type) {

    case SAVE_CHECKIN:
      habIndex = user.habits.findIndex(habit=>{

        return dispatch.habit_id === habit._id.toString();
      });
      user.habits[habIndex].syncCheckins([dispatch.checkin]);
      break;

    case 'NEW_HABIT_GOAL':
      habIndex = user.habits.findIndex(habit=>{
        return dispatch.habit_id === habit._id;
      });

      user.habits[habIndex].syncGoals([dispatch.goal]);
      break;
    }
  });


  user.save();


};



router.post('/sync', (req, res) => {
  console.log("SYnc?");
  req.user.then(user => {
    user.ephemerals.push({});
    user.save();
  });
  let incomingDispatches, currentUser, lastSync;

  incomingDispatches = req.body.dispatches;


  req.user.then((user) => {

    let lastSync = req.body.lastSync ? req.body.lastSync.value : 0;
    let dispatchesFromNewer = saveNewer(user, incomingDispatches);
    let dispatches = findStored(user, lastSync);

    res.json({
      timestamp : new Date().getTime(),
      dispatches: [...dispatches]
    });
  });

});

module.exports = router;
