import { HYDRATE_PAGE, SORT_CORE_VALUES, DECLARE_CORE_VALUE } from "../../../actions";
import { mergeByIdOrAdd } from "../../../helpers";

function coreValueReducer(state = [], action) {
    var core_values = state.slice(0);
    switch(action.type) {

        case HYDRATE_PAGE:

            return action.payload.core_values;

        case SORT_CORE_VALUES: 

            return action.core_values;
        
        case DECLARE_CORE_VALUE:

            return mergeByIdOrAdd(core_values, action.core_value);
    }
    return state;
};

export default function(state = [], action) {
    if(action.type=="MULTI_ACTION") {
        var core_values = action.actions.reduce((state, singular_action) => {
            return coreValueReducer(state, singular_action);
        }, state);
        return core_values;
    } else {
        return coreValueReducer(state, action);
    }
}