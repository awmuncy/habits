import { calculateScores, hydrateScores } from './calculateScores.js';
import {
  NEW_HABIT,
  REMOVE_HABIT,
  HYDRATE_PAGE,
  RECALCULATE_SCORES,
  CLEAR_FILTERS,
  SORT_HABITS_BY_STATUS,
  SORT_HABITS_BY_SCORE,
  SORT_HABITS,
  DO_CHECKIN
} from '../../../actions.js';
// TODO: Refector the heck out of this file


function habitReducer(state = [], action, calc_scores = true) {
  let habits = Array.isArray(state) ? state.slice(0) : [];
  let index;
  switch (action.type) {

  case 'UPDATE_HABIT_CHECKINS':

    return habits.map(function(habit) {
      if (habit._id === action.habit) {
        habit.checkins = action.checkins;
      }
      return habit;
    });



  case 'SAVE_HABITS':

    return action.habits;



  case HYDRATE_PAGE:

    return action.payload.habits;

  case RECALCULATE_SCORES:


    let calcedHabits = habits.map((habit) => {
      habit.view_date = action.view_date;
      habit.checkinSlots = hydrateScores(habit);
      habit.view_date = undefined;
      return habit;
    });

    return calcedHabits;

  case NEW_HABIT:
    if (habits.findIndex(habit=>{
      return habit.id === action.habit.id;
    }) !== -1) { return habits; }
    if (action.habit.deleted === true) { return habits; }
    let createdHabit = {};
    createdHabit.title = action.habit.title;

    createdHabit.id = action.habit.id;
    createdHabit.beginDate = action.habit.beginDate;
    createdHabit._id = createdHabit.id;


    if (typeof action.habit.profile === 'string' && action.habit.profile.charAt(0) === '{') {
      action.habit.profile = JSON.parse(action.habit.profile);
    }

    createdHabit.profile = action.habit.profile;

    createdHabit.checkins = action.habit.checkins;


    createdHabit.checkinSlots = hydrateScores(createdHabit);

    habits = Array.isArray(state) ? state.slice(0) : [];


    habits.push(createdHabit);

    return habits;



  case CLEAR_FILTERS:
    let cleared = [...state].map(function(habit) {
      habit.filtered_out = false;
      return habit;
    });

    return cleared;

  case SORT_HABITS_BY_STATUS:

    let myHabits = Array.isArray(state) ? [...state] : [];

    myHabits.sort((a, b) => {
      if (!a.checkinSlots.length || !b.checkinSlots.length) {
        return 0;
      }
      let first = a.checkinSlots[a.checkinSlots.length - 1].status;
      let second = b.checkinSlots[b.checkinSlots.length - 1].status;

      if (first === second) { return 0; }

      if (first === null & second !== null) { return -1; }
      if (first !== null & second === null) { return 1; }
      if (first && second) { return 0; }
      if (first < second) { return 1; }
      if (first > second) { return -1; }
      return 0;
    });

    return myHabits;


  case SORT_HABITS_BY_SCORE:

    myHabits = Array.isArray(state) ? [...state] : [];

    myHabits.sort((a, b) => {
      if (!a.checkinSlots.length || !b.checkinSlots.length) {
        return 0;
      }
      let checkinRight = a.checkinSlots[a.checkinSlots.length - 1].score;
      let checkinLeft = b.checkinSlots[b.checkinSlots.length - 1].score;


      if (checkinLeft > checkinRight) {
        return 1;
      }
      if (checkinLeft < checkinRight) {
        return -1;
      }
      return 0;
    });

    return myHabits;

  case SORT_HABITS:



    return action.new_positions;



  case DO_CHECKIN:

    habits = state.slice(0);



    let updatedHabits = habits.map(function(habit) {
      if (habit.id === action.habit_id) {


        if (habit.checkins.findIndex(checkin => checkin.checkinFor === action.checkin.checkinFor) < 0) {
          let checkin = {};
          checkin.status = action.checkin.status;
          checkin.checkinFor = action.checkin.checkinFor;
          checkin.at = action.checkin.at;
          habit.checkins.push(checkin);
        }



        let checkins = habit.checkins.map(function(checkin) {
          if (checkin.checkinFor === action.checkin.checkinFor) {
            checkin.checkinFor = action.checkin.checkinFor;
            checkin.at = action.checkin.at;
            checkin.status = action.checkin.status;
            return checkin;
          }
          return checkin;
        });
        habit.checkins = checkins;

        habit.checkinSlots = calc_scores ? calculateScores(habit) : [];

      }
      return habit;
    });

    return updatedHabits;

  case REMOVE_HABIT:

    let data = state.slice(0);

    index = data.findIndex(habit => habit.id === action.habit_id);

    data[index].deleted = true;
    data[index].modified_at = new Date().getTime();


    return data;

  case 'NEW_HABIT_GOAL':

    data = state.slice(0);

    index = data.findIndex(habit => habit.id === action.habit_id);


    data[index].goals = data[index].goals ? data[index].goals : [];

    action.goal.modified_at = new Date().getTime();

    data[index].goals.push(action.goal);


    return data;


  case 'ARCHIVE_HABIT':

    data = state.slice(0);

    index = data.findIndex(habit => habit.id === action.habit_id);

    data[index].archived = action.date;
    data[index].modified_at = new Date().getTime();


    return data;

  default:
    return state;
  }
}

export default function habitsReducer(state = 0, action) {
  if (action.type === 'MULTI_ACTION') {
    let habits = action.actions.reduce((state, singular_action)=>{
      return habitReducer(state, singular_action, false);
    }, state);

    return habits.map(habit=>{
      habit.checkinSlots = hydrateScores(habit);
      return habit;
    });
  } else {
    return habitReducer(state, action);
  }
}
