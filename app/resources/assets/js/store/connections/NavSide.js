import { syncStart, toggleNav } from "./resources/actionCreators";

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
                dispatch(switchPage(page));
            },
            closeMenu: () => dispatch(toggleNav()),
            startSync: () => dispatch(syncStart())
        };
    }
};