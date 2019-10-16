import { PIN_HABIT, UNPIN_HABIT } from "../../../actions";

const pinned = (state = [], action) => {
    var new_state;

    if(state == 1) return []; // Removable

    switch(action.type) {
        case PIN_HABIT:
            if(!Array.isArray(state)) {
                new_state = [];
            } else {
                new_state = state.slice(0);
            }
            

            new_state.push(action.id);
            return new_state;

        case UNPIN_HABIT:
            var new_state = state.slice(0);
            var index = new_state.indexOf(action.id);
            if (index > -1) {
                new_state.splice(index, 1);
             }
            return new_state;




        default: 
        
            return state;
    }
  }
  
  export default pinned;