export default {
    props: (state, props) => {
        var core_value = state.core_values[state.core_values.findIndex(cv => (cv.id==props.id))];
        return {
            title: core_value.title,
            content: core_value.content
        }
    },
    dispatches: dispatch => {
        return {

        }
    }
}
