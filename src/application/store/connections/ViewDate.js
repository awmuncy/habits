import {
    setViewDate
} from './resources/pageActions';
import { RECALCULATE_SCORES } from '../../../actions';

export default {
    props: () => (state, props) => {

        return {
            view_date: state.view_date
        };
    },
    dispatches: dispatch => {
        return {
            change_view_date: (view_date) => {
                dispatch(setViewDate(view_date));
                dispatch({type: RECALCULATE_SCORES, view_date});
            }
        };
    }
};