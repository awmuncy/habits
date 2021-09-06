import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../store/reducers/masterReducer';
import thunk from 'redux-thunk';
import { dispatchChannel, hydrate, syncStart } from './connections/resources/applicationActions';
import { HYDRATE_PAGE } from '../../actions';
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

  openChannels(newStore);

  return newStore;

};


function openChannels(store) {
  let channel = dispatchChannel;

  navigator.serviceWorker.ready.then((sw) => {
    channel.postMessage({type: 'init'});
    sw.active.postMessage({type: 'init'});
  });

  channel.addEventListener('message', e => {
    let message = e.data ? e.data : e;
    if (message.type === HYDRATE_PAGE) {
      store.dispatch(hydrate(message));
      store.dispatch(syncStart());
    }
    if (message.type === 'dispatch') {
      store.dispatch(message.payload);
    }
    if (message.type === 'dispatches') {
      let action = {
        type   : 'MULTI_ACTION',
        actions: message.payload
      };
      store.dispatch(action);

    }
  });

}

export default store;
