export default {
    props: () => state => {
        return {
            pinned: state.pinned_habits
        }
    },
    dispatches: () => {
        return {};
    }
};