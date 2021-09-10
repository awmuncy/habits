import { syncStart, logout } from './resources/applicationActions.js';
import { toggleNav } from './resources/pageActions.js';


export default [
  state => {
    return {
      menuState   : state.navigationOpen,
      userNiceName: state.userNiceName,
      syncStatus  : state.syncStatus
    };
  },
  dispatch => {


    return {
      closeMenu: () => dispatch(toggleNav()),
      startSync: () => dispatch(syncStart()),
      logout   : () => dispatch(logout())
    };
  }
];
