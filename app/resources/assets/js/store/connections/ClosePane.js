export default {
    props: () => state => {
        return {
            pinned: state.pinned_habits
        }
    },
    dispatches: dispatch => {
        return {
            pin: id => {
                dispatch({type: "PIN_HABIT", id:id});
            },
            unpin: id => {
                dispatch({type: "UNPIN_HABIT", id:id});
            }
        };
    }
};