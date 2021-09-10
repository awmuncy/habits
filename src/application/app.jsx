import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { HabitTracker } from './store/ConnectedComponents.js';
import store from './store/store.js';
import filterConsoleNotifs from './filterConsoleNotifs.js';
import tokenizedUser from './tokenizedUser.js';



filterConsoleNotifs();
var loggedin = tokenizedUser();

if(loggedin) {
	var storeInit = store();

	ReactDOM.render(    	
		<Provider store={storeInit}>
			<BrowserRouter>
				<HabitTracker />
			</BrowserRouter>
		</Provider>
	, 
	document.getElementById('momentum-app'));
}