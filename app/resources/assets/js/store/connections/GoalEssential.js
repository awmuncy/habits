import { doGoal } from '../../store/connections/resources/applicationActions';

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
                dispatch(doGoal(id, status));
            }
        };
    }
}