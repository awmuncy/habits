export default (state = [], action) => {
    switch(action.type) {

        case "HYDRATE":

            return action.payload.core_values;

        case "SORT_CORE_VALUES": 



            return action.core_values;
        
        case "NEW_CORE_VALUE":
        
            var core_values = state.slice(0);


            core_values.push(action.core_value);

            return core_values;

        case "SYNC_CORE_VALUES":

            var new_cvs = [];

            action.core_values.forEach(core_value => {
                new_cvs[core_value.position] = core_value;
                if(core_value.hasOwnProperty("_id")) {
                    new_cvs[core_value.position].id = core_value._id;
                    delete new_cvs[core_value.position]._id;
                }
            });

            return new_cvs;
    }
    return state;
};