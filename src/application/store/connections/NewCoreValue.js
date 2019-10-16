import { newCoreValue } from "./resources/applicationActions"

export default {
    props: ()=>{return {}},
    dispatches: dispatch => {
        return {
            newCoreValue: core_value => {
                let now = new Date();
                now = now.getTime();
                core_value.modified_at = now;
                dispatch(newCoreValue(core_value))
            }
        }
    }
}