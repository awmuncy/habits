import { saveUser } from "./resources/applicationActions";

export default {
    props: () => {
        return {};
    },
    dispatches: dispatch => {
        return {
            saveUser: token => dispatch(saveUser(token)),
        };
    }
};