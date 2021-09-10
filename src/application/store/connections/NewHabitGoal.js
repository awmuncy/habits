import { newHabitGoal } from './resources/applicationActions.js';

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
