import { HYDRATE_PAGE, SORT_CORE_VALUES, NEW_CORE_VALUE } from "../actions";


export default (state = [], action) => {
    switch(action.type) {

        case HYDRATE_PAGE:

            return action.payload.core_values;

        case SORT_CORE_VALUES: 

            return action.core_values;
        
        case NEW_CORE_VALUE:
        
            var core_values = state.slice(0);

            core_values.push(action.core_value);

            return core_values;

    }
    return state;
};