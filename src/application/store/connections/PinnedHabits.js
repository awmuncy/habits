export default [
  () => state => {
    return {
      pinned_habits: state.pinned_habits
    };
  },
  () => {
    return {};
  }
];
