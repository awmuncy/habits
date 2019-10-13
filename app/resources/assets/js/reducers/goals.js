import { HYDRATE_PAGE, SORT_GOALS, DECLARE_GOAL } from "../actions";

export default (state = [], action) => {
    var goals = state.slice(0);
    switch(action.type) {
        case HYDRATE_PAGE: 

            return action.payload.goals;

        case DECLARE_GOAL:

            var goalIndex = goals.findIndex(goal => {
                return (goal.id==action.goal.id);
            });

            action.goal.modified_at = new Date().getTime();

            if(goalIndex===-1) {
                goals.push(action.goal);
            } else {
                goals[goalIndex] = Object.assign(goals[goalIndex], action.goal);
            }

            return goals;
        
        case SORT_GOALS:

            return action.goals;       

        default: 
            return state;



    }
};