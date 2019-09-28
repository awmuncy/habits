import { pinHabit, unpinHabit } from "./resources/actionCreators";

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
                dispatch(pinHabit(id));
            },
            unpin: id => {
                dispatch(unpinHabit(id));
            }
        };
    }
};