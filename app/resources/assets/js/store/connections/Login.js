import { saveUser, syncStart } from "./resources/applicationActions";

export default {
    props: () => {
        return {};
    },
    dispatches: dispatch => {
        return {
            saveUser: token => dispatch(saveUser(token)),
            syncStart: () => dispatch(syncStart())
        };
    }
};