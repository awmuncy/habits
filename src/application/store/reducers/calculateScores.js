
import { parse, format } from 'date-fns';


const yyyymmdd = function(date) {
  let mm = date.getMonth() + 1; // getMonth() is zero-based
  let dd = date.getDate();

  return [date.getFullYear(),
    (mm > 9 ? '' : '0') + mm,
    (dd > 9 ? '' : '0') + dd
  ].join('-');
};



const createCheckinList = function(habit) {

  let checkinSlots = [];

  let formatted = format(new Date(habit.beginDate), 'MM-dd-yyyy');

  let calc_date = parse(formatted, 'MM-dd-yyyy', new Date());
  // calc_date.setMinutes(calc_date.getMinutes() + calc_date.getTimezoneOffset());


  switch (habit.profile.frame) {
  case 'weekly':
  case 'biweekly':
    while (calc_date.getDay() !== 0) {
      calc_date.setDate(calc_date.getDate() - 1);
    }
    break;

  case 'twicemonthly':
  case 'monthly':
  case 'bimonthly':
    calc_date.setDate(1);
    break;

  case 'quarterly':
    calc_date.setDate(1);
    while (![0, 3, 6, 9].includes(calc_date.getMonth())) {
      calc_date.setMonth(calc_date.getMonth() - 1);
    }
    break;

  case 'twiceannually':
    if (calc_date.getMonth() > 5) {
      calc_date.setDate(1);
      calc_date.setMonth(0);
    } else {
      calc_date.setDate(1);
      calc_date.setMonth(6);
    }
    break;
  case 'annually':
    calc_date.setMonth(0);
    calc_date.setDate(1);

    break;
  }

  let skip = (d) => {

    switch (habit.profile.frame) {
    case 'weekly':
      d.setDate(d.getDate() + 7);
      break;
    case 'biweekly':
      d.setDate(d.getDate() + 14);
      break;
    case 'twicemonthly':
      if (d.getDate() === 1) {
        d.setDate(15);
      } else {
        d.setMonth(d.getMonth() + 1);
        d.setDate(1);
      }

      break;
    case 'monthly':
      d.setDate(1);
      d.setMonth(d.getMonth() + 1);

      break;
    case 'bimonthly':
      d.setDate(1);
      d.setMonth(d.getMonth() + 2);
      break;

    case 'quarterly':
      d.setMonth(d.getMonth() + 3);


      break;
    case 'twiceannually':
      d.setMonth(d.getMonth() + 6);
      break;
    case 'annually':
      d.setDate(1);
      d.setMonth(0);
      d.setFullYear(d.getFullYear() + 1);
      break;

    default:
      d.setDate(d.getDate() + 1);
    }

    return d;
  };


  let base_date = habit.view_date ? parse(habit.view_date, 'MM-dd-yyyy', new Date()) : new Date();
  let d = calc_date;

  while (d <= base_date) {
    d = skip(d);

    let checkinSlot = {};
    checkinSlot.checkinFor = yyyymmdd(new Date(d));


    if (habit.profile.frame === 'days' && !habit.profile.pattern.includes(d.getDay())) {
      if (!habit.profile.bonus) {
        continue;
      } else {
        checkinSlot.bonus = true;
      }
    }

    checkinSlots.push(checkinSlot);
  }

  return checkinSlots;
};



function calculateScores(habit) {


  let checkinSlots = habit.checkinSlots;
  let checkins = habit.checkins;


  const calculateScoreFromProfile = (checkins, checkinSlots) => {


    function findSlotsScoreFromCheckins(slots, checkins) {
      let score = 0;

      slots.forEach((slot) => {
        let checkin = checkins.find(function(checkin) {

          if (checkin.checkinFor === slot.checkinFor) {
            return true;
          }
          return false;
        });

        slot.status = checkin ? checkin.status : null;

        if (checkin && checkin.status === true) {
          score++;
        } else if (!slot.bonus) {
          score--;
        }
      });

      return score;
    }


    let i = 0;



    let checkinSlotCalc = function(checkinSlot, slotKey, slots) {
      if (slots.length - 1 === slotKey) {

        let checkinSlot_l5 = checkinSlots.slice(slotKey - 4, slotKey + 1);
        let l5 = checkinSlot_l5.length ? findSlotsScoreFromCheckins(checkinSlot_l5, checkins) : null;
        checkinSlot.latest_five = l5 / 5;

        let checkinSlot_l15 = checkinSlots.slice(slotKey - 14, slotKey + 1);
        let l15 = checkinSlot_l15.length ? findSlotsScoreFromCheckins(checkinSlot_l15, checkins) : null;
        checkinSlot.latest_fifteen = l15 / 15;

        let checkinSlot_l30 = checkinSlots.slice(slotKey - 30, slotKey + 1);
        let l30 = checkinSlot_l30.length ? findSlotsScoreFromCheckins(checkinSlot_l30, checkins) : null;
        checkinSlot.latest_thirty = l30 / 30;
      }


      let checkin = checkins.find(function(checkin) {

        if (checkin.checkinFor === checkinSlot.checkinFor) {
          return true;
        }
        return false;
      });


      checkinSlot.status = checkin ? checkin.status : null;

      if (checkin && checkin.status === true) {
        i++;
      } else if (!checkinSlot.bonus && i > 0) {
        i--;
      }

      checkinSlot.score = i;
      return checkinSlot;
    };


    if (!Array.isArray(checkinSlots)) { checkinSlots = []; }
    let latestSlots = checkinSlots.map(checkinSlotCalc);

    return latestSlots;
  };

  let calc = calculateScoreFromProfile(checkins, checkinSlots);


  return calc;
}


const hydrateScores = habit => {

  let checkinSlots = createCheckinList(habit);

  habit.checkinSlots = checkinSlots;

  let calculatedScores = calculateScores(habit);

  return calculatedScores;
};

export {
  hydrateScores,
  calculateScores
};
