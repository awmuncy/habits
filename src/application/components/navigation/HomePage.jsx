import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import { Goals, CoreValues, PinnedHabits, Habits, Sorting, RandomCoreValue } from '../../store/ConnectedComponents';


function HomePage(props) {

  document.title = "Home | HabitsApp";


  return (	
    <div className="home-layout">
      <Sorting />
      <div className="home-main">
        <RandomCoreValue />
      </div>
      <div className="home-main">
        
          <h2><Link to={"/goals"}>Goals</Link></h2>
        
        <Goals hide={["past_completed"]} />
      </div>
      <div className="home-main">
        <h2><Link to={"/goals"}>Habits</Link></h2>
        <Habits />
      </div>
    </div>
  );
}

export default HomePage;