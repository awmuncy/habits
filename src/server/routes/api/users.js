import express from 'express';
const router = new express.Router();
import HabitsRoutes from './habitsRoutes.js';
import { NEW_HABIT} from '../../../actions.js';


router.post('/sync', SyncRequestDepracated);
router.get('/:id((([\\d|[a-z]){24}|([\\d|[a-z]){6}))', RequestUser);
router.use('/:id((([\\d|[a-z]){24}|([\\d|[a-z]){6}))/habits', HabitsRoutes);



function SyncRequestDepracated(req, res, next) {

  req.user.then(user => {
    user.save();
  });
  let incomingDispatches, currentUser, lastSync;

  incomingDispatches = req.body.dispatches;


  req.user.then((user) => {
    if (user === undefined) {
      res.send(401);
      return;
    }

    let lastSync = req.body.lastSync ? req.body.lastSync.value : 0;
    let dispatchesFromNewer = saveNewer(user, incomingDispatches);
    let dispatches = findStored(user, lastSync);

    res.json({
      timestamp : new Date().getTime(),
      dispatches: [...dispatches]
    });
  });
}

function RequestUser(req, res, next) {
  req.user.then(user => {
    if (user._id.toString() !== req.params.id.toString()) {
      res.status(401);
      res.send('Nope');
      return;
    }
    let userBasics = JSON.parse(JSON.stringify(user));
    delete userBasics.habits;
    delete userBasics.password;
    res.json(userBasics);
  });
}


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
  user.syncTopLevelItems(incoming);

  incoming.forEach(dispatch => {
    let habIndex;
    switch (dispatch.type) {



    case 'NEW_HABIT_GOAL':
      habIndex = user.habits.findIndex(habit=>{
        return dispatch.habit_id === habit._id;
      });
      if (habIndex === -1) {
        break;
      }
      user.habits[habIndex].syncGoals([dispatch.goal]);
      break;
    }
  });


  user.save();


};



export default router;
