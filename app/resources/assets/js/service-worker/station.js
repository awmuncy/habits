import { saveStore, saveCheckin, getStore, appInfoSet, appInfoGet } from './indexeddb';

var storeStation = new BroadcastChannel("store");

const station = () => {
    
    storeStation.addEventListener("message", e => {
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
            type: "HYDRATE",
            payload: content
        });
    });
}

async function getDispatchesNewerThan(moment) {
    var store = await getStore();

    var checkins = [];


    store.habits.forEach(habit=>{
        habit.checkins.forEach(checkin=>{
            if(checkin.at > moment) {
                checkin.habit_id = habit.id;
                checkins.push(checkin);
            }
        });
    });

    var checkinDispatches = checkins.map(checkin => {
        var habit_id = checkin.habit_id;
        delete checkin.habit_id;
        return {
            type: 'SAVE_CHECKIN',
            checkin: checkin,
            habit_id: habit_id
        };
    });

    console.log("Checkin dispatches to server:");
    console.log(checkinDispatches);

    var modified_habits = store.habits.filter(habit => {
        console.log("Mod:" + habit.modified_at);
        console.log(habit.modified_at - moment);
        return habit.modified_at > moment;
    });

    var dispatchesFromModifiedHabits = modified_habits.map(habit => {
        return {
            type: "SAVE_HABIT",
            habit: habit
        };
    });

    console.log("Dispatches from modified habits:");
    console.log(dispatchesFromModifiedHabits);
    return [...dispatchesFromModifiedHabits, ...checkinDispatches];
}

async function syncDb() {
    let now = new Date();
    now = now.getTime();
    
    console.log("Someday, I'll send data nodes that have been updated since the last -successful- sync, and receive back relevant updates");
    

    var lastSync = await appInfoGet("lastSyncSuccess");
    if(lastSync===undefined) lastSync = {value: 0};

    console.log(now - lastSync.value);

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
        console.log("Received dispatches from server:");
        console.log(message.dispatches);

        var serverFauxChannel = new BroadcastChannel("store");
        message.dispatches.forEach(action=>{
            var dispatch = {
                type: "dispatch",
                payload: action
            };
            serverFauxChannel.postMessage(dispatch);
        });
        serverFauxChannel.close();
    });


}

function reduceToDB(payload) {


    switch(payload.type) {
        case "NEW_HABIT":
            saveStore({
                habits: [payload.habit]
            });
            break;

        case "DO_CHECKIN": 

            saveCheckin({
                habit_id : payload.habit_id, 
                checkinFor: payload.checkinFor, 
                status: payload.status, 
                at: payload.at
            });

            break;
        
        case "REMOVE_HABIT":
            saveStore({
                habits: [{
                    id: payload.habit_id,
                    deleted: true
                }]
            });
            break;

        case "NEW_GOAL": 
            saveStore({
                goals: [payload.goal]
            });
            break;

        case "NEW_CORE_VALUE":
            saveStore({
                core_values: [payload.core_value]
            });
            break;

        case "SYNC_START":
            syncDb();
            break;

        case "SAVE_USER":
            appInfoSet("userToken", payload.token);
            break;
            
    }
}

export default station;