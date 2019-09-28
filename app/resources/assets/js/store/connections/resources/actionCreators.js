var channel = new BroadcastChannel("dispatches");

export const sw_dispatch = action => {
    channel.postMessage(action);
};

export const syncReady = () => {

    return (dispatch, store) => {
        
        var action = {
            type: "SYNC_READY"
        };
        
        sw_dispatch(action)
        dispatch(action);
    }
}

export const syncComplete = () => {

    return (dispatch, store) => {
        var action = {
            type: ""
        }
        dispatch(action);
    }
}

export const syncUnderway = () => {
    return (dispatch, store) => {
        var action = {
            type: ""
        }
        dispatch(action);
    }
}

export const syncFailed = () => {

    return (dispatch, store) => {
        var action = {
            type: ""
        }
        dispatch(action);
    }
}

/* /syncing */

export const sortChallenges = challenges => {
    dispatch({type: "SORT_CHALLENGES", new_positions: challenges});

    return (dispatch, store) => {
        var action = {
            type: "SORT_CHALLENGES"
        }
        dispatch(action);
    }
}

export const doCheckin = (habit_id, checkinFor, status, at) => {

    return (dispatch, store) => {

        var action = {
            type: "DO_CHECKIN", 
            habit_id : habit_id, 
            checkinFor: checkinFor, 
            status: status, 
            at: at
        }

        sw_dispatch(action);
        dispatch(action);
    }
}


export const setViewDate = view_date => {

    return (dispatch, store) => {
        
        var action = {
            type: "SET_VIEW_DATE",
            view_date: view_date
        };

        dispatch(action);
    }
}

export const recalculateScores = view_date => {
    
    return (dispatch, store) => {

        var action = {
            type: "RECALCULATE_SCORES",
            view_date: view_date
        };

        dispatch(action);
    }
};

export const sortChallengesByStatus = () => {

    return (dispatch, store) => {
        
        var action = {
            type: "SORT_CHALLENGES_BY_STATUS"
        };
        

        dispatch(action);
    }
}

export const sortChallengesByScore = () => {

    return (dispatch, store) => {
        
        var action = {
            type: "SORT_CHALLENGES_BY_SCORE"
        };
        
        dispatch(action);
    }
}


export const clearFilters = () => {

    return (dispatch, store) => {
        
        var action = {
            type: "CLEAR_FILTERS"
        };
        
        dispatch(action);
    }
}

export const filterToOutstanding = () => {

    return (dispatch, store) => {
        
        var action = {
            type: "FILTER_TO_OUTSTANDING"
        };
        
        dispatch(action);
    }
}

export const clearOutstandingFilters = () => {
    return (dispatch, store) => {
        
        var action = {
            type: "CLEAR_OUTSTANDING_FILTER"
        };
        
        dispatch(action);
    }    
}

export const removeChallenge = id => {
    return (dispatch, store) => {

        var action = {
            type: "REMOVE_CHALLENGE", 
            habit_id: id
        }

        dispatch(action);

    }
}

export const syncStart = () => {
    return (dispatch, store) => {

        var action = {
            type: "SYNC_START"
        }

        dispatch(action);

    }
}

export const toggleNav = () => {
    return (dispatch, store) => {

        var action = {
            type: "TOGGLE_NAV"
        }

        dispatch(action);

    }   
}

export const switchPage = () => {
    return (dispatch, store) => {

        window.history.pushState(null, page, page);

        var action = {
            type: "SWITCH_PAGE"
        }

        dispatch(action);

    }   
}

export const pinHabit = id => {
    return (dispatch, store) => {

        var action = {
            type: "PIN_HABIT",
            id: id
        }

        dispatch(action);

    }  
}

export const unpinHabit = id => {
    return (dispatch, store) => {

        var action = {
            type: "UNPIN_HABIT",
            id: id
        }

        dispatch(action);

    }  
}

export const sortCoreValues = core_values_sorted => {
    return (dispatch, store) => {

        var action = {
            type: "SORT_CORE_VALUES",
            core_values: core_values_sorted
        }

        dispatch(action);

    }  
}