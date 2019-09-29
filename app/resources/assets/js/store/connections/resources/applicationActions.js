var channel = new BroadcastChannel("dispatches");

export const sw_dispatch = action => {
    channel.postMessage(action);
};



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

export const removeHabit = id => {
    return (dispatch, store) => {

        var action = {
            type: "REMOVE_HABIT", 
            habit_id: id
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

export const syncStart = () => {
    return (dispatch, store) => {

        var action = {
            type: "SYNC_START"
        }

        dispatch(action);

    }
}