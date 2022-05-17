import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { HabitTracker } from './page-templates/HabitTracker';
import store from './store/store.js';
import tokenizedUser from './tokenizedUser.js';
import { getHabits } from './lib/requests.js';
import { addHabits } from './store/slices/habitsSlice.js';




let loggedin = tokenizedUser();

// if (loggedin) {
// let storeInit = store();

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <HabitTracker />
    </BrowserRouter>
  </Provider>
  ,
  document.getElementById('momentum-app'));


getHabits().then(r=>r.json()).then(habits=>{
  store.dispatch(addHabits(habits));
});

export {
  store
};
