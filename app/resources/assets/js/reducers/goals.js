export default (state = [], action) => {
    switch(action.type) {
        case "HYDRATE": 

            return action.payload.goals;
        case 'NEW_GOAL':

            var goals = state.slice(0);
            
            var new_goal = action.goal;

            goals.push(new_goal);


            return goals;
        
        case 'SORT_GOALS':


            return action.goals;

        case 'DO_GOAL': 

            var goals = state.slice(0);

            goals.map((goal) => {
                if(goal.id==action.id) {
                    goal.status=action.status;
                }
                return goal;
            })

            return goals;          

        default: 
            return state;



    }
};