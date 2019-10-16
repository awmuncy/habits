import moment from 'moment';


Date.prototype.yyyymmdd = function() {
  var mm = this.getMonth() + 1; // getMonth() is zero-based
  var dd = this.getDate();

  return [this.getFullYear(),
          (mm>9 ? '' : '0') + mm,
          (dd>9 ? '' : '0') + dd
         ].join('-');
};



const createCheckinList = function(habit) {

	var checkinSlots = [];

	var calc_date = new Date(Date.parse(habit.beginDate));
	calc_date.setMinutes(calc_date.getMinutes() + calc_date.getTimezoneOffset());
		

	switch(habit.profile.frame) {
		case "weekly":
		case "biweekly":
				while(calc_date.getDay()!=0) {
					calc_date.setDate(calc_date.getDate()-1);
				} 
			break;

		case "twicemonthly":
		case "monthly":
		case "bimonthly":
			calc_date.setDate(1);
			break;

		case "quarterly": 	
			calc_date.setDate(1);
			while(![0,3,6,9].includes(calc_date.getMonth())) {
				calc_date.setMonth(calc_date.getMonth() - 1);
			}
			break;

		case "twiceannually":
			if(calc_date.getMonth()>5) {
				calc_date.setDate(1);
				calc_date.setMonth(0);
			} else {
				calc_date.setDate(1);
				calc_date.setMonth(6);
			}
			break;
		case "annually": 
			calc_date.setMonth(0);
			calc_date.setDate(1);

			break;
	}

	let skip = (date) => {

		switch(habit.profile.frame) {
			case "weekly":
				d.setDate(d.getDate() + 7);
				break;
			case "biweekly":
				d.setDate(d.getDate() + 14);	
				break;
			case "twicemonthly": 
				if(d.getDate() == 1) {
					d.setDate(15);
				}  else {
					d.setMonth(d.getMonth() + 1);
					d.setDate(1);
				}

				break;
			case "monthly":
				d.setDate(1);
				d.setMonth(d.getMonth() + 1);

				break;
			case "bimonthly": 
				d.setDate(1);
				d.setMonth(d.getMonth() + 2);		
				break;

			case "quarterly": 
				d.setMonth(d.getMonth() + 3);


				break;
			case "twiceannually":
				d.setMonth(d.getMonth() + 6);
				break;
			case "annually":
				d.setDate(1);
				d.setMonth(0);
				d.setFullYear(d.getFullYear() + 1);
				break;

			default: 
				d.setDate(d.getDate() + 1);
		}
	}

	if(habit.view_date) {
		var zone = moment(habit.view_date, 'MM-DD-YYYY').toDate();
	} else {
		var zone = moment(moment().format('MM-DD-YYYY'), 'MM-DD-YYYY').toDate();
	}

	var my_zone_offset = zone.getTimezoneOffset();  

	var base_date = new Date(zone);

	for (var d = calc_date; d <= base_date; skip()) {

		let checkinSlot = {};
		checkinSlot.checkinFor = new Date(d).yyyymmdd();


		if(habit.profile.frame=="days" && !habit.profile.pattern.includes(d.getDay())) {
			if(!habit.profile.bonus) {
				continue;
			} else {
				checkinSlot.bonus=true;
			}
		}

		checkinSlots.push(checkinSlot);  
	}

	return checkinSlots;
}



function calculateScores(habit) {


	var checkinSlots = habit.checkinSlots;
	var checkins = habit.checkins;


	const calculateScoreFromProfile = (checkins, checkinSlots) => {


		function findSlotsScoreFromCheckins(slots, checkins) {
			var score = 0;

			slots.forEach((slot) => {
				let checkin = checkins.find(function(checkin) {

					if(checkin.checkinFor == slot.checkinFor) {
						return true;
					}
					return false;
				});

				slot.status = checkin ? checkin.status : null;

				if(checkin && checkin.status == true) {
					score++;
				} else if(!slot.bonus) {
					score--;
				}	
			});

			return score; 
		}


		var i = 0;



		var checkinSlotCalc = function(checkinSlot, slotKey, slots) {
			if (slots.length - 1 === slotKey) {		

				var checkinSlot_l5 = checkinSlots.slice(slotKey - 4, slotKey + 1);
				var l5 = checkinSlot_l5.length ? findSlotsScoreFromCheckins(checkinSlot_l5, checkins) : null;
				checkinSlot.latest_five = l5 / 5;

				var checkinSlot_l15 = checkinSlots.slice(slotKey - 14, slotKey + 1);
				var l15 = checkinSlot_l15.length ? findSlotsScoreFromCheckins(checkinSlot_l15, checkins) : null;
				checkinSlot.latest_fifteen = l15 / 15;

				var checkinSlot_l30 = checkinSlots.slice(slotKey - 30, slotKey + 1);
				var l30 = checkinSlot_l30.length ? findSlotsScoreFromCheckins(checkinSlot_l30, checkins) : null;
				checkinSlot.latest_thirty = l30 / 30;
			}
			

			let checkin = checkins.find(function(checkin) {

				if(checkin.checkinFor == checkinSlot.checkinFor) {
					return true;
				}
				return false;
			});


			checkinSlot.status = checkin ? checkin.status : null;

			if(checkin && checkin.status == true) {
				i++;
			} else if(!checkinSlot.bonus && i > 0) {
				i--;
			}

			checkinSlot.score = i;
			return checkinSlot;
		}


		if(!Array.isArray(checkinSlots)) checkinSlots = []; 
		var latestSlots = checkinSlots.map(checkinSlotCalc);

		return latestSlots;
	}

	var calc = calculateScoreFromProfile(checkins, checkinSlots)


	return calc;
}


const hydrateScores = habit => {
	
	var checkinSlots = createCheckinList(habit);

	habit.checkinSlots = checkinSlots;

	var calculatedScores = calculateScores(habit);

	return calculatedScores;
}

export {
	hydrateScores,
	calculateScores
};