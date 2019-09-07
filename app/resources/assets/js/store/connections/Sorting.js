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
                dispatch({type:"SET_VIEW_DATE", view_date});
                dispatch({type:"RECALCULATE_SCORES", view_date: view_date});      
            },
            sort_by_score: () => {
                dispatch({type:"SORT_CHALLENGES_BY_SCORE"});
            },
            sort_by_status: () => {
                dispatch({type:"SORT_CHALLENGES_BY_STATUS"});
            },
            clear_filters: () => {
                dispatch({type:"CLEAR_FILTERS"});
            },
            filter_to_outstanding: () => {
                dispatch({type:"FILTER_TO_OUTSTANDING"});
            },
            toggle_outstanding: (filters) => {
                if(filters.includes('outstanding')) {
                    dispatch({type: "CLEAR_OUTSTANDING_FILTER"});
                } else {
                    dispatch({type: "FILTER_TO_OUTSTANDING"});
                }
            }
        };
    }
};