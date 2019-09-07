
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */

// require('./bootstrap');

/**
 * Next, we will create a fresh React component instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import HabitTracker from './components/navigation/HabitTracker.js';
import store from "./store/store";
import  { saveState } from "./store/localStorage.js";
import { BrowserRouter } from 'react-router-dom';
import syncDatabase from './subscriptions/databaseSync.js';
import jwt_decode from 'jwt-decode';

document.store = store;

window.onerror = () => {return false;};

console.filteredWarn = console.warn;

console.warn = (message) => {

	var blockedWarnings = [
 		"componentWillMount has been renamed, and is not recommended for use",
		"componentWillReceiveProps has been renamed",
		"componentWillUpdate has been renamed"
	];

	var includesBlocked;

	blockedWarnings.forEach((blockedWarning) => {
		if(message.includes(blockedWarning)) includesBlocked = true;
	});

	if(includesBlocked) return false;
	
	return console.filteredWarn(message);
};


(()=>{

	var localToken = localStorage.getItem("mySecretToken") || null;
	if(localToken==null && window.location.pathname!="/login"){
		window.location.assign("/login");
	}
	localStorage.setItem("user", "Guest");
	if(localToken) {
		
		var detokenizedUser = jwt_decode(localToken);
		localStorage.setItem("user", detokenizedUser.name);
	}

})();



fetch("/csrf").then((response) => {
	return response.text();
}).then(data=>{
	data = JSON.parse(data);
	document.csrf = data.csrf;
	
	store.dispatch({type: "SYNC_READY"});
});	

store.subscribe(() => {

	var state = store.getState();

	saveState({
		challenges: state.challenges,
		syncStatus: state.syncStatus,
		pinned_habits: state.pinned_habits,
		goals: state.goals,
		core_values: state.core_values,
		todos: state.todos
	});

	syncDatabase(store);
});



if (document.getElementById('momentum-app')) {
    ReactDOM.render(    	
		  <Provider store={store}>
		  	<BrowserRouter>
		    	<HabitTracker />
		    </BrowserRouter>
		  </Provider>
		, 
	  document.getElementById('momentum-app'));
}

