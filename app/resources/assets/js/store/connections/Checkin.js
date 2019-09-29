import { doCheckin } from './resources/applicationActions';

export default {
    props: (state, props) => {

        var habit_position = state.habits.findIndex(function(habit) {
            if(habit.id==props.id) {
                return true;
            }
            return false;
        });
    
        var checkin_position = state.habits[habit_position].checkinSlots.findIndex(function(checkin) {
            if(checkin.checkinFor==props.checkinFor) {
                return true;
            }
            return false;
        });
    
    
        return {
            frame: state.habits[habit_position].profile.frame,
            checkin: state.habits[habit_position].checkinSlots[checkin_position],
            score: state.habits[habit_position].checkinSlots[checkin_position].score,
            status: state.habits[habit_position].checkinSlots[checkin_position].status,
            view_date: state.habits[habit_position].checkinSlots[checkin_position].view_date
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