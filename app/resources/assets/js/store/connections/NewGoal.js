import { newGoal } from "./resources/applicationActions"

export default {
    props: (state, props) => {
        return {
            habits: state.habits
        }
    },
    dispatches: dispatch => {
        
        return {
            newGoal: goal => dispatch(newGoal(goal))
        }
    }
}