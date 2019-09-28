import { removeChallenge } from "./resources/actionCreators";

export default {
    props: () => {
        return {};
    },
    dispatches: dispatch => {
        return {
            RemoveChallenge: id => dispatch(removeChallenge())
        };
    }
};