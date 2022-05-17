import React from 'react';
import { useSelector } from 'react-redux';

import { SectionsConnected } from './Sections.tsx';

function Habits(props) {

  let habits = useSelector(store=>store.habits).slice();

  habits.sort(function(x, y) {
    let xsleep = x.sleep ? 1 : 0;
    let ysleep = y.sleep ? 1 : 0;
    return Number(xsleep) - Number(ysleep);
  });


  return (
    <div className='habit-list'>
      <SectionsConnected habits={habits} />
    </div>
  );
}

export { Habits };
