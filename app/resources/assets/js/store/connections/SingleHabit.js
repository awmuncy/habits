import { pinHabit, unpinHabit } from "./resources/actionCreators";

export default {
    props: (state, props) => {

        var habit_position = state.habits.findIndex(function(habit) {
    
            if(habit.id==props.match.params.id) {
                return true;
            }
            return false;
        });
    
        return {
            habit: state.habits[habit_position],    
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