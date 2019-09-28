export default {
    props: (state, props) => {

        var habit_position = state.habits.findIndex(function(habit) {
            if(habit.id==props.id) {
                return true;
            }
            return false;
        });
    
        return {
            habit: state.habits[habit_position],
            view_date: state.habits[habit_position].view_date,
            filters: state.filters,
            pinned: state.pinned_habits
        }
    },
    dispatches: () => {
        return {};
    }
};