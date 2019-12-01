import React from 'react';
import ReactDOM from 'react-dom';
import Register from './Register';

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


var loggedIn = localStorage.getItem("user");

if(loggedIn=="Guest" || loggedIn==undefined) {
	
} else {
	document.querySelector(".auth").classList.toggle("logged-in");
}