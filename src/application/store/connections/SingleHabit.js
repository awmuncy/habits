import { pinHabit, unpinHabit } from "./resources/applicationActions";

export default {
    props: (state, props) => {

        var habit_position = state.habits.findIndex(function(habit) {
    
            if(habit.id==props.match.params.id) {
                return true;
            }
            return false;
        });



        var goals = state.habits[habit_position] ? state.habits[habit_position].goals || [] : false || [];
        var canary = goals[goals.length - 1] && goals[goals.length - 1].strength;
    
        return {
            habit: state.habits[habit_position],    
            view_date: state.view_date,
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