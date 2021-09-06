import { syncStart, logout } from './resources/applicationActions';
import { toggleNav } from './resources/pageActions';


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
