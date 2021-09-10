import { removeHabit } from './resources/applicationActions.js';

export default {
  props: () => {
    return {};
  },
  dispatches: dispatch => {
    return {
      RemoveHabit: id => dispatch(removeHabit(id))
    };
  }
};
