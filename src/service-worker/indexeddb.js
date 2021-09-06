let dbV1 = function(event) {
  let db = event.target.result;
  db.createObjectStore('habits', {keyPath: 'id'});
  db.createObjectStore('appGeneral', {keyPath: 'key'});
  db.createObjectStore('recalls', {keyPath: 'id'});
};

let dbError = function(error) {
  // eslint-disable-next-line no-console
  console.log(error);
};

let logout = function() {

  let clear = function(event) {
    let db = event.target.result;
    let transaction = db.transaction(['habits', 'appGeneral'], 'readwrite');
    transaction.objectStore('habits').clear();
    transaction.objectStore('appGeneral').clear();
  };

  accessDb(clear);
};

let getStore = function() {
  return new Promise((resolve, reject) => {
    accessDb(async function(event) {
      let transaction = event.target.result.transaction(['habits', 'appGeneral', 'recalls'], 'readonly');
      let habitsDB = transaction.objectStore('habits').getAll();
      let recallsDB = transaction.objectStore('recalls').getAll();
      let userSubscriptionDB = transaction.objectStore('appGeneral').get('userSubscription');
      let userTokenDB = transaction.objectStore('appGeneral').get('userToken');

      let items = [habitsDB, recallsDB, userSubscriptionDB, userTokenDB].map((item) => {
        return new Promise((resolve, reject) => {
          item.onsuccess = e => {
            resolve(e.target.result);
          };
        });
      });

      let [habits, recalls, userSubscription, userToken, userName] = await Promise.all(items);

      let store = {
        recalls,
        habits: habits,
        user  : {
          subscription: userSubscription.value,
          token       : userToken.value
        }
      };

      resolve(store);
    });
  });
};

function accessDb(action) {
  let request = indexedDB.open('f3_app_storage', 1);
  request.onerror = dbError;
  request.onupgradeneeded = dbV1;
  request.onsuccess = action;
}

let saveHabit = function(store) {

  let habits = Array.isArray(store.habits) ? store.habits : [];


  let save = function(event) {

    let db = event.target.result;
    let transaction = db.transaction(['habits'], 'readwrite');
    let placeItem = (database, item) => {

      let existing = transaction.objectStore(database).get(item.id);

      existing.onsuccess = e => {
        let fullItem = Object.assign(e.target.result || {}, item);
        transaction.objectStore(database).put(fullItem);
      };

    };
    // Potential filter function = store only if item has changed
    habits.forEach(habit => placeItem('habits', habit));

  };

  accessDb(save);
};

let saveCheckin = function(payload) {

  let checkin = payload.checkin;

  accessDb(function(event) {
    let db = event.target.result;
    let transaction = db.transaction('habits', 'readwrite');
    let habit = transaction.objectStore('habits').get(payload.habit_id);
    habit.onsuccess = function(e) {
      let habit = e.target.result;

      if (!Array.isArray(habit.checkins)) { habit.checkins = []; }
      let checkinIndex = habit.checkins.findIndex(storedCheckin => {
        return checkin.checkinFor === storedCheckin.checkinFor;
      });

      if (checkinIndex === -1) {
        habit.checkins.push(checkin);
      } else {
        habit.checkins[checkinIndex] = checkin;
      }


      transaction.objectStore('habits').put(habit);
    };
  });
};

let saveRecall = function(recallToSave) {


  let save = function(event) {

    let db = event.target.result;
    let transaction = db.transaction(['recalls'], 'readwrite');
    let placeItem = (database, item) => {

      let existing = transaction.objectStore(database).get(item.id);

      existing.onsuccess = e => {
        let fullItem = Object.assign(e.target.result || {}, item);
        transaction.objectStore(database).put(fullItem);
      };

    };
    // Potential filter function = store only if item has changed
    placeItem('recalls', recallToSave);

  };

  accessDb(save);
};


let saveHabitGoal = function(payload) {

  let goal = payload.goal;

  accessDb(function(event) {
    let db = event.target.result;
    let transaction = db.transaction('habits', 'readwrite');
    let habit = transaction.objectStore('habits').get(payload.habit_id);
    habit.onsuccess = function(e) {
      let habit = e.target.result;

      if (!Array.isArray(habit.goals)) { habit.goals = []; }
      let goalIndex = habit.goals.findIndex(storedGoal => {
        return goal._id === storedGoal._id;
      });

      if (goalIndex === -1) {
        habit.goals.push(goal);
      } else {
        habit.goals[goalIndex] = goal;
      }


      transaction.objectStore('habits').put(habit);
    };
  });
};


let appInfoSet = function(key, value) {
  accessDb(function(e) {
    let db = e.target.result;
    let transaction = db.transaction(['appGeneral'], 'readwrite');
    transaction.objectStore('appGeneral').put({key: key, value});
  });
};

let appInfoGet = function(key) {

  return new Promise((resolve, reject) => {
    accessDb(function(e) {
      let db = e.target.result;
      let transaction = db.transaction('appGeneral', 'readwrite');
      let retreivePair = transaction.objectStore('appGeneral').get(key);
      retreivePair.onsuccess = function(e) {
        resolve(e.target.result);
      };
    });
  });

};


function saveItem(type, payload) {
  switch (type) {
  case 'habit':
    saveHabit(payload);
    break;
  case 'habit_goal':
    saveHabitGoal(payload);
    break;

  case 'checkin':
    saveCheckin(payload);
    break;
  case 'recall':
    saveRecall(payload);
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
