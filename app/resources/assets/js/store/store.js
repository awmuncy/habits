import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../reducers/masterReducer";
import thunk from 'redux-thunk';
import { dispatchChannel, hydrate } from "./connections/resources/applicationActions";
var middleware;

if(window.hasOwnProperty("__REDUX_DEVTOOLS_EXTENSION__")) {
	middleware = compose(
		applyMiddleware(thunk),
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	);
} else {
	middleware = applyMiddleware(thunk);
}

const store = () => {

	const newStore = createStore(rootReducer, {
			habits: []
		}, 
		middleware
	);

	openChannels(newStore);

	return newStore;

}


function openChannels(store) {
	var channel = dispatchChannel;

	navigator.serviceWorker.ready.then((sw) => {
		channel.postMessage({type:"init"});
	});

	channel.addEventListener("message", e => {
		var message = e.data;
		if(message.type=="HYDRATE") {
			store.dispatch(hydrate(message));
		}
		if(message.type=="dispatch") {
			store.dispatch(message.payload);
		}
	});

}

export default store;