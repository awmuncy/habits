export default [
  (store, props) => {

    let habit_position = store.habits.findIndex(function(habit) {

      if (habit.id === props.habit_id) {
        return true;
      }
      return false;
    });



    let goals = store.habits[habit_position] ? store.habits[habit_position].goals || [] : false || [];
    let canary = goals[goals.length - 1] && goals[goals.length - 1].strength;

    return {
      habit : store.habits[habit_position],
      goals : goals,
      canary: canary
    };
  },
  () => { return {}; }
];
