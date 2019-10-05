import { newGoal } from "./resources/applicationActions"

export default {
    props: (state, props) => {
        return {
            habits: state.habits
        }
    },
    dispatches: dispatch => {
        
        return {
            newGoal: goal => {
                let now = new Date();
                now = now.getTime();
                goal.modified_at = now;
                goal.id = Math.floor(Math.random() * Math.floor(999999));
                dispatch(newGoal(goal))
            }
        }
    }
}