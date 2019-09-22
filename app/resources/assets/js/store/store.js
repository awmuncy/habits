import { createStore } from "redux";
import rootReducer from "../reducers/masterReducer";
import { getStore, saveStore } from "./indexeddb";
import syncDatabase from '../subscriptions/databaseSync.js';

// Store is run once on load.
// It creates the local store from IndexedDB
const store = () => {
	return new Promise((resolve, reject) => {
		var getDbState = async function() {
			var dbcontents = await getStore();
			const newStore = createStore(rootReducer, dbcontents, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

			newStore.dispatch({type: "RECALCULATE_SCORES"});

			console.log(newStore.getState());

			resolve(newStore);

			
			newStore.subscribe(() => {

				var state = newStore.getState();
			
				var savable = {
					challenges: state.challenges,
					syncStatus: state.syncStatus,
					pinned_habits: state.pinned_habits,
					goals: state.goals,
					core_values: state.core_values,
					todos: state.todos
				}
		
				// oldSaveState(savable);
				saveStore(savable);
			
				syncDatabase(newStore);
			});


		}
		getDbState();
	});
}

export default store;