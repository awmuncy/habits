import { doCheckin } from './resources/applicationActions';

export default {
    props: (store, props) => {

        var habit_position = store.habits.findIndex(function(habit) {
            if(habit.id==props.habit_id) {
                return true;
            }
            return false;
        });
    
        var checkins = store.habits[habit_position].checkinSlots;
    
        var outstanding = checkins.filter(checkin => checkin.status==null).length;

        var currentCheckin = checkins[checkins.length - 1];
    
    
        return {
            habit: store.habits[habit_position],
            currentCheckin: currentCheckin,
            currentCheckinStatus: currentCheckin ? currentCheckin.status : null,
            outstanding: outstanding,
            goals: store.habits[habit_position].goals
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