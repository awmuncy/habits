import { HYDRATE_PAGE, SORT_GOALS, DECLARE_GOAL } from "../../../actions";
import { mergeByIdOrAdd } from '../../../helpers';

function goalsReducer(state = [], action) {
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


export default function(state = [], action) {
    if(action.type=="MULTI_ACTION") {
        var goals = action.actions.reduce((state, singular_action) => {
            return goalsReducer(state, singular_action);
        }, state);
        return goals;
    } else {
        return goalsReducer(state, action);
    }
}