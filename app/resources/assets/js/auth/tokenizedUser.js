import jwt_decode from 'jwt-decode';

export default () => {

	var localToken = localStorage.getItem("mySecretToken") || null;
	if(localToken==null && window.location.pathname!="/login"){
		window.location.assign("/login");
	}
	localStorage.setItem("user", "Guest");
	if(localToken) {
		
		var detokenizedUser = jwt_decode(localToken);
		localStorage.setItem("user", detokenizedUser.name);
	}

};