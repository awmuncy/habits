import React from 'react';
import { Goals, CoreValues, PinnedHabits, Habits, Sorting, RandomCoreValue } from '../../../store/ConnectedComponents';



function ArchivedHabitsPage(props) {

  document.title = "Home | HabitsApp";


  return (	
    <div className="home-layout">
      <div className="home-main">
        <Habits archivedOnly={true} />
      </div>
    </div>
  );
}

export default ArchivedHabitsPage;