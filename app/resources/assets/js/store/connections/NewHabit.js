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
                habit.modified_at = now;
                habit.id = Math.floor(Math.random() * Math.floor(999999));
                habit.checkins = [];
                dispatch(newHabit(habit));
            },
        };
    }
};