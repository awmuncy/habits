import { defineCoreValue } from "./resources/applicationActions"

export default {
    props: (state, props) => {
        return {
            core_value: state.core_values[state.core_values.findIndex(cv => (cv.id==props.id))] || false
        }
    },
    dispatches: dispatch => {
        return {
            defineCoreValue: core_value => {
                let now = new Date();
                now = now.getTime();
                core_value.modified_at = now;
                dispatch(defineCoreValue(core_value))
            }
        }
    }
}
