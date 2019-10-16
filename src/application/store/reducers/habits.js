import { calculateScores, hydrateScores } from "./calculateScores.js";
import { NEW_HABIT, REMOVE_HABIT, HYDRATE_PAGE, RECALCULATE_SCORES, CLEAR_FILTERS, SORT_HABITS_BY_STATUS, SORT_HABITS_BY_SCORE, SORT_HABITS, DO_CHECKIN } from '../../../actions';

export default function habits(state = 0, action) {


	switch(action.type) {

		case HYDRATE_PAGE:

			return action.payload.habits;

		case RECALCULATE_SCORES:

			var habits = state.slice(0);

			var calcedHabits = habits.map((habit) => {
				habit.view_date = action.view_date;
				habit.checkinSlots = hydrateScores(habit);
				habit.view_date = undefined;
				return habit;
			});		

			return calcedHabits;

		case NEW_HABIT:
			var createdHabit = {};
			createdHabit.title = action.habit.title;

			createdHabit.id = action.habit.id;
			createdHabit.beginDate = action.habit.beginDate;
			createdHabit._id = createdHabit.id;


			if(typeof action.habit.profile === 'string' && action.habit.profile.charAt(0)=="{") {
				action.habit.profile = JSON.parse(action.habit.profile);
			}

			createdHabit.profile = action.habit.profile;


			createdHabit.checkins = action.habit.checkins;
			
			
			createdHabit.checkinSlots = hydrateScores(createdHabit);
			
			var habits = Array.isArray(state) ? state.slice(0) : [];
			

			habits.push(createdHabit);

			return habits;

		

		case CLEAR_FILTERS:
			var cleared = [...state].map(function(habit){
				habit.filtered_out = false;
				return habit;
			});

			return cleared;

		case SORT_HABITS_BY_STATUS:

			var myHabits = Array.isArray(state) ? [...state] : [];

			myHabits.sort((a, b) => {
		    if(!a.checkinSlots.length || !b.checkinSlots.length) {
		        return 0;
		    }
		    let first = a.checkinSlots[a.checkinSlots.length - 1].status;
		    let second = b.checkinSlots[b.checkinSlots.length - 1].status;

		    if(first===second) return 0;

		    if(first===null&second!==null) return -1;
		    if(first!==null&second===null) return 1;
		    if(first&&second) return 0;
		    if(first<second) return 1;
		    if(first>second) return -1;		   
		    return 0;
			});

			return myHabits;


		case SORT_HABITS_BY_SCORE:

			var myHabits = Array.isArray(state) ? [...state] : [];

			myHabits.sort((a, b) => {
		    if(!a.checkinSlots.length || !b.checkinSlots.length) {
		        return 0;
		    }
		    let checkinRight = a.checkinSlots[a.checkinSlots.length - 1].score;
		    let checkinLeft = b.checkinSlots[b.checkinSlots.length - 1].score;


		    if(checkinLeft>checkinRight) {
		        return 1;
		    }
		    if(checkinLeft<checkinRight) {
		        return -1;
		    }
		    return 0;
			});

			return myHabits;

		case SORT_HABITS: 



			return action.new_positions;



		case DO_CHECKIN:

			var habits = state.slice(0);

			

			var updatedHabits = habits.map(function(habit) {
				if(habit.id==action.habit_id) {


					if(habit.checkins.findIndex(checkin => checkin.checkinFor == action.checkin.checkinFor)<0) {
						let checkin = {};
						checkin.status = action.checkin.status;
						checkin.checkinFor = action.checkin.checkinFor;
						checkin.at = action.checkin.at;
						habit.checkins.push(checkin);
					}

					

					var checkins = habit.checkins.map(function(checkin){
						if(checkin.checkinFor==action.checkin.checkinFor) {
							checkin.checkinFor = action.checkin.checkinFor;
							checkin.at = action.checkin.at;
							checkin.status = action.checkin.status;
							return checkin;
						}
						return checkin;
					});
					habit.checkins = checkins;
					
					habit.checkinSlots = calculateScores(habit);

				}
				return habit;
			});

			return updatedHabits;

		case REMOVE_HABIT:

      		var data = state.slice(0);

			var index = data.findIndex(habit => habit.id==action.habit_id);

			data[index].deleted = true;
			data[index].modified_at = new Date().getTime();


      		return data;


		default: 
			return state;
	}
}