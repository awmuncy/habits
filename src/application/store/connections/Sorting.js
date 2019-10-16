import {
    setViewDate, 
    sortHabitsByStatus,
    sortHabitsByScore,
    clearFilters,
    filterToOutstanding,
    clearOutstandingFilters,

} from './resources/pageActions';
import { RECALCULATE_SCORES } from '../../../actions';

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
                dispatch({type: RECALCULATE_SCORES, view_date});
            },
            sort_by_score: () => {
                dispatch(sortHabitsByScore());
            },
            sort_by_status: () => {
                dispatch(sortHabitsByStatus());
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