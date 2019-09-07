export default {
    props: state => {
        return { navigation: state.navigation };
    },
    dispatches: dispatch => {
   
        return {
            toggleNav: toggle => dispatch({type: "TOGGLE_NAV"})
        };
    }
};