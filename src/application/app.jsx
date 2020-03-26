import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { HabitTracker } from './store/ConnectedComponents';
import store from './store/store';
import filterConsoleNotifs from './filterConsoleNotifs';
import tokenizedUser from './tokenizedUser';



filterConsoleNotifs();
tokenizedUser();

var storeInit = store();

ReactDOM.render(    	
	<Provider store={storeInit}>
		<BrowserRouter>
			<HabitTracker />
		</BrowserRouter>
	</Provider>
, 
document.getElementById('momentum-app'));