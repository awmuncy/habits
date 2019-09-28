import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import HabitTracker from './components/navigation/HabitTracker.js';
import store from "./store/store";
import csrf from './auth/csrf';
import tokenizedUser from './auth/tokenizedUser';

csrf();
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