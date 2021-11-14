let user = localStorage.getItem('id');
let bearer = localStorage.getItem('mySecretToken');
let host = 'http://localhost:3030';

import { store } from '../app.jsx';


export async function deleteCheckin(checkin, habitId) {

  let req = await fetch(`${host}/api/users/${user}/habits/${habitId}/checkin`, {
    method : 'DELETE',
    headers: {
      Authorization : 'Bearer ' + bearer,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({value: checkin})
  });

  let response = await req.json();
  if (req.status === 200) {
    store.dispatch({
      type    : 'UPDATE_HABIT_CHECKINS',
      habit   : habitId,
      checkins: response.checkins
    });
  }

}

export async function createCheckin(habitId, moment = null) {
  let req = await fetch(`${host}/api/users/${user}/habits/${habitId}/checkin`, {
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
      type    : 'UPDATE_HABIT_CHECKINS',
      habit   : habitId,
      checkins: response.checkins
    });
  }

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
