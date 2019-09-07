export default {
    props: store => {
        return {
            core_values: store.core_values
        }
    },
    dispatches: dispatch => {
        return {
            sortCoreValues: core_values_sorted => {
                dispatch({
                    type: "SORT_CORE_VALUES",
                    core_values: core_values_sorted
                })
            }
        }
    }
}