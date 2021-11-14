import React, { Component, useState } from 'react';
import { createCheckin, deleteCheckin, getHabits } from '../lib/requests.js';

import { Habits, HeaderDefault, FloatingActionButton, Checkin } from '../store/ConnectedComponents.js';


let user = localStorage.getItem('id');
let bearer = localStorage.getItem('mySecretToken');




function HomePage(props) {

  document.title = 'Home | HabitsApp';


  return (
    <>
      <HeaderDefault />
      <main>
        <div className='home-layout'>
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
