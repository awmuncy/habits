import {HYDRATE_PAGE} from '../../../actions';

export default (store={}, action) => {
    var newStore = {};
    Object.assign(newStore, store);
    switch(action.type) {
		case HYDRATE_PAGE:

			return action.payload.user;
        case "CHANGE_SUBSCRIPTION":
            newStore.subscription = action.subscription;
            return newStore;
    }
    return store;
};