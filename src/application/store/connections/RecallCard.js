export default [
    (store, props) => {
        return {
        };
        // store should read store?



    },
    dispatch => {
        return {
            newRecall: () => {
                disaptch({type: "NEW_RECALL"});
            },
            recallAttempt: (id, success) => {
                dispatch({type: "RECALL_ATTEMPT", id, success});
            }
        }
    }
];