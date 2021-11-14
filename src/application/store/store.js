import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../store/reducers/masterReducer.js';
import thunk from 'redux-thunk';
import { dispatchChannel, hydrate, syncStart } from './connections/resources/applicationActions.js';
import { HYDRATE_PAGE } from '../../actions.js';
let middleware;

if (window.hasOwnProperty('__REDUX_DEVTOOLS_EXTENSION__')) {
  middleware = compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
} else {
  middleware = applyMiddleware(thunk);
}

const store = () => {

  const newStore = createStore(rootReducer, {
    habits : [],
    recalls: []
  },
  middleware
  );


  return newStore;

};



export default store;
