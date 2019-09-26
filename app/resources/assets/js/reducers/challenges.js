import calculateScores from "./calculateScores.js";


export default function challenges(state = 0, action) {


	switch(action.type) {

		case "RECALCULATE_SCORES":

			if(!Array.isArray(state)) {
				state = [];
			}

			var calcedChallenges = state.map((challenge) => {
				challenge.view_date = action.view_date;
				challenge.checkinSlots = calculateScores(challenge, action.view_date);
				return challenge;
			});		

			return calcedChallenges;
		case "SYNC_CHALLENGES": 

			var calcedChallenges = action.challenges.map((challenge) => {
				challenge.checkinSlots = calculateScores(challenge);
				return challenge;
			});

			return calcedChallenges;
		
		case "SYNC_HABITS": 

			var habits = action.habits.map((habit) => {
				habit.profile = {
					frame: "days",
					pattern: [0, 1, 2, 3, 4, 5, 6]
				};
				habit.view_date = new Date();
				habit.id = habit._id;
				habit.beginDate = habit.beginDate;
				habit.checkinSlots = calculateScores(habit);
				return habit;
			});

			return habits;

		case "HABIT_ID_ISSUE":
			var challenges = state.map(function(challenge){
				if(challenge.id==action.old_id) {
					challenge.id=action.new_id;
				}
				return challenge;
			});
			return challenges;
		case "NEW_CHALLENGE":
			var createdChallenge = {};
			createdChallenge.title = action.challenge.title;

			createdChallenge.id = action.challenge.id ? action.challenge.id : Math.floor(Math.random() * Math.floor(999999));
			createdChallenge.position = 0;
			createdChallenge.beginDate = action.challenge.beginDate;
			createdChallenge._id = createdChallenge.id;


			if(typeof action.challenge.profile === 'string' && action.challenge.profile.charAt(0)=="{") {
				action.challenge.profile = JSON.parse(action.challenge.profile);
			}

			createdChallenge.profile = action.challenge.profile;


			createdChallenge.checkins = [];
			createdChallenge.checkinSlots = calculateScores(createdChallenge);
			
			var challenges = Array.isArray(state) ? state.slice(0) : [];
			

			challenges.push(createdChallenge);

			return challenges;

		

		case "CLEAR_FILTERS":
			var cleared = [...state].map(function(challenge){
				challenge.filtered_out = false;
				return challenge;
			});

			return cleared;

		case "SORT_CHALLENGES_BY_STATUS":

			var myChallenges = Array.isArray(state) ? [...state] : [];

			myChallenges.sort((a, b) => {
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

			return myChallenges;


		case "SORT_CHALLENGES_BY_SCORE":

			var myChallenges = Array.isArray(state) ? [...state] : [];

			myChallenges.sort((a, b) => {
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

			return myChallenges;

		case "SORT_CHALLENGES": 



			return action.new_positions;

	

		case "CHECKIN_UPDATE_NOTE":
			var challenges = state.slice(0);

			updatedChallenges = challenges.map(function(challenge) {
				if(challenge.id==action.habit_id) {
					if(challenge.checkins.findIndex(checkin => checkin.checkinFor == action.checkinFor)<0) {
						let checkin = {};
						checkin.status = null;
						checkin.checkinFor = action.checkinFor;
						checkin.at = action.at;
						checkin.note = action.note;
						challenge.checkins.push(checkin);
					}

					var checkins = challenge.checkins.map(function(checkin){
						if(checkin.checkinFor==action.checkinFor) {
							checkin.note = action.note;
							checkin.at = action.at;
						}
						return checkin;
					});
					challenge.checkins = checkins;
					challenge.checkinSlots = calculateScores(challenge);
				}
				return challenge;
			});


			return updatedChallenges;

			case "STORE_CHECKINS":

				var challenges = state.slice(0);
	
				var checkins = action.checkins;

				checkins.forEach(function(newCheckin){

					challenges = challenges.map(function(challenge) {
						var date = newCheckin.checkinFor;
						var habit_id = newCheckin.habit_id;
						var status = newCheckin.status;
						var at = newCheckin.at;


						if(challenge.id==habit_id) {
		
		
							if(challenge.checkins.findIndex(checkin => checkin.checkinFor == date)<0) {
								let checkin = {};
								checkin.status = status;
								checkin.checkinFor = date;
								checkin.at = at;
								challenge.checkins.push(checkin);
							}
		
							var checkins = challenge.checkins.map(function(checkin){
								if(checkin.checkinFor==date) {
									if(status==true) {
										checkin.status=true;
									} else {
										checkin.status=false;
									}
									checkin.at = at;
									checkin.status = status;
									return checkin;
								}
								return checkin;
							});
							challenge.checkins = checkins;
		
						}
						return challenge;
					});


				});

				var hello = challenges.map((challenge)=>{
					challenge.checkinSlots = calculateScores(challenge);
					return challenge;
				});


	
				return hello;



			case "DO_CHECKIN":

			var challenges = state.slice(0);



			var hello = challenges.map(function(challenge) {
				if(challenge.id==action.habit_id) {


					if(challenge.checkins.findIndex(checkin => checkin.checkinFor == action.checkinFor)<0) {
						let checkin = {};
						checkin.status = action.status;
						checkin.checkinFor = action.checkinFor;
						checkin.at = action.at;
						challenge.checkins.push(checkin);
					}

					var checkins = challenge.checkins.map(function(checkin){
						if(checkin.checkinFor==action.checkinFor) {
							checkin.checkinFor = action.checkinFor;
							checkin.at = action.at;
							checkin.status = action.status;
							return checkin;
						}
						return checkin;
					});
					challenge.checkins = checkins;
					challenge.checkinSlots = calculateScores(challenge);

				}
				return challenge;
			});

			return hello;

		case "REMOVE_CHALLENGE":

      var data = state.slice(0);

      for(var i = 0; i < data.length; i++) {
          if(data[i].id == action.habit_id) {
              //data.splice(i, 1);
              data[i].deleted = true;
              break;
          }
      }

      return data;


		default: 
			return state;
	}
}