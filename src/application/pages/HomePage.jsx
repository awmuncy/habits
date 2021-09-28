import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import { Habits, Sorting, HeaderDefault, FloatingActionButton } from '../store/ConnectedComponents.js';
import Permission from '../atoms/Permission.jsx';


function HomePage(props) {

  document.title = 'Home | HabitsApp';


  return (
    <>
      <HeaderDefault />
      <main>
        <div className='home-layout'>
          <Sorting />
          <div className='home-main'>
            <Habits />
          </div>
        </div>
        <FloatingActionButton />
      </main>
    </>
  );
}

export default HomePage;
