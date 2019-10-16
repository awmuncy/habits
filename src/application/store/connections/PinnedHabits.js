export default {
    props: () => state => {
        return {
            pinned_habits: state.pinned_habits
        }
    },
    dispatches: () => {
        return {};
    }
};