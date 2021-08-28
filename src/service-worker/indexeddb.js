var dbV1 = function(event) {
	var db = event.target.result;
	db.createObjectStore("habits", {keyPath: "id"});
	db.createObjectStore("appGeneral", {keyPath: "key"});
};

var dbError = function(error) {
	console.log(error);
};

var logout = function() {

	var clear = function(event) {
		var db = event.target.result;
		var transaction = db.transaction(["habits", "appGeneral"], "readwrite");
		transaction.objectStore("habits").clear();
		transaction.objectStore("appGeneral").clear();
	}

	accessDb(clear);
}

var getStore = function() {
	return new Promise((resolve, reject) => {
		accessDb(async function(event) {
			var transaction = event.target.result.transaction(["habits", "appGeneral"], "readonly");
			var habits = transaction.objectStore("habits").getAll()
			var userSubscription = transaction.objectStore("appGeneral").get("userSubscription");
			var userToken = transaction.objectStore("appGeneral").get("userToken");

			var items = [habits, userSubscription, userToken].map((item) => {
				return new Promise((resolve, reject) => {
					item.onsuccess = e => {
						resolve(e.target.result);
					};
				});
			});

			var [habits, userSubscription, userToken, userName] = await Promise.all(items);			

			habits = habits.map((habit) => {
				return habit;
			});

			var store = {
				habits: habits,
				user: {
					subscription: userSubscription.value,
					token: userToken.value
				}
			};

			resolve(store);
		});
	});
}

function accessDb(action) {
	var request = indexedDB.open("f3_app_storage", 1);
	request.onerror = dbError;
	request.onupgradeneeded = dbV1;
	request.onsuccess = action;
}

var saveHabit = function(store) {

	var habits = Array.isArray(store.habits) ? store.habits : [];
	

	var save = function(event) {

		var db = event.target.result;
		var transaction = db.transaction(["habits"], "readwrite");
		var placeItem = (database, item) => {

			var existing = transaction.objectStore(database).get(item.id);

			existing.onsuccess = e => {
				var fullItem = Object.assign(e.target.result || {}, item);
				transaction.objectStore(database).put(fullItem);
			}
			
		}
		// Potential filter function = store only if item has changed
		habits		.forEach(habit 		=> placeItem("habits", habit));
		
	}

	accessDb(save);
}

var saveCheckin = function(payload) {

	var checkin = payload.checkin;

	accessDb(function(event){
		var db = event.target.result;
		var transaction = db.transaction("habits", "readwrite");
		var habit = transaction.objectStore("habits").get(payload.habit_id);
		habit.onsuccess = function(e) {
			var habit = e.target.result;

			if(!Array.isArray(habit.checkins)) habit.checkins = [];
			var checkinIndex = habit.checkins.findIndex(storedCheckin => {
				return (checkin.checkinFor==storedCheckin.checkinFor);
			});

			if(checkinIndex==-1) {
				habit.checkins.push(checkin);
			} else {
				habit.checkins[checkinIndex] = checkin;
			}
			

			transaction.objectStore("habits").put(habit);
		}
	});
}

var saveSpacedReminder = function(payload) {
	console.log(payload);
}


var saveHabitGoal = function(payload) {

	var goal = payload.goal;

	accessDb(function(event){
		var db = event.target.result;
		var transaction = db.transaction("habits", "readwrite");
		var habit = transaction.objectStore("habits").get(payload.habit_id);
		habit.onsuccess = function(e) {
			var habit = e.target.result;

			if(!Array.isArray(habit.goals)) habit.goals = [];
			var goalIndex = habit.goals.findIndex(storedGoal => {
				return (goal._id==storedGoal._id);
			});

			if(goalIndex==-1) {
				habit.goals.push(goal);
			} else {
				habit.goals[goalIndex] = goal;
			}
			

			transaction.objectStore("habits").put(habit);
		}
	});
}


var appInfoSet = function(key, value) {
	accessDb(function(e){
		var db = e.target.result;
		var transaction = db.transaction(["appGeneral"], "readwrite");
		transaction.objectStore("appGeneral").put({key: key, value});
	});
}

var appInfoGet = function(key) {

	return new Promise((resolve, reject) => {
		accessDb(function(e) {
			var db = e.target.result;
			var transaction = db.transaction("appGeneral", "readwrite");
			var retreivePair = transaction.objectStore("appGeneral").get(key);
			retreivePair.onsuccess = function(e) {
				resolve(e.target.result);
			}
		});
	});

}


function saveItem(type, payload) {
	switch(type) { 
		case "habit": 
			saveHabit(payload);
			break;
		case "habit_goal": 
			saveHabitGoal(payload);
			break;

		case "checkin":
			saveCheckin(payload);
			break;
		case "spaced_reminder":
			saveSpacedReminder(payload)
			break;
	
	}
}

export {
	getStore,
	saveItem,
	appInfoSet,
	appInfoGet,
	logout
};