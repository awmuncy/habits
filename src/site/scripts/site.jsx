import React from 'react';
import ReactDOM from 'react-dom';
import Register from './Register.jsx';
import Login from './Login.jsx';

document.querySelector(".mobile-nav").addEventListener('click', function() {
	document.querySelector(".mobile-nav").classList.toggle("active");
	document.querySelector(".site-navigation").classList.toggle("active");
});


if (document.getElementById('login-register-app')) {
    ReactDOM.render(    	
		  <Register />
		, 
	  document.getElementById('login-register-app'));
}


if (document.getElementById('login-app')) {
    ReactDOM.render(    	
		  <Login />
		, 
	  document.getElementById('login-app'));
}


var loggedIn = localStorage.getItem("user");

if(loggedIn=="Guest" || loggedIn==undefined) {
	
} else {
	document.querySelector(".auth").classList.toggle("logged-in");
}