import { combineReducers } from 'redux';

import habits from './habits.js';
import filters from './filters.js';
import view_date from './view_date.js';
import pinned from './pinned.js';
import goals from './goals.js';
import core_values from './core_values.js';
import { TOGGLE_NAV } from '../actions.js';

const rootReducer = combineReducers({
	habits: habits,
	navigationOpen: (s=0,a)=>a.type===TOGGLE_NAV ? !s : s,
  	view_date: view_date,
	filters: filters,
	pinned_habits: pinned,
	goals: goals,
	core_values: core_values
});

export default rootReducer;