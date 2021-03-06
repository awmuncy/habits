import {HYDRATE_PAGE} from '../../../actions.js';

export default (store = {}, action) => {
  let newStore = {};
  Object.assign(newStore, store);
  switch (action.type) {
  case HYDRATE_PAGE:

    return action.payload.user;
  case 'CHANGE_SUBSCRIPTION':
    newStore.subscription = action.subscription;
    return newStore;
  }
  return store;
};
