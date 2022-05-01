import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createCheckin, sleepHabit } from '../lib/requests.js';
import { Checkin } from '../store/ConnectedComponents.js';


import { distToUrgent, intervalToString, inTargetWindow } from '../lib/timing';


function FootprintsEssentials(props) {



  let statusIcon = inTargetWindow(props.profile.interval, props.profile.targetWindow, props.checkins[0]);
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
