import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../reducers/masterReducer";
import thunk from 'redux-thunk';
import { dispatchChannel, hydrate } from "./connections/resources/applicationActions";

const store = () => {

	const newStore = createStore(rootReducer, {
			habits: []
		}, 
		compose(
			applyMiddleware(thunk),
			window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
		)
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