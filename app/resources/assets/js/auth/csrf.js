// Auth and CSRF actons

// fetch("/csrf").then((response) => {
// 	return response.text();
// }).then(data=>{
// 	data = JSON.parse(data);
// 	document.csrf = data.csrf;
	
// 	store.dispatch({type: "SYNC_READY"});
// });	

export default () => {
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
}
