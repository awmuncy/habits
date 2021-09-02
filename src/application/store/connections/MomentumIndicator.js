
export default [
    (store, props) => {

        var habit_position = store.habits.findIndex(function(habit) {
            if(habit.id==props.habit_id) {
                return true;
            }
            return false;
        });
    
        var checkins = store.habits[habit_position].checkinSlots;

        var currentCheckin = checkins[checkins.length - 1];
    
    
        return {
            habit: store.habits[habit_position],
            currentCheckin: currentCheckin,
            goals: store.habits[habit_position].goals,
            score: currentCheckin ? currentCheckin.score : 0
        }
    },
    dispatch => {
        return {
        }    
    }
];