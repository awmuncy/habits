import { removeHabit } from "./resources/applicationActions";

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