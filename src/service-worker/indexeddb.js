var dbV1 = function(event) {
	var db = event.target.result;
	db.createObjectStore("habits", {keyPath: "id"});
	db.createObjectStore("goals", {keyPath: "id"});
	db.createObjectStore("coreValues", {keyPath: "id"});
	db.createObjectStore("toDos", {keyPath: "id"});
	db.createObjectStore("appGeneral", {keyPath: "key"});
};

var dbError = function(error) {
	console.log(error);
};

var logout = function() {

	var clear = function(event) {
		var db = event.target.result;
		var transaction = db.transaction(["habits", "goals", "coreValues", "toDos", "appGeneral"], "readwrite");
		transaction.objectStore("habits").clear();
		transaction.objectStore("goals").clear();
		transaction.objectStore("coreValues").clear();
		transaction.objectStore("toDos").clear();
		transaction.objectStore("appGeneral").clear();
	}

	accessDb(clear);
}

var getStore = function() {
	return new Promise((resolve, reject) => {
		accessDb(async function(event) {
			var transaction = event.target.result.transaction(["habits", "goals", "coreValues", "toDos"], "readonly");
			var habits = transaction.objectStore("habits").getAll()
			var goals = transaction.objectStore("goals").getAll()
			var coreValues = transaction.objectStore("coreValues").getAll()
			var toDos = transaction.objectStore("toDos").getAll()
			
			var items = [habits, goals, toDos, coreValues].map((item) => {
				return new Promise((resolve, reject) => {
					item.onsuccess = e => {
						resolve(e.target.result);
					};
				});
			});

			var [habits, goals, toDos, coreValues] = await Promise.all(items);			

			habits = habits.map((habit) => {
				return habit;
			});

			var store = {
				habits: habits,
				goals: goals,
				core_values: coreValues,
				todos: toDos
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

var saveStore = function(store) {

	var habits = Array.isArray(store.habits) ? store.habits : [];
	var goals = Array.isArray(store.goals) ? store.goals : [];
	var coreValues = Array.isArray(store.core_values) ? store.core_values : [];
	var todos = Array.isArray(store.todos) ? store.todos : [];
	

	var save = function(event) {

		var db = event.target.result;
		var transaction = db.transaction(["habits", "goals", "coreValues", "toDos"], "readwrite");
		var placeItem = (database, item) => {

			var existing = transaction.objectStore(database).get(item.id);

			existing.onsuccess = e => {
				var fullItem = Object.assign(e.target.result || {}, item);
				transaction.objectStore(database).put(fullItem);
			}
			
		}
		// Potential filter function = store only if item has changed
		habits		.forEach(habit 		=> placeItem("habits", habit));
		goals		.forEach(goal 		=> placeItem("goals", goal));
		coreValues	.forEach(coreValue 	=> placeItem("coreValues", coreValue));
		todos		.forEach(todo 		=> placeItem("toDos", todo));
		
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

export {
	getStore,
	saveStore,
	saveCheckin,
	appInfoSet,
	appInfoGet,
	logout
};