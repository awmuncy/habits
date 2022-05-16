import React, { useState } from 'react';
import { inTargetWindow } from '../lib/timing.js';
import { Habit } from '../store/ConnectedComponents.js';
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
    if (habit.profile.mode === 'vices') {
      status = 'Vice';
    } else {
      status = inTargetWindow(habit.profile.interval, habit.profile.targetWindow, habit.checkins[0]);
    }
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
    let mode = habit.profile.mode;
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

  return sorted.map(section => <Section data={section} />);
}


function Section(props) {
  let [isOpen, setIsOpen] = useState(false);
  const displayClass = isOpen ? 'open' : 'closed';

  return (
    <div className='habit-section'>
      <h2 onClick={()=>setIsOpen(!isOpen)}>{props.data[0]}</h2>
      <div className={`section-content ${displayClass}`} >
        {props.data[1].map(habit => {
          return <Habit {...habit} />;
        })}
      </div>
    </div>
  );
}

export default Sections;

let connections = [
  (store, props) => {
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
];

const SectionsConnected = connect(...connections)(Sections);
export { SectionsConnected };
