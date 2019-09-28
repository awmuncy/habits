export default {
    props: () => {
        return {};
    },
    dispatches: dispatch => {
        return {
            createHabit: (habit) => {
                var data = {type: "NEW_HABIT", habit: habit};
                dispatch(data);
                dispatch({type: "SYNC_START"});
            },
        };
    }
};