import { saveStore, saveCheckin, getStore } from './indexeddb';

const station = () => {
    var store = new BroadcastChannel("store");
    store.addEventListener("message", e => {
        var message = e.data;
        if(message.type==="dispatch") {
            reduceToDB(message.payload);
        } else if(message=="init") {
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


                store.postMessage({
                    type: "HYDRATE",
                    payload: content
                });
            });
        }
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
    }
}

export default station;