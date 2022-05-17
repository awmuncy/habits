import React from 'react';

import { HeaderDefault } from '../molecules/NavTop/HeaderDefault';
import { Habits } from '../organisms/Habits';

function HabitsPage() {

  document.title = 'Habits | HabitsApp';

  return (
    <>
      <HeaderDefault />
      <div className='home-layout'>
        <Habits />
      </div>
    </>
  );
}

export default HabitsPage;
