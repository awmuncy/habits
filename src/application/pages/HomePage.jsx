import React from 'react';

import { FloatingActionButton } from '../molecules/FloatingActionButton';
import { Buckets } from '../molecules/Buckets';
import { HeaderDefault } from '../molecules/NavTop/HeaderDefault';
import { Habits } from '../organisms/Habits';


function HomePage() {

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
