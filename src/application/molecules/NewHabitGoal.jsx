import React, { useState } from 'react';
import Datepicker from 'react-datepicker';
import { format } from 'date-fns';
import { GithubPicker } from 'react-color';
import { connect } from 'react-redux';
import { S_NewHabitGoal } from '../store/connectors.js';

function C_NewHabitGoal(props) {
  let [goalDate, setGoalDate] = useState(new Date());
  let [strength, setStrength] = useState(0);
  let [startingPoint, setStartingPoint] = useState(0);
  let [color, setColor] = useState('#111111');
  let [showFloatingPicker, setShowFloatingPicker] = useState(false);

  let floatingPickerClass = showFloatingPicker ? 'habit-goals--show' : '';

  let onNewHabitGoal = e => {
    e.preventDefault();
    props.newHabitGoal(props.habit_id, {
      strength     : strength,
      startingPoint: startingPoint,
      goalDate     : format(goalDate, 'yyyy-MM-dd'),
      color        : color
    });
  };

  return (

    <tr>
      <td className='habit-goals--new-goal'>
        <div className='habit-goals--color-picker'>
          {/* eslint-disable-next-line */}
          <div
            className='habit-goals--swatch'
            style={{backgroundColor: color}}
            onClick={e=>setShowFloatingPicker(!showFloatingPicker)}
          />
          <div
            className={'habit-goals--floating-picker ' + floatingPickerClass}>
            <GithubPicker
              color={color}
              onChangeComplete={(color)=>{
                setColor(color.hex);
                setShowFloatingPicker(false);
              }} />
          </div>
        </div>

      </td>
      <td>
        <Datepicker
          selected={goalDate}
          onChange={date=>setGoalDate(date)}
          withPortal
          dateFormat={'MMMM do yyyy'}
        />
      </td>
      <td>
        <input type='number' value={startingPoint} onChange={e=>setStartingPoint(e.target.value)} />
      </td>
      <td>
        <input type='number' value={strength} onChange={e=>setStrength(e.target.value)} />
      </td>
      <td><form onSubmit={onNewHabitGoal}><button><i className='fa fa-plus-circle'></i></button></form></td>
    </tr>
  );
}

let NewHabitGoal = connect(...S_NewHabitGoal)(C_NewHabitGoal);

export {
  NewHabitGoal
};
