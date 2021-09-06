import { toggleNav } from './resources/pageActions';

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
