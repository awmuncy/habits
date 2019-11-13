import { saveStore, saveCheckin, getStore, appInfoSet, appInfoGet, logout } from './indexeddb';
import { NEW_HABIT, DO_CHECKIN, REMOVE_HABIT, SYNC_START, SAVE_USER, SAVE_HABIT, SAVE_CHECKIN, HYDRATE_PAGE, DECLARE_GOAL, LOGOUT, DECLARE_CORE_VALUE } from '../actions';

var storeStation = new BroadcastChannel("store");

const station = () => {
    
    addEventListener("message", e => {
        var message = e.data;
        switch(message.type) {
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
        content.goals = content.goals.filter((goal)=>{
            if(goal.deleted) return false;
            return true;
        });
        content.core_values = content.core_values.filter((core_value)=>{
            if(core_value.deleted) return false;
            return true;
        });


        storeStation.postMessage({
            type: HYDRATE_PAGE,
            payload: content
        });
    });
}

async function getDispatchesNewerThan(moment) {
    var dispatches = [];
    var store = await getStore();

    store.core_values.forEach(core_value=>{
        if(core_value.modified_at > moment) {
            dispatches.push({
                type: DECLARE_CORE_VALUE,
                payload: core_value
            });
        }
    });

    store.goals.forEach(goal=>{
        if(goal.modified_at > moment) {
            dispatches.push({
                type: DECLARE_GOAL,
                payload: goal
            });
        }
    });

    // Checkins
    store.habits.forEach(habit=>{
        habit.checkins.forEach(checkin=>{
            if(checkin.at > moment) {
                dispatches.push({
                    type: SAVE_CHECKIN,
                    checkin: checkin,
                    habit_id: habit.id
                });
            }
        });
    });


    var modified_habits = store.habits.filter(habit => {

        return habit.modified_at > moment;
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
            "X-Requested-With": "XMLHttpRequest",
            'X-CSRF-TOKEN': "DADD"//document.csrf
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
            serverFauxChannel.postMessage(dispatch);
            self.registration.active.postMessage(dispatch);
        });
        
        serverFauxChannel.close();
    });


}

function reduceToDB(payload) {


    switch(payload.type) {
        case NEW_HABIT:

            saveStore({
                habits: [payload.habit]
            });
            break;

        case DO_CHECKIN: 

            saveCheckin({
                habit_id : payload.habit_id, 
                checkin: payload.checkin
            });

            break;
        
        case REMOVE_HABIT:
            saveStore({
                habits: [{
                    id: payload.habit_id,
                    deleted: true
                }]
            });
            break;

        case DECLARE_GOAL: 
            saveStore({
                goals: [payload.goal]
            });
            break;

        case DECLARE_CORE_VALUE:
            saveStore({
                core_values: [payload.core_value]
            });
            break;

        case SYNC_START:
            syncDb();
            break;

        case SAVE_USER:
            appInfoSet("userToken", payload.token);
            break;
        
        case LOGOUT:
            logout();
            break;
            
    }
}

export default station;