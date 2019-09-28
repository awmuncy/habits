import { pinHabit, unpinHabit } from "./resources/actionCreators";

export default {
    props: () => state => {
        return {
            pinned: state.pinned_habits
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