import { pinHabit, unpinHabit } from "./resources/applicationActions";

export default {
    props: (store, props) => {

        var habit_position = store.habits.findIndex(function(habit) {
    
            if(habit.id==props.match.params.id) {
                return true;
            }
            return false;
        });



        var goals = store.habits[habit_position] ? store.habits[habit_position].goals || [] : false || [];
        var canary = goals[goals.length - 1] && goals[goals.length - 1].strength;
    
        return {
            habit: store.habits[habit_position],    
            view_date: store.view_date,
            goals: goals,
            canary: canary
        }
    },
    dispatches: dispatch => {
        return {
            pin: id => {
                dispatch(pinHabit(id));
            },
            unpin: id => {
                dispatch(unpinHabit(id));
            }
        };
    }
};