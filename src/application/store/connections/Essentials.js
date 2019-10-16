import { doCheckin } from './resources/applicationActions';

export default {
    props: (state, props) => {

        var habit_position = state.habits.findIndex(function(habit) {
            if(habit.id==props.habit_id) {
                return true;
            }
            return false;
        });
    
        var checkins = state.habits[habit_position].checkinSlots;
    
        var outstanding = checkins.filter(checkin => checkin.status==null).length - 1;

        var currentCheckin = checkins[checkins.length - 1];
    
    
        return {
            habit: state.habits[habit_position],
            currentCheckin: currentCheckin,
            currentCheckinStatus: currentCheckin.status,
            outstanding: outstanding
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