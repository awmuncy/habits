const saveHabitsToDatabase = (store) => {

    var storeContent = store.getState();

    var corevalues = storeContent.core_values.map((corevalue, index) => {
        corevalue.position = index;
        return corevalue;
    });

    var dataToSync = {
        habits: storeContent.habits,
        goals: storeContent.goals,
        corevalues: corevalues,
        pinned_habits: storeContent.pinned_habits
    };

    return new Promise((resolve, reject) => {
         fetch("/api/users/sync", {  
            method: 'POST',  
            credentials: "same-origin",
            body: JSON.stringify(dataToSync),
            headers: {
                'Content-Type': 'application/json',
                "Accept": "application/json",
                "X-Requested-With": "XMLHttpRequest",
                'X-CSRF-TOKEN': document.csrf
            }
        }).then(function(response) {
            if(!response.ok) {
                reject(response);
            }
            return response.json();
        }, function(reason){
            reject(reason);
        }).then(function(response) {
            resolve(response);
        });       
    });
}

const getHabitsFromDatabase = async (store) => {
    var response = await saveHabitsToDatabase(store);
    console.log(response);

    var channel = new BroadcastChannel("saveStore");
    channel.postMessage(response);

    store.dispatch({type: "SYNC_COMPLETE"});
    
}

const databaseSync = store => {


    var doDatabaseSync = async () => {
        store.dispatch({type: "SYNC_UNDERWAY"});
        var habits = await getHabitsFromDatabase(store).then((value)=>{
            console.log("Sync complete");
        }).catch((err) => {
            console.log(err);
            store.dispatch({type:"SYNC_FAILED"});
        });

    }

    if(store.getState().syncStatus=="start" || store.getState().syncStatus=="ready") {
        doDatabaseSync();
    }
    // Ask for habits in database
    // Compare to habits in store
    // If different, do diffing function
    // Save new habits from store
    // Send new habits from app


};

export default databaseSync;