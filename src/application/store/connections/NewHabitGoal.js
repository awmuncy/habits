import { newHabitGoal } from './resources/applicationActions';

export default [
  () => {
    return {};
  },
  dispatch => {
    return {
      newHabitGoal: (habit_id, goal) => dispatch(newHabitGoal(habit_id, goal))
    };
  }
];
