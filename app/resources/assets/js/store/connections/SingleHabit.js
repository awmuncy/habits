export default {
    props: (state, props) => {

        var challenge_position = state.challenges.findIndex(function(challenge) {
    
            if(challenge.id==props.match.params.id) {
                return true;
            }
            return false;
        });
    
        return {
            challenge: state.challenges[challenge_position],    
        }
    },
    dispatches: dispatch => {
        return {
            pin: id => {
                dispatch({type: "PIN_HABIT", id:id});
            },
            unpin: id => {
                dispatch({type: "UNPIN_HABIT", id:id});
            }
        };
    }
};