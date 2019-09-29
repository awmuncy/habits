import { createStore, applyMiddleware } from "redux";
import rootReducer from "../reducers/masterReducer";
import thunk from 'redux-thunk';
import { toggleNav } from "./connections/resources/pageActions";

const store = () => {

	const newStore = createStore(rootReducer, {}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() && applyMiddleware(thunk));

	openChannels(newStore);

	return newStore;

}

function openChannels(store) {
	var channel = new BroadcastChannel("store");
	channel.postMessage("init");

	channel.addEventListener("message", () => {
		store.dispatch(toggleNav());
	});

}

export default store;