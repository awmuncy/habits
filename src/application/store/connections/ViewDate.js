import {
  setViewDate
} from './resources/pageActions.js';
import { RECALCULATE_SCORES } from '../../../actions.js';

export default [
  (store, props) => {

    return {
      view_date: store.view_date
    };
  },
  dispatch => {
    return {
      change_view_date: (view_date) => {
        dispatch(setViewDate(view_date));
        dispatch({type: RECALCULATE_SCORES, view_date});
      }
    };
  }
];
