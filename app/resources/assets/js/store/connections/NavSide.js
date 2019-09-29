import { syncStart } from "./resources/applicationActions";
import { toggleNav } from "./resources/pageActions";


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