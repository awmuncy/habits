import { HYDRATE_PAGE, NEW_GOAL, SORT_GOALS, DO_GOAL } from "../actions";

export default (state = [], action) => {
    switch(action.type) {
        case HYDRATE_PAGE: 

            return action.payload.goals;
        case NEW_GOAL:

            var goals = state.slice(0);
            
            var new_goal = action.goal;

            goals.push(new_goal);


            return goals;
        
        case SORT_GOALS:


            return action.goals;

        case DO_GOAL: 

            var goals = state.slice(0);

            goals.map((goal) => {
                if(goal.id==action.goal.id) {
                    goal.status=action.goal.status;
                }
                return goal;
            })

            return goals;          

        default: 
            return state;



    }
};