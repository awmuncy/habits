import { pinHabit, unpinHabit } from "./resources/applicationActions";

export default {
    props: () => state => {
        return {
            pinned_habits: state.pinned_habits
        }
    },
    dispatches: dispatch => {
        return {
            pin: id => {
                dispatch(pinHabit(id));
            },
            unpin: id => {
                dispatch(unpinHabit(id));
            }
        };
    }
};