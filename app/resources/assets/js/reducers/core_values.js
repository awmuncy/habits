export default (state = [], action) => {
    switch(action.type) {
        case "SORT_CORE_VALUES": 



            return action.core_values;
        
        case "NEW_CORE_VALUE":
        
            var core_values = state.slice(0);

            var new_core_value = {
                title: action.title,
                content: action.content,
                id: Math.floor(100000 + Math.random() * 900000)
            }
            
            core_values.push(new_core_value);

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