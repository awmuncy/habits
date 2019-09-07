export default {
    props: (state, props) => {

        var challenge_position = state.challenges.findIndex(function(challenge) {
            if(challenge.id==props.id) {
                return true;
            }
            return false;
        });
    
        var checkin_position = state.challenges[challenge_position].checkinSlots.findIndex(function(checkin) {
            if(checkin.checkinFor==props.checkinFor) {
                return true;
            }
            return false;
        });
    
    
        return {
            frame: state.challenges[challenge_position].profile.frame,
            checkin: state.challenges[challenge_position].checkinSlots[checkin_position],
            score: state.challenges[challenge_position].checkinSlots[checkin_position].score,
            status: state.challenges[challenge_position].checkinSlots[checkin_position].status,
            view_date: state.challenges[challenge_position].checkinSlots[checkin_position].view_date
        }
    },
    dispatches: dispatch => {
        return {
            checkIn: (habit_id, checkinFor, status) => {
                let now = new Date();
                now = now.getTime();
                var data = {type: "DO_CHECKIN", habit_id : habit_id, checkinFor: checkinFor, status: status, at: now};
                dispatch(data);
                
                dispatch({type: "SYNC_START"});           
            },
        };
    }
};