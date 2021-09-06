import { doCheckin } from './resources/applicationActions';

export default [
  (store, props) => {

    let habit_position = store.habits.findIndex(function(habit) {
      if (habit.id === props.habit_id) {
        return true;
      }
      return false;
    });

    return {
      checkins : store.habits[habit_position].checkinSlots,
      profile  : store.habits[habit_position].profile,
      beginDate: store.habits[habit_position].beginDate
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
