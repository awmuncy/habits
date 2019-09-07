import { createStore } from "redux";
import rootReducer from "../reducers/masterReducer";
import  { loadState } from "./localStorage.js";

if(window.__REDUX_DEVTOOLS_EXTENSION__) {
 	var loaded = loadState();
} else {
	var loaded = loadState();
}
const store = createStore(rootReducer, loaded, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());


export default store;