import { pinHabit, unpinHabit, removeHabit, archiveHabit } from './resources/applicationActions.js';

export default [
  state => {
    return {
      pinned_habits: state.pinned_habits
    };
  },
  dispatch => {
    return {
      pin: id => {
        dispatch(pinHabit(id));
      },
      unpin: id => {
        dispatch(unpinHabit(id));
      },
      removeHabit : id => dispatch(removeHabit(id)),
      archiveHabit: id => dispatch(archiveHabit(id))
    };
  }
];
