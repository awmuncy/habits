export default {
    props: () => {
        return {};
    },
    dispatches: dispatch => {
        return {
            createChallenge: (challenge) => {
                var data = {type: "NEW_CHALLENGE", challenge: challenge};
                dispatch(data);
                dispatch({type: "SYNC_START"});
            },
        };
    }
};