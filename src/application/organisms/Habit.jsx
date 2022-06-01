import React, { useState } from 'react';

import { sleepHabit } from '../lib/requests.js';
import { Checkin } from '../molecules/Checkin';

import NewCheckin from '../molecules/NewCheckin';
import { distToUrgent, intervalToString, inTargetWindow } from '../lib/timing';


function FootprintsEssentials(props) {



  let statusIcon = inTargetWindow(props.interval, props.target, props.checkins[0]?.[1]);
  let distToTimesUp = distToUrgent(props.interval, props.target, props.checkins[0]?.[1]);

  let sleep = props.sleep ? 'sleep' : '';

  return (
    <div className={`essentials status-add ${sleep}`} onClick={e=>{ props.opener[1](!props.opener[0]); }}>
      <span className={`${statusIcon} aim status-icon `}>

      </span>
      <div className='title-and-type'>
        <h2>{props.title}</h2>
        <span className={`time-span ${statusIcon}`}>
          <span className='interval'>{intervalToString(props.interval)}</span>
          ||
          <span className='target'> {intervalToString(props.target, true)}</span> target window
          || 
          {distToTimesUp}
        </span>
      </div>
      <div className='meta'>
        <span className='idk'>
          <i className='fa fa-moon-o' onClick={async(e) => {
            let checkinResponse = await sleepHabit(props._id);
          }}></i>
        </span>
        {/* <span><i className='fa fa-plus'></i>{props.profile.pointsPerDay}</span> */}
      </div>
    </div>
  );
};

function VicesEssentials(props) {
  let statusIcon = ''; //  inTargetWindow(props.profile.interval, props.profile.targetWindow, props.checkins[0]);
  // let distToTimesUp = distToUrgent(props.profile.interval, props.profile.targetWindow, props.checkins[0]);

  let sleep = props.sleep ? 'sleep' : '';

  return (
    <div
      className={`essentials status-add ${sleep}`}
      onClick={e=>{ props.opener[1](!props.opener[0]); }}
      id={`habit-${props.id}`}>
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
        <span><i className='fa fa-plus'></i>{props.profile?.pointsPerDay}</span>
      </div>
    </div>
  );
}



function Habit(props) {

  let [open, setOpen] = useState(false);

  let windowClass = open ? 'open' : 'closed';
  let essentials = null;
  let mode = props?.profile?.mode || props.mode;
  switch (mode) {
  case 'footprints':
    essentials = <FootprintsEssentials {...props} opener={[open, setOpen]} />;
    break;
  case 'vices':
  case null:
  case undefined:
  case false:
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
            {props.checkins?.map((checkin, key) => {
              return <Checkin key={checkin} checkin={checkin} habitId={props.id} />;
            })}
          </ul>
        </div>
      </div>
    </div>
  );

}

export {
  Habit
};
