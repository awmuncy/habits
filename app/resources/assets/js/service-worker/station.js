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

    var modified_habits = store.habits.filter(habit => {
        return habit.modified_at > moment;
    });

    console.log(modified_habits);
}

async function syncDb() {
    let now = new Date();
    now = now.getTime();
    
    console.log("Someday, I'll send data nodes that have been updated since the last -successful- sync, and receive back relevant updates");
    
    // Get every new checkin, goal, habit, cv
    var lastSync = await appInfoGet("lastSyncAttempt");

    console.log(now - lastSync.value);

    await getDispatchesNewerThan(lastSync.value);

    
    

    fetch("/api/users/sync", {  
        method: 'POST',  
        credentials: "same-origin",
        body: JSON.stringify({}),
        headers: {
            'Content-Type': 'application/json',
            "Accept": "application/json",
            "X-Requested-With": "XMLHttpRequest",
            'X-CSRF-TOKEN': "DADD"//document.csrf
        }
    }).then((body)=>{
        appInfoSet("lastSyncSuccess", now);
        return body.json();
    }).then((message)=> {

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

        case "SAVE_VALUE":

            break;
            
    }
}

export default station;