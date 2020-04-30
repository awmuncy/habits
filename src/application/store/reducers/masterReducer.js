import { combineReducers } from 'redux';

import habits from './habits.js';
import filters from './filters.js';
import view_date from './view_date.js';
import pinned from './pinned.js';
import { TOGGLE_NAV } from '../../../actions';
import syncStatus from './sync_status';
import user from './user';

const rootReducer = combineReducers({
	habits: habits,
	navigationOpen: (s=0,a)=>a.type===TOGGLE_NAV ? !s : s,
  	view_date: view_date,
	filters: filters,
	pinned_habits: pinned,
	syncStatus: () => syncStatus,
	subscription: (store=null, action) => {
		switch(action.type) {
			case "SET_CHECKOUT":
				return action.to;		
			default:
				return store;
		}
	},
	user: user
});

export default rootReducer;