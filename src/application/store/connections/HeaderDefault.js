import { toggleNav } from "./resources/pageActions";

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