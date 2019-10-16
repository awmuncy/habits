import { HYDRATE_PAGE, SORT_GOALS, DECLARE_GOAL } from "../../../actions";
import { mergeByIdOrAdd } from '../../../helpers';

export default (state = [], action) => {
    var goals = state.slice(0);
    switch(action.type) {
        case HYDRATE_PAGE: 

            return action.payload.goals;

        case DECLARE_GOAL:

            return mergeByIdOrAdd(goals, action.goal);
        
        case SORT_GOALS:

            return action.goals;       

        default: 
            return state;



    }
};