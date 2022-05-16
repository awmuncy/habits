import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { HabitTracker } from './store/ConnectedComponents.js';
import store from './store/store.js';
import tokenizedUser from './tokenizedUser.js';
import { getHabits } from './lib/requests.js';




let loggedin = tokenizedUser();

// if (loggedin) {
let storeInit = store();

ReactDOM.render(
  <Provider store={storeInit}>
    <BrowserRouter>
      <HabitTracker />
    </BrowserRouter>
  </Provider>
  ,
  document.getElementById('momentum-app'));


getHabits().then(r=>r.json()).then(habits=>{
  storeInit.dispatch({type: 'SAVE_HABITS', habits});
});

export {
  storeInit as store
};
