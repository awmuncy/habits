import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createCheckin, sleepHabit } from '../lib/requests.js';
import { Checkin } from '../store/ConnectedComponents.js';

import NewCheckin from '../molecules/NewCheckin';
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

function VicesEssentials(props) {
  let statusIcon = ''; //  inTargetWindow(props.profile.interval, props.profile.targetWindow, props.checkins[0]);
  // let distToTimesUp = distToUrgent(props.profile.interval, props.profile.targetWindow, props.checkins[0]);

  let sleep = props.sleep ? 'sleep' : '';

  return (
    <div className={`essentials status-add ${sleep}`} onClick={e=>{ props.opener[1](!props.opener[0]); }}>
      <span className={`${statusIcon} aim status-icon `}>

      </span>
      <div className='title-and-type'>
        <h2>{props.title}</h2>
        <span className={`time-span ${statusIcon}`}>

        </span>
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
}



function HabitComponent(props) {

  let [open, setOpen] = useState(false);

  let windowClass = open ? 'open' : 'closed';
  let essentials = null;
  switch (props.profile.mode) {
  case 'footprints':
    essentials = <FootprintsEssentials {...props} opener={[open, setOpen]} />;
    break;
  case 'vices':
    essentials = <VicesEssentials {...props} opener={[open, setOpen]} />;
    break;
  }
  return (
    <div>
      {essentials}
      <div className={`checkin-window-wrapper ${windowClass}`}>
        <div className={`checkin-window ${windowClass}`}>
          <ul className='checkins'>
            <NewCheckin {...props} />
            {props.checkins.map(checkin => {
              return <Checkin checkin={checkin} habitId={props._id} />;
            })}
          </ul>
        </div>
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
