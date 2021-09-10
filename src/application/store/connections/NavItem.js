import { toggleNav } from './resources/pageActions.js';


export default [
  state => {
    return {};
  },
  dispatch => {


    return {
      closeMenu: () => dispatch(toggleNav())
    };
  }
];
