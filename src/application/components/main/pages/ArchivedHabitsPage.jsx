import React from 'react';
import { Habits, HeaderDefault } from '../../../store/ConnectedComponents';



function ArchivedHabitsPage(props) {

  document.title = "Home | HabitsApp";


  return (	
    <>
    <HeaderDefault />
    <div className="home-layout">
      <div className="home-main">
        <Habits archivedOnly={true} />
      </div>
    </div>
    </>
  );
}

export default ArchivedHabitsPage;