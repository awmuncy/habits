export default [
    (store, props) => {

        var habit_position = store.habits.findIndex(function(habit) {
            if(habit.id==props.id) {
                return true;
            }
            return false;
        });
    
        return {
            habit: store.habits[habit_position],
            view_date: store.habits[habit_position].view_date,
            filters: store.filters,
            pinned_habits: store.pinned_habits
        }
    },
    () => {
        return {};
    }
];