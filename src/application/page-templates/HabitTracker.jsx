import React from 'react';
import { NavSide, GrandCentral } from '../store/ConnectedComponents.js';

function HabitTracker() {

  return (
    <div className='habit-tracker'>
      <GrandCentral />
      <NavSide />
    </div>
  );
}


export {
  HabitTracker
};
