import { SORT_HABITS, SORT_HABITS_BY_SCORE, SET_VIEW_DATE, SORT_HABITS_BY_STATUS, CLEAR_FILTERS, TOGGLE_NAV, FILTER_TO_OUTSTANDING, CLEAR_OUTSTANDING_FILTER } from "../../../../actions";

export const sortHabits = habits => {
    dispatch({type: SORT_HABITS_BY_SCORE, new_positions: habits});

    return (dispatch, store) => {
        var action = {
            type: SORT_HABITS
        }
        dispatch(action);
    }
}


export const setViewDate = view_date => {

    return (dispatch, store) => {
        
        var action = {
            type: SET_VIEW_DATE,
            view_date: view_date
        };

        dispatch(action);
    }
}



export const sortHabitsByStatus = () => {

    return (dispatch, store) => {
        
        var action = {
            type: SORT_HABITS_BY_STATUS
        };
        

        dispatch(action);
    }
}

export const sortHabitsByScore = () => {

    return (dispatch, store) => {
        
        var action = {
            type: SORT_HABITS_BY_SCORE
        };
        
        dispatch(action);
    }
}


export const clearFilters = () => {

    return (dispatch, store) => {
        
        var action = {
            type: CLEAR_FILTERS
        };
        
        dispatch(action);
    }
}

export const filterToOutstanding = () => {

    return (dispatch, store) => {
        
        var action = {
            type: FILTER_TO_OUTSTANDING
        };
        
        dispatch(action);
    }
}

export const clearOutstandingFilters = () => {
    return (dispatch, store) => {
        
        var action = {
            type: CLEAR_OUTSTANDING_FILTER
        };
        
        dispatch(action);
    }    
}


export const toggleNav = () => {
    return (dispatch, store) => {

        var action = {
            type: TOGGLE_NAV
        }

        dispatch(action);

    }   
}
