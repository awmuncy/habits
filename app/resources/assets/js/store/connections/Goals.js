export default {
    props: state => {
        

        return {
            goals: state.goals
        };
    },
    dispatches: dispatch => {
        return {
            sortGoals: (goals) => {
                var action = {
                    type: "SORT_GOALS",
                    goals: goals
                }
                dispatch(action);
            }
        };
    }
}