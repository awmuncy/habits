export default {
    props: (state, props) => {

        var indexOf;

        state.core_values.forEach((cv, index) => {
            if(cv.id==props.id) {
                indexOf = index;
            }
        });

        return {
            core_value: state.core_values[indexOf],
        };
    },
    dispatches: dispatch => {
        return {
            
        };
    }
}