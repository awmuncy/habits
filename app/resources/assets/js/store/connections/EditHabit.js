import { removeHabit } from "./resources/actionCreators";

export default {
    props: () => {
        return {};
    },
    dispatches: dispatch => {
        return {
            RemoveHabit: id => dispatch(removeHabit())
        };
    }
};