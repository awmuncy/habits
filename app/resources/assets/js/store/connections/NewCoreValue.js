export default {
    props: ()=>{return {}},
    dispatches: dispatch => {
        return {
            newCoreValue: (title, content) => dispatch({
                type: "NEW_CORE_VALUE",
                title: title,
                content: content
            })
        }
    }
}