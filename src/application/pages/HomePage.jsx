import React from 'react';

import { Habits, HeaderDefault, FloatingActionButton, Buckets } from '../store/ConnectedComponents.js';


let user = localStorage.getItem('id');
let bearer = localStorage.getItem('mySecretToken');




function HomePage(props) {

  document.title = 'Home | HabitsApp';


  return (
    <>
      <HeaderDefault />
      <main>
        <div className='home-layout'>
          <div className='sidebar'>
            <Buckets />
          </div>
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
