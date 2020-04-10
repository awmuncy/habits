
export default {
    props: (state, props) => {

        var habit_position = state.habits.findIndex(function(habit) {
            if(habit.id==props.habit_id) {
                return true;
            }
            return false;
        });
    
        var checkins = state.habits[habit_position].checkinSlots;

        var currentCheckin = checkins[checkins.length - 1];
    
    
        return {
            habit: state.habits[habit_position],
            currentCheckin: currentCheckin,
            goals: state.habits[habit_position].goals,
            score: currentCheckin ? currentCheckin.score : 0
        }
    },
    dispatches: dispatch => {
        return {
        }    
    }
};