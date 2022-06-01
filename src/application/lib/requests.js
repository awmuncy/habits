let user = localStorage.getItem('id');
let bearer = localStorage.getItem('mySecretToken');
// let host = 'http://ras.allenmuncy.com:3030';
import store from '../store/store.js';
import { addHabits } from '../store/slices/habitsSlice.js';


export function refreshHabits() {

  let results = window.db.debug.db.exec('SELECT * FROM HabitList;');
  if (!results[0]) {
    return;
  }
  let habits = [];
  results[0]?.values?.forEach((row) => {
    let prunedRow = row.slice();
    prunedRow.shift();
    prunedRow.shift();
    let index = habits.findIndex(habit => habit.id === row[1]);
    if (index === -1) {
      let initCheckins = prunedRow[0] ? [prunedRow] : [];


      habits.push({
        id      : row[1],
        title   : row[0],
        checkins: initCheckins,
        mode    : row[5],
        interval: row[6],
        target  : row[7]
      });
    } else {
      habits[index].checkins.push(prunedRow);
    }
  });

  store.dispatch(addHabits(habits));
}



export async function login(user, password) {
  return await fetch(`${host}/api/auth/login`, {
    method     : 'POST',
    credentials: 'same-origin',
    body       : JSON.stringify({password: password, email: user}),
    headers    : {
      'Content-Type'    : 'application/json',
      'Accept'          : 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
    }
  });
}

export async function deleteCheckin(checkin) {
  window.db.tombstone('checkins', checkin);
  refreshHabits();

}

export async function createCheckin(habitId, moment = null) {
  window.db.insert('checkins', {habit_id: habitId, moment: new Date().getTime()});
  refreshHabits();

}

export async function getHabits() {
  return await fetch(`${host}/api/users/${user}/habits`, {
    method : 'GET',
    headers: {
      'Authorization': 'Bearer ' + bearer
    }
  });
};


export async function sleepHabit(habitId, moment = null) {
  let req = await fetch(`${host}/api/users/${user}/habits/${habitId}/sleep`, {
    method : 'POST',
    headers: {
      Authorization : 'Bearer ' + bearer,
      'Content-Type': 'application/json'
    },
    body: moment ? JSON.stringify({value: moment}) : null
  });
  let response = await req.json();
  if (req.status === 200) {
    store.dispatch({
      type : 'SLEEP_HABIT',
      habit: habitId
    });
  }

};
