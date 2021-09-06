import { combineReducers } from 'redux';

import habits from './habits.js';
import filters from './filters.js';
import view_date from './view_date.js';
import pinned_habits from './pinned.js';
import { HYDRATE_PAGE, TOGGLE_NAV } from '../../../actions';
import syncStatus from './sync_status';
import user from './user';

let navigationOpen = (s = 0, a)=>a.type === TOGGLE_NAV ? !s : s;

let recalls = (store = [], action) => {
  let newStore;

  switch (action.type) {
  case HYDRATE_PAGE:
    return action.payload.recalls;
  case 'NEW_RECALL':
    newStore = store.slice();

    newStore.push(action.content);
    return newStore;

  case 'RECALL_ATTEMPT':
    newStore = store.slice();

    newStore[newStore.findIndex(r => r.id === action.id)].completions.push(action.success);


    return [...newStore];
  default:
    return store;
  }
};

const rootReducer = combineReducers({
  habits,
  navigationOpen: navigationOpen,
  view_date,
  filters,
  pinned_habits,
  syncStatus    : () => syncStatus,
  subscription  : (store = null, action) => {
    switch (action.type) {
    case 'SET_CHECKOUT':
      return action.to;
    default:
      return store;
    }
  },
  user,
  recalls
});

export default rootReducer;
