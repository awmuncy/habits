import { isBefore } from 'date-fns';
import { formatDistance } from 'date-fns/esm';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createCheckin, sleepHabit } from '../lib/requests';
import { Checkin } from '../store/ConnectedComponents.js';


const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

const intervalCount = interval => {
  let mills = 0;

  mills += interval.days * DAY;
  mills += interval.hours * HOUR;
  mills += interval.minutes * MINUTE;
  mills += interval.seconds * SECOND;

  return mills;
};

const distToUrgent = function(interval, targetWindow, checkin) {
  let totalMills = intervalCount(interval);
  let targetMills = intervalCount(targetWindow);
  checkin = checkin || 0;
  let timesUp = new Date(checkin + totalMills + targetMills);

  if (isBefore(timesUp, new Date())) {
    return 'Time is up';
  }

  return formatDistance(new Date(), timesUp);
};

const window = function inTargetWindow(interval, targetWindow, checkin) {


  let now = new Date().getTime();
  let distanceBetweenMoments = now - checkin;

  let abide = intervalCount(interval);
  let target = intervalCount(targetWindow) + abide;


  switch (true) {

  case distanceBetweenMoments < abide:
    return 'abide';
  case distanceBetweenMoments < target:
    return 'target';
  default:
    return 'urgent';

  }

};

function intervalToString(interval, removeS = false) {
  let outputString = '';
  for (let timePeriod in interval) {
    let i = 0;
    if (interval[timePeriod] !== 0 && timePeriod !== '_id') {
      if (i > 0) { outputString += ', '; }
      outputString += interval[timePeriod] + ' ';
      outputString += removeS ? timePeriod.slice(0, -1) : timePeriod;
      i++;
    }
  }

  return outputString + ' ';
}

function FootprintsEssentials(props) {



  let statusIcon = window(props.profile.interval, props.profile.targetWindow, props.checkins[0]);
  let distToTimesUp = distToUrgent(props.profile.interval, props.profile.targetWindow, props.checkins[0]);

  let sleep = props.sleep ? 'sleep' : '';

  return (
    <div className={`essentials status-add ${sleep}`} onClick={e=>{ props.opener[1](!props.opener[0]); }}>
      <span className={`${statusIcon} aim status-icon `}>

      </span>
      <div className='title-and-type'>
        <h2>{props.title}</h2>
        <span className={`time-span ${statusIcon}`}>
          <span className='interval'>{intervalToString(props.profile.interval)}</span>
          ||
          <span className='target'> {intervalToString(props.profile.targetWindow, true)}</span> target window
          || {distToTimesUp}
        </span>
        {/* <span className='grace-period-expires'>
          Target window ends in three hours.
          Shows up 3/4 through grace period
        </span> */}
      </div>
      <div className='meta'>
        <span className='idk'>
          <i className='fa fa-moon-o' onClick={async(e) => {
            let checkinResponse = await sleepHabit(props._id);
          }}></i>
        </span>
        <span><i class='fa fa-plus'></i>{props.profile.pointsPerDay}</span>
      </div>
    </div>
  );
};

function HabitComponent(props) {

  let [open, setOpen] = useState(false);

  let windowClass = open ? '' : 'closed';
  return (
    <div>
      <FootprintsEssentials {...props} opener={[open, setOpen]} />
      <div className={`checkin-window ${windowClass}`}>
        <ul className='checkins'>
          <li className='checkin'>
            <h2 className='title'><span className='focus'>New Checkin</span></h2>
            <span className='score'>+</span>

            <button
              aria-label='Yes, I did check in'
              className='check-yes'
              onClick={async(e) => {
                let checkinResponse = await createCheckin(props._id);
              }}
            ></button>
            <button
              aria-label='No, I did not check in'
              className='check-time'
            ></button>
          </li>
          {props.checkins.map(checkin => {
            return <Checkin checkin={checkin} habitId={props._id} />;
          })}
        </ul>
      </div>
    </div>
  );

}

function HabitProps(store, props) {
  let habit_position = store.habits.findIndex(function(habit) {
    if (habit._id === props._id) {
      return true;
    }
    return false;
  });
  return {
    checkins: store.habits[habit_position].checkins
  };
}

function HabitDispatches() {
  return {};
}

const Habit = connect(HabitProps, HabitDispatches)(HabitComponent);

export {
  Habit,
  HabitComponent,
  HabitProps,
  HabitDispatches
};
