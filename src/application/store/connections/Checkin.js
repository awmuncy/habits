import { doCheckin } from './resources/applicationActions';

export default {
    props: (store, props) => {
        var habit_position = store.habits.findIndex(function(habit) {
            if(habit.id==props.id) {
                return true;
            }
            return false;
        });
    
        var checkin_position = store.habits[habit_position].checkinSlots.findIndex(function(checkin) {
            if(checkin.checkinFor==props.checkinFor) {
                return true;
            }
            return false;
        });
    
    
        return {
            frame: store.habits[habit_position].profile.frame,
            checkin: store.habits[habit_position].checkinSlots[checkin_position],
            score: store.habits[habit_position].checkinSlots[checkin_position].score,
            status: store.habits[habit_position].checkinSlots[checkin_position].status,
            view_date: store.habits[habit_position].checkinSlots[checkin_position].view_date
        }
    },
    dispatches: dispatch => {
        return {
            checkIn: (habit_id, checkinFor, status) => {
                let now = new Date();
                now = now.getTime();
                dispatch(doCheckin(habit_id, checkinFor, status, now));       
            },
        };
    }
};