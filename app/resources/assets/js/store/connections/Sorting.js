import {
    setViewDate, 
    recalculateScores,
    sortChallengesByStatus,
    sortChallengesByScore,
    clearFilters,
    filterToOutstanding,
    clearOutstandingFilters,

} from './resources/actionCreators';

export default {
    props: () => (state, props) => {

        return {
            filters: state.filters,
            view_date: state.view_date
        };
    },
    dispatches: dispatch => {
        return {
            change_view_date: (view_date) => {
                dispatch(setViewDate(view_date));
                dispatch(recalculateScores(view_date));      
            },
            sort_by_score: () => {
                dispatch(sortChallengesByScore());
            },
            sort_by_status: () => {
                dispatch(sortChallengesByStatus());
            },
            clear_filters: () => {
                dispatch(clearFilters());
            },
            filter_to_outstanding: () => {
                dispatch(filterToOutstanding());
            },
            toggle_outstanding: (filters) => {
                if(filters.includes('outstanding')) {
                    dispatch(clearOutstandingFilters());
                } else {
                    dispatch(filterToOutstanding());
                }
            }
        };
    }
};