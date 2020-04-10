export default {
    props: (state, props) => {

        var habit_position = state.habits.findIndex(function(habit) {
    
            if(habit.id==props.habit_id) {
                return true;
            }
            return false;
        });



        var goals = state.habits[habit_position] ? state.habits[habit_position].goals || [] : false || [];
        var canary = goals[goals.length - 1] && goals[goals.length - 1].strength;
    
        return {
            habit: state.habits[habit_position],    
            goals: goals,
            canary: canary
        }
    },
    dispatches: () => {return {}}
};