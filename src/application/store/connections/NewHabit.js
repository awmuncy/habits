import { newHabit } from "./resources/applicationActions";

export default {
    props: () => {
        return {};
    },
    dispatches: dispatch => {
        return {
            createHabit: (habit) => {
                let now = new Date();
                now = now.getTime();
                habit.checkins = [];
                return dispatch(newHabit(habit));
            },
        };
    }
};