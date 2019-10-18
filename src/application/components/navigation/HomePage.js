import React, { Component } from 'react';

import { Goals, CoreValues, PinnedHabits, Habits, Sorting } from '../../store/ConnectedComponents';


function HomePage(props) {

  document.title = "Home | HabitsApp";


  return (	
    <div className="home-layout">
      <Sorting />
      <div className="home-main">
        <h2>CoreValues</h2>
        <CoreValues />
      </div>
      <div className="home-main">
        <h2>Goals</h2>
        <Goals />
      </div>
      <div className="home-main">
        <h2>Habits</h2>
        <Habits />
      </div>
    </div>
  );
}

export default HomePage;