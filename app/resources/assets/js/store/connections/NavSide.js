export default {
    props: state => {
        return {
            menuState: state.navigationOpen,
            userNiceName: state.userNiceName,
            syncStatus: state.syncStatus
        }
    },
    dispatches: dispatch => {
        var fireOff = function(arger) {
            console.log("Thunk worked" + arger);

            return (dispatch, getState) => {
                dispatch({"type": "TOGGLE_NAV"});
            }
        }

        return {
            switchPage: page => {
                window.history.pushState(null, page, page);
                dispatch({type: "SWITCH_PAGE", page: page});
            },
            closeMenu: () => dispatch(fireOff("HELLO")),
            startSync: () => dispatch({type: 'SYNC_START'})
        };
    }
};