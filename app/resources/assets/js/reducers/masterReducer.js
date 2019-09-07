

import challenges from './challenges.js';
import ui from './ui.js';
import syncStatus from './sync.js';
import filters from './filters.js';
import view_date from './view_date.js';
import pinned from './pinned.js';
import goals from './goals.js';
import core_values from './core_values.js';

import { combineReducers } from 'redux';




const initialState = {
	navigationOpen : false,
	challenges : [],
	syncStatus: "complete",
	pinned_habits: [null]
};



const rootReducer = combineReducers({
	challenges: challenges,
	navigationOpen: ui,
	syncStatus: syncStatus,
  	view_date: view_date,
	filters: filters,
	pinned_habits: pinned,
	goals: goals,
	core_values: core_values,
	todos: []
});

export default rootReducer;