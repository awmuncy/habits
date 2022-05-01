import React, { useState } from 'react';
import { connect } from 'react-redux';
import { getHabits } from '../lib/requests';
import { Habit } from '../store/ConnectedComponents.js';
import { SectionsConnected } from './Sections.tsx';

function HabitsComponent(props) {

  let habits = props.habits.slice();

  habits.sort(function(x, y) {
    x.sleep = x.sleep ? 1 : 0;
    y.sleep = y.sleep ? 1 : 0;
    return Number(x.sleep) - Number(y.sleep);
  });


  return (
    <div className='habit-list'>
      <SectionsConnected habits={habits} />
    </div>
  );
}


function HabitsProps(store, props) {
  return {
    habits: store.habits
  };
};

function HabitsDispatches(dispatch) {
  return {
    saveHabits: habits => {
      dispatch({type: 'SAVE_HABITS', habits});
    }
  };
}

const Habits = connect(HabitsProps, HabitsDispatches)(HabitsComponent);

export {
  Habits,
  HabitsComponent,
  HabitsDispatches,
  HabitsProps
};
