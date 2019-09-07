export default {
    props: () => {
        return {};
    },
    dispatches: dispatch => {
        return {
            RemoveChallenge: id => dispatch({"type": "REMOVE_CHALLENGE", "habit_id": id})
        };
    }
};