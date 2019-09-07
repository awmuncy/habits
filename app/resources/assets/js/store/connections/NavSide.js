export default {
    props: state => {
        return {
            menuState: state.navigationOpen,
            userNiceName: state.userNiceName,
            syncStatus: state.syncStatus
        }
    },
    dispatches: dispatch => {

        return {
            switchPage: page => {
                window.history.pushState(null, page, page);
                dispatch({type: "SWITCH_PAGE", page: page});
            },
            closeMenu: () => dispatch({"type": "TOGGLE_NAV"}),
        };
    }
};