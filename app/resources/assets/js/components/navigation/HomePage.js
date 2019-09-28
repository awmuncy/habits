import React, { Component } from 'react';

import { Goals, CoreValues, PinnedHabits } from '../../store/ConnectedComponents';


function HomePage(props) {

  document.title = "Home | HabitsApp";

  return (	
    <div className="home-layout">
      <div className="home-main">
        <h2>Pinned Habits</h2>
        <PinnedHabits />
      </div>
      <div className="home-main">
        <h2>Goals</h2>
        <Goals />
      </div>
      <div className="home-main">
        <h2>CoreValues</h2>
        <CoreValues />
      </div>
    </div>
  );
}

export default HomePage;