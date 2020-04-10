import { newHabitGoal } from "./resources/applicationActions";

export default {
    props: () => {
        return {};
    },
    dispatches: dispatch => {
        return {
            newHabitGoal: (habit_id, goal) => dispatch(newHabitGoal(habit_id, goal)) 
        };
    }
};