import { newCoreValue } from "./resources/applicationActions"

export default {
    props: ()=>{return {}},
    dispatches: dispatch => {
        return {
            newCoreValue: core_value => dispatch(newCoreValue(core_value))
        }
    }
}