import { sortChallenges } from "../connections/resources/actionCreators";

export default {
    props: () => state => {
        return {
            challenges: state.challenges,
            filters: state.filters || [],
            view_date: state.view_date
        }
    },
    dispatches: dispatch => {
        return {
            sortChallenges: challenges => {
                dispatch(sortChallenges(challenges));
            },
        };
    }
};