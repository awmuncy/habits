import { saveItem, getStore, appInfoSet, appInfoGet, logout } from './indexeddb';
import { NEW_HABIT, DO_CHECKIN, REMOVE_HABIT, SYNC_START, SAVE_USER, SAVE_HABIT, SAVE_CHECKIN, HYDRATE_PAGE, LOGOUT } from '../actions';
import {BroadcastChannel } from 'broadcast-channel';


var storeStation = new BroadcastChannel("store");


const station = () => {
    
    addEventListener("message", e => {
        var message = e.data ? e.data : e;
        switch(message.type) {
            case "dispatches": 
                message.payload.forEach((action) => {
                    reduceToDB(action);
                });
            case "dispatch":
                reduceToDB(message.payload);
                break;
            
            case "init":
                hydrateApp();
                break;

        }
    });
}

function hydrateApp() {
    getStore().then(content=>{
                
        content.habits = content.habits.filter((habit)=>{
            if(habit.deleted) return false;
            return true;
        });


        storeStation.postMessage({
            type: HYDRATE_PAGE,
            payload: content
        });
    });
}

async function getDispatchesNewerThan(instant) {
    var dispatches = [];
    var store = await getStore();

    
    // Checkins    
    store.habits.forEach(habit=>{
        habit.checkins.forEach(checkin=>{
            if(checkin.at > instant) {
                dispatches.push({
                    type: SAVE_CHECKIN,
                    checkin: checkin,
                    habit_id: habit.id
                });
            }
        });
        habit.goals = habit.goals || [];
        habit.goals.forEach(goal=>{
            if(goal.modified_at > instant) {
                dispatches.push({
                    type: "NEW_HABIT_GOAL",
                    goal: goal,
                    habit_id: habit.id
                })
            }
        });
    });


    var modified_habits = store.habits.filter(habit => {

        return habit.modified_at > instant;
    });

    var dispatchesFromModifiedHabits = modified_habits.map(habit => {
        delete habit.checkins;
        return {
            type: SAVE_HABIT,
            payload: habit
        };
    });

    return [...dispatches, ...dispatchesFromModifiedHabits];
}

async function syncDb() {

    var lastSync = await appInfoGet("lastSyncSuccess");
    if(lastSync===undefined) lastSync = {value: 0};

    var dispatches = await getDispatchesNewerThan(lastSync.value);

    var userToken = await appInfoGet("userToken");    

    fetch("/api/users/sync", {  
        method: 'POST',  
        credentials: "same-origin",
        body: JSON.stringify({
            userToken: userToken,
            dispatches: [...dispatches],
            lastSync: lastSync
        }),
        headers: {
            'Content-Type': 'application/json',
            "Accept": "application/json",
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then((body)=>{
        
        return body.json();
    }).then((message)=> {
        appInfoSet("lastSyncSuccess", message.timestamp);
        var serverFauxChannel = new BroadcastChannel("store");


        message.dispatches.forEach(action=>{
            var dispatch = {
                type: "dispatch",
                payload: action
            };

            /* Where are these going? One to DB, one to app? */

        });
        
        serverFauxChannel.postMessage({type: "dispatches", payload: message.dispatches});
        self.registration.active.postMessage({type: "dispatches", payload: message.dispatches});     

        serverFauxChannel.close();
    });


}

function reduceToDB(payload) {


    switch(payload.type) {
        case NEW_HABIT:

            saveItem("habit", {
                habits: [payload.habit]
            });
            break;

        case DO_CHECKIN: 

            saveItem("checkin", {
                habit_id : payload.habit_id, 
                checkin: payload.checkin
            });

            break;

        case "NEW_HABIT_GOAL":
            saveItem("habit_goal", {
                habit_id: payload.habit_id,
                goal: payload.goal
            });
            break;
        
        case REMOVE_HABIT:
            var now = new Date().getTime();
            saveItem("habit", {
                habits: [{
                    id: payload.habit_id,
                    deleted: true,
                    modified_at: now
                }]
            });
            break;

        case "ARCHIVE_HABIT":

            var now = new Date().getTime();
            saveItem("habit", {
                habits: [{
                    id: payload.habit_id,
                    archived: payload.date,
                    modified_at: now
                }]
            });
        
            break;


        case SYNC_START:
            syncDb();
            break;

        case SAVE_USER:
            appInfoSet("userToken", payload.token);
            appInfoSet("userSubscription", payload.subscription_type);
            break;
        
        case LOGOUT:
            logout();
            break;
            
    }
}

export default station;