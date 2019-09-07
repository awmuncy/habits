export default {
    props: (state, props) => {

        var indexOf;

        state.goals.forEach((goal, index) => {
            if(goal.id==props.id) {
                indexOf = index;
            }
        });

        return {
            goal: state.goals[indexOf],
            status: state.goals[indexOf].status
        };
    },
    dispatches: dispatch => {
        return {
            changeGoalStatus: (status, id) => {
                dispatch({type: "DO_GOAL", id: id, status: status});
            }
        };
    }
}