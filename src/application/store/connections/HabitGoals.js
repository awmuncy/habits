export default {
    props: (store, props) => {

        var habit_position = store.habits.findIndex(function(habit) {
    
            if(habit.id==props.habit_id) {
                return true;
            }
            return false;
        });



        var goals = store.habits[habit_position] ? store.habits[habit_position].goals || [] : false || [];
        var canary = goals[goals.length - 1] && goals[goals.length - 1].strength;
    
        return {
            habit: store.habits[habit_position],    
            goals: goals,
            canary: canary
        }
    },
    dispatches: () => {return {}}
};