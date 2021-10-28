import express from 'express';
const router = new express.Router({mergeParams: true});

router.post('/new', NewHabit);
router.get('/', RequestHabits);
router.get('/:habit((([\\d|[a-z]){24}|([\\d|[a-z]){6}))', RequestHabit);
router.post('/:habit((([\\d|[a-z]){24}|([\\d|[a-z]){6}))/checkin', Postcheckin);
router.delete('/:habit((([\\d|[a-z]){24}|([\\d|[a-z]){6}))/checkin', Deletecheckin);

async function NewHabit(req, res, next) {

  let user = await req.user;

  let newHabit = req.body;

  let newHabitIndex = user.habits.push(newHabit);


  try {
    user.save();
    res.json(user.habits[newHabitIndex - 1]);
  } catch (err) {
    res.status(400).json({code: 'failure'});
  }

}

function RequestHabits(req, res, next) {
  req.user.then(user => {
    if (user._id.toString() !== req.params.id.toString()) {
      res.status(401);
      res.send('Nope');
      return;
    }

    res.json(user.habits);
  });
}

function RequestHabit(req, res, next) {
  req.user.then(user => {
    if (user._id.toString() !== req.params.id.toString()) {

      res.status(401);
      res.send('Nope');
      return;
    }
    let habit = user.habits.find(habit => {

      return habit._id.toString() === req.params.habit.toString();
    });
    res.json(habit);
  });

}

function Postcheckin(req, res, next) {
  req.user.then(user => {
    let habit = user.habits.find(hab => hab._id.toString() === req.params.habit.toString());
    habit.checkins = Array.isArray(habit.checkins) ? habit.checkins : [];

    habit.checkins.push(req.body?.value || new Date().getTime());
    habit.checkins = [...new Set(habit.checkins)];
    user.save();
  });
  res.status(201).send();
}


function Deletecheckin(req, res, next) {
  req.user.then(user => {
    let habit = user.habits.find(hab => hab._id.toString() === req.params.habit.toString());
    let checkin = habit.checkins.indexOf(parseInt(req.body.value));
    if (checkin !== -1) {
      habit.checkins.splice(checkin, 1);
    }
    user.save();
  });
  res.status(201).send();
};



export default router;
