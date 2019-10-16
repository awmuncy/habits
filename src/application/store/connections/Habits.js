import { sortHabits } from "./resources/pageActions";

export default {
    props: () => state => {
        return {
            habits: state.habits,
            filters: state.filters || [],
            view_date: state.view_date
        }
    },
    dispatches: dispatch => {
        return {
            sortHabits: habits => {
                dispatch(sortHabits(habits));
            },
        };
    }
};