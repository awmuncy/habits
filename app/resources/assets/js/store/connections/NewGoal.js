export default {
    props: (state, props) => {
        return {
            habits: state.habits
        }
    },
    dispatches: dispatch => {
        
        return {
            newGoal: goal => {



                var action = {
                    type: "NEW_GOAL",
                    goal: goal
                }
                dispatch(action);

            }
        }
    }
}