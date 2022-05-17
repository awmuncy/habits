import { configureStore } from '@reduxjs/toolkit';
import navigationOpenReducer from './slices/navigationOpenSlice.js';
import habitsReducer from './slices/habitsSlice.js';
import sortReducer from './slices/sortSlice.js';


const store = configureStore({
  reducer: {
    habits        : habitsReducer,
    navigationOpen: navigationOpenReducer,
    sort          : sortReducer
  }
});

export default store;
