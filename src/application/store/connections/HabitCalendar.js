import { doCheckin } from './resources/applicationActions';

export default {
    props: (state, props) => {

        var habit_position = state.habits.findIndex(function(habit) {
            if(habit.id==props.habit_id) {
                return true;
            }
            return false;
        });

        return {
            checkins: state.habits[habit_position].checkinSlots,
            profile: state.habits[habit_position].profile,
            beginDate: state.habits[habit_position].beginDate
        }
    },
    dispatches: dispatch => {

        return {
            checkIn: (habit_id, date, status) => {
                let now = new Date();
                now = now.getTime();
                dispatch(doCheckin(habit_id, date, status, now));        
            }
        };
    
    }
};