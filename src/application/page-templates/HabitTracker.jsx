import React from 'react';
import { GrandCentral } from './GrandCentral';
import { NavSide } from '../organisms/NavSide';

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
