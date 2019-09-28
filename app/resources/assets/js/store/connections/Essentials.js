export default {
    props: (state, props) => {

        var challenge_position = state.challenges.findIndex(function(challenge) {
            if(challenge.id==props.habit_id) {
                return true;
            }
            return false;
        });
    
        var checkins = state.challenges[challenge_position].checkinSlots;
    
    
        var currentCheckin = checkins[checkins.length - 1];
    
    
        return {
            challenge: state.challenges[challenge_position],
            currentCheckin: currentCheckin
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