
export default [
  (store, props) => {
  },
  dispatch => {
    return {
      applySort: (habit_id, checkinFor, status) => {
        let now = new Date();
        now = now.getTime();
        dispatch(applySort());
      }
    };
  }
];
