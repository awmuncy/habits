import { saveUser, syncStart } from './resources/applicationActions.js';

export default {
  props: () => {
    return {};
  },
  dispatches: dispatch => {
    return {
      saveUser : (token, subscription_type) => dispatch(saveUser(token, subscription_type)),
      syncStart: () => dispatch(syncStart())
    };
  }
};
