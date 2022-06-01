import React, { useState } from 'react';
import { inTargetWindow } from '../lib/timing.js';
import { Habit } from '../organisms/Habit';
import { connect } from 'react-redux';


function sortByPoints(habits:any) {

  let sections = {};

  habits.forEach(habit => {
    if (Array.isArray(sections[habit.profile.pointsPerDay])) {
      sections[habit.profile.pointsPerDay].push(habit);
    } else {
      sections[habit.profile.pointsPerDay] = [habit];
    }

  });


  let arraySection = Object.entries(sections);

  return arraySection;


}

function sortByCategories(habits) {

  let sections = {
    'Uncategorized': []
  };

  habits.forEach(habit => {
    if (Array.isArray(habit.categories) && habit.categories.length > 0) {
      habit.categories.forEach(category => {
        if (Array.isArray(sections[category])) {
          sections[category].push(habit);
        } else {
          sections[category] = [habit];
        }
      });
    } else {
      sections['Uncategorized'].push(habit);
    }


  });
  if (sections['Uncategorized'].length === 0) {
    delete sections['Uncategorized'];
  }

  let arraySection = Object.entries(sections);

  return arraySection;

}

interface TimingInterval {
  days: number
}

interface Profile {
  mode: string,
  targetWindow: TimingInterval,
  pointsPerDay: number,
  interval: TimingInterval
}

interface TypeHabit {
  title: string,
  checkins: Array<number>,
  _id: string,
  profile: Profile
}

function sortByStatus(habits: Array<TypeHabit>) {

  let sections = {};

  habits.forEach(habit => {
    let status;
    // if (habit?.profile.mode === 'vices') {
    //   status = 'Vice';
    // } else {
    //   status = inTargetWindow(habit.profile.interval, habit.profile.targetWindow, habit.checkins[0]);
    // }
    status = 'Blank';
    if (Array.isArray(sections[status])) {
      sections[status].push(habit);
    } else {
      sections[status] = [habit];
    }

  });

  return Object.entries(sections);

}

function sortByMode(habits: Array<TypeHabit>) {
  let sections = {};

  habits.forEach(habit => {
    let mode = "Blank";
    if (Array.isArray(sections[mode])) {
      sections[mode].push(habit);
    } else {
      sections[mode] = [habit];
    }

  });

  return Object.entries(sections);
}

function Sections(props) {

  let sortBy = props.sort[0];
  let sorted;

  switch (sortBy) {
  case 'points':
    sorted = sortByPoints(props.habits);
    break;
  case 'category':
    sorted = sortByCategories(props.habits);
    break;
  case 'status':
    sorted = sortByStatus(props.habits);
    break;

  case 'mode':
    sorted = sortByMode(props.habits);
    break;
  default:
    sorted = [['Habits', props.habits]];
    sorted = sortByMode(props.habits);

  }

  return sorted.map((section, key) => <Section key={section[0]} data={section} placement={key} />);
}


function Section(props) {
  let [isOpen, setIsOpen] = useState(props.placement === 0);
  const displayClass = isOpen ? 'open' : 'closed';

  return (
    <div className='habit-section'>
      <h2 onClick={()=>setIsOpen(!isOpen)}>{props.data[0]}</h2>
      <div className={`section-content ${displayClass}`} >
        {props.data[1].map(habit => {
          return <Habit key={habit.title} {...habit} />;
        })}
      </div>
    </div>
  );
}

export default Sections;



const SectionsConnected = connect(
  (store:any, props) => {
    return {
      sort: store.sort
    };
  },
  dispatch => {
    return {
      applySort: (spec) => {
        dispatch({type: 'SORT_BY', spec});
      }
    };
  }
)(Sections);
export { SectionsConnected };
