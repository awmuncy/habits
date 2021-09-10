import { toggleNav } from './resources/pageActions.js';

export default [
  state => {
    return { navigation: state.navigation };
  },
  dispatch => {

    return {
      toggleNav: toggle => dispatch(toggleNav())
    };
  }
];
