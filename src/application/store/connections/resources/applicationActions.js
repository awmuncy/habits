import { hydrateScores } from '../../reducers/calculateScores';
import { ObjectID } from 'bson';
import { DO_CHECKIN, REMOVE_HABIT, SAVE_USER, SYNC_START, NEW_HABIT, UNPIN_HABIT, PIN_HABIT, LOGOUT } from "../../../../actions";
import {BroadcastChannel } from 'broadcast-channel';
import { format } from 'date-fns';

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

export const newHabitGoal = (habit_id, goal) => {
    
    return (dispatch, store) => {
        if(!goal._id) goal._id = new ObjectID().toHexString();
        
        var action = {
            type: "NEW_HABIT_GOAL",
            habit_id: habit_id,
            goal: goal
        };
        
        sw_dispatch(action);
        dispatch(action);
    }
};

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

export const archiveHabit = id => {
    return (dispatch, store) => {

        
        var action = {
            type: "ARCHIVE_HABIT", 
            habit_id: id,
            date: format(new Date(), "yyyy-MM-dd")
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
        return habit.id;
    }
}



export const saveUser = (token, subscription_type) => {


    return (dispatch, store) => {
        var action = {
            type: SAVE_USER,
            token: token,
            subscription_type: subscription_type
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

export const changeSubscription = new_subscription_type => {
    return (dispatch, store) => {
        var action = {
            type: "CHANGE_SUBSCRIPTION",
            subscription: "premium"
        };

        dispatch(action);
        sw_dispatch(action);
    }
}