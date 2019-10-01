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

        case "SYNC_GOALS":
            var goals = action.goals.map(goal => {
                goal.id = goal._id;
                goal.status = goal.hasOwnProperty("status") ? goal.status : null;
                goal.endDate = Date.parse(goal.endDate);
                return goal;
            });

            return goals;            

        default: 
            return state;



    }
};