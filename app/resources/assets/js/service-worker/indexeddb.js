var dbV1 = function(event) {
	var db = event.target.result;
	db.createObjectStore("habits", {keyPath: "_id"});
	db.createObjectStore("goals", {keyPath: "_id"});
	db.createObjectStore("coreValues", {keyPath: "_id"});
	db.createObjectStore("toDos", {keyPath: "_id"});
	db.createObjectStore("loginInfo", {keyPath: "property"});
};

var dbError = function(error) {
	console.log(error);
};


var getStore = function() {
	return new Promise((resolve, reject) => {
		accessDb(async function(event) {
			var transaction = event.target.result.transaction(["habits", "goals", "coreValues", "toDos"], "readonly");
			var challenges = transaction.objectStore("habits").getAll()
			var goals = transaction.objectStore("goals").getAll()
			var coreValues = transaction.objectStore("coreValues").getAll()
			var toDos = transaction.objectStore("toDos").getAll()
			
			var items = [challenges, goals, toDos, coreValues].map((item) => {
				return new Promise((resolve, reject) => {
					item.onsuccess = e => {
						resolve(e.target.result);
					};
				});
			});

			var [challenges, goals, toDos, coreValues] = await Promise.all(items);			

			challenges = challenges.map((challenge) => {
				challenge.id = challenge._id;
				return challenge;
			});

			var store = {
				challenges: challenges,
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
			transaction.objectStore(database).put(item);
		}
		// Potential filter function = store only if item has changed
		habits		.forEach(habit 		=> placeItem("habits", habit));
		goals		.forEach(goal 		=> placeItem("goals", goal));
		coreValues	.forEach(coreValue 	=> placeItem("coreValues", coreValue));
		todos		.forEach(todo 		=> placeItem("toDos", todo));
		
	}

	accessDb(save);
}

export {
	getStore,
	saveStore
};