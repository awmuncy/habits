import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import { Goals, CoreValues, PinnedHabits, Habits, Sorting, RandomCoreValue } from '../../store/ConnectedComponents';
import Permission from './Permission';


function HomePage(props) {

  document.title = "Home | HabitsApp";


  return (	
    <div className="home-layout">
      <Sorting />
      <Permission feature="core-values">
      <div className="home-main">
        <RandomCoreValue />
      </div>
      </Permission>
      <Permission feature="goals">
      <div className="home-main">
        
          <h2><Link to={"/goals"}>Goals</Link></h2>
        
        <Goals hide={["past_completed"]} />
      </div>
      </Permission>
      <div className="home-main">
        <Habits />
      </div>
    </div>
  );
}

export default HomePage;