import { syncStart, logout } from './resources/applicationActions';
import { toggleNav } from './resources/pageActions';


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
