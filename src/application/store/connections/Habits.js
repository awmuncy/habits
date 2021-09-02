import { sortHabits } from "./resources/pageActions";

export default [
    (store) => {
        return {
            habits: store.habits,
            filters: store.filters || [],
            view_date: store.view_date
        }
    },
    dispatch => {
        return {
            sortHabits: habits => {
                dispatch(sortHabits(habits));
            },
        };
    }
];