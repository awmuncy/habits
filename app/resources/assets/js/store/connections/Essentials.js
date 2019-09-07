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
                var data = {type: "DO_CHECKIN", "habit_id" : habit_id, checkinFor: date, "status": status, at: now};
                dispatch(data);
                dispatch({type: "SYNC_START"});           
            }
        };
    
    }
};