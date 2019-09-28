import { toggleNav } from "./resources/actionCreators";

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