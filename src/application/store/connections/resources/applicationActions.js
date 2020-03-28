import { hydrateScores } from '../../reducers/calculateScores';
import { ObjectID } from 'bson';
import { DO_CHECKIN, REMOVE_HABIT, SAVE_USER, SYNC_START, NEW_HABIT, UNPIN_HABIT, PIN_HABIT, LOGOUT, DECLARE_GOAL, DECLARE_CORE_VALUE } from "../../../../actions";
import {BroadcastChannel as broadcastChannel } from 'broadcast-channel';

var channel = new BroadcastChannel("store");


export var dispatchChannel = channel;

export const sw_dispatch = action => {
    var message = {
        type: "dispatch",
        payload: action
    };
    channel.postMessage(message);
    
    navigator.serviceWorker.ready.then(sw => {
        sw.active.postMessage(message);
    });
};

export const hydrate = action => {

    return (dispatch, store) => {
        action.payload.habits = action.payload.habits.map(habit => {
            habit.checkinSlots = hydrateScores(habit);

            return habit;
        });
        dispatch(action);
    }
}

export const doCheckin = (habit_id, checkinFor, status, at) => {

    return (dispatch, store) => {

        var action = {
            type: DO_CHECKIN, 
            habit_id : habit_id,
            checkin: {
                checkinFor: checkinFor, 
                status: status, 
                at: at
            } 
        }

        sw_dispatch(action);
        dispatch(action);
    }
}

export const removeHabit = id => {
    return (dispatch, store) => {

        var action = {
            type: REMOVE_HABIT, 
            habit_id: id
        }

        sw_dispatch(action);
        dispatch(action);

    }
}

export const pinHabit = id => {
    return (dispatch, store) => {

        var action = {
            type: PIN_HABIT,
            id: id
        }

        sw_dispatch(action);
        dispatch(action);

    }  
}


export const unpinHabit = id => {
    return (dispatch, store) => {

        var action = {
            type: UNPIN_HABIT,
            id: id
        }

        sw_dispatch(action);
        dispatch(action);

    }  
}

export const syncStart = () => {
    return (dispatch, store) => {

        var action = {
            type: SYNC_START
        };

        sw_dispatch(action);
        dispatch(action);

    }
}

export const newHabit = habit => {
    return (dispatch, store) => {
        habit.id = new ObjectID().toHexString();
        let now = new Date();
        now = now.getTime();
        habit.checkins = [];
        habit.modified_at = new Date().getTime();

        var action = {
            type: NEW_HABIT,
            habit: habit
        };

        sw_dispatch(action);
        dispatch(action);
    }
}

export const declareGoal = goal => {
    return (dispatch, store) => {
        goal.id = goal.id || new ObjectID().toHexString();
        
        var action = {
            type: DECLARE_GOAL,
            goal: goal
        };

        sw_dispatch(action);
        dispatch(action);
    }
}

export const doGoal = (id, status) => {
    return (dispatch, store) => {
        var goal = {
            id: id,
            status: status,
            modified_at: new Date().getTime()
        };
        
        var action = {
            type: DECLARE_GOAL,
            goal: goal
        };

        sw_dispatch(action);
        dispatch(action);
    }
}


export const defineCoreValue = core_value => {
    return (dispatch, store) => {
        core_value.id = core_value.id || new ObjectID().toHexString();

        var action = {
            type: DECLARE_CORE_VALUE,
            core_value: core_value
        };

        sw_dispatch(action);
        dispatch(action);
    }    
}

export const saveUser = token => {


    return (dispatch, store) => {
        var action = {
            type: SAVE_USER,
            token: token
        };

        
        dispatch(action);
        sw_dispatch(action);
    }
}

export const logout = () => {


    return (dispatch, store) => {
        var action = {
            type: LOGOUT
        };

        
        dispatch(action);
        sw_dispatch(action);
    }
}