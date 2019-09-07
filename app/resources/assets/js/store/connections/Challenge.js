export default {
    props: (state, props) => {

        var challenge_position = state.challenges.findIndex(function(challenge) {
            if(challenge.id==props.id) {
                return true;
            }
            return false;
        });
    
        return {
            challenge: state.challenges[challenge_position],
            view_date: state.challenges[challenge_position].view_date,
            filters: state.filters,
            pinned: state.pinned_habits
        }
    },
    dispatches: () => {
        return {};
    }
};