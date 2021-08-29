import { doCheckin } from './resources/applicationActions';

export default {
    props: (store, props) => {

        var habit_position = store.habits.findIndex(function(habit) {
            if(habit.id==props.habit_id) {
                return true;
            }
            return false;
        });

        return {
            checkins: store.habits[habit_position].checkinSlots,
            profile: store.habits[habit_position].profile,
            beginDate: store.habits[habit_position].beginDate
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