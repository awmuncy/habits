let user = localStorage.getItem('id');
let bearer = localStorage.getItem('mySecretToken');
// let host = 'http://ras.allenmuncy.com:3030';
import store from '../store/store.js';
import { addHabits } from '../store/slices/habitsSlice.js';


export async function refreshHabits(results) {


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
  localStorage.setItem('habits_list_prev', JSON.stringify(habits));
  store.dispatch(addHabits(habits));
}



export async function deleteCheckin(checkin) {
  let q = await window.quer;
  q.tombstone('checkins', checkin);

}

export async function createCheckin(habitId, moment = null) {
  let q = await window.quer;
  q.insert('checkins', {habit_id: habitId, moment});
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