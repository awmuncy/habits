import { toggleNav } from './resources/pageActions.js';

export default {
  props: state => {
    return { navigation: state.navigation };
  },
  dispatches: dispatch => {

    return {
      toggleNav: toggle => dispatch(toggleNav())
    };
  }
};
