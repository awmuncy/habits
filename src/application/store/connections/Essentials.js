import { doCheckin } from './resources/applicationActions';

export default [
  (store, props) => {

    let habit_position = store.habits.findIndex(function(habit) {
      if (habit.id === props.habit_id) {
        return true;
      }
      return false;
    });

    let checkins = store.habits[habit_position].checkinSlots;

    let outstanding = checkins.filter(checkin => checkin.status === null).length;

    let currentCheckin = checkins[checkins.length - 1];


    return {
      habit               : store.habits[habit_position],
      currentCheckin      : currentCheckin,
      currentCheckinStatus: currentCheckin ? currentCheckin.status : null,
      outstanding         : outstanding,
      goals               : store.habits[habit_position].goals
    };
  },
  dispatch => {

    return {
      checkIn: (habit_id, date, status) => {
        let now = new Date();
        now = now.getTime();
        dispatch(doCheckin(habit_id, date, status, now));
      }
    };

  }
];
