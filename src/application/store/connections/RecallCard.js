export default [
    (store, props) => {
        return {
            id: "HELLO IM AN ID LOL"
        };
        // store should read store?



    },
    dispatch => {
        return {
            newRecall: () => {
                disaptch({type: "NEW_RECALL"});
            },
            recallSuccessful: id => {
                console.log(id);
            },
            recallFailed: id => {
                console.log(id);
            }
        }
    }
];