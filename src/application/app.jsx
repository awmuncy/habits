import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { HabitTracker } from './page-templates/HabitTracker';
import store from './store/store.js';
import tokenizedUser from './tokenizedUser.js';
import { persistentStoreStartup } from './lib/startupWorker.js';
import { refreshHabits } from './lib/requests';

window.refreshHabits = refreshHabits;


async function hydrateStore() {

  window.quer = await persistentStoreStartup();
  await window.quer({
    merkle   : {},
    messages : [],
    client_id: window.db.getNodeId(),
    group_id : 'my-group'
  });
  refreshHabits();
}

async function bootApp() {

  hydrateStore();
  tokenizedUser();

  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <HabitTracker />
      </BrowserRouter>
    </Provider>
    ,
    document.getElementById('momentum-app'));

}

bootApp();
