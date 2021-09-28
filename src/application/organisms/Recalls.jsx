import React from 'react';
import { connect } from 'react-redux';
import { RecallCard } from '../store/ConnectedComponents.js';
import { differenceInCalendarDays, addDays } from 'date-fns';

let testDays = [
  {day      : 'Today',
    reminders: [
      {title: 'Hello!'}
    ]},
  {day      : 'Tomorrow',
    reminders: [
      {title: 'Another one1'},
      {title: 'Another one2'},
      {title: 'Another one3'},
      {title: 'Another one4'},
      {title: 'Another one5'},
      {
        title : 'Another one6',
        prompt: 'Remember X?',
        body  : 'Hello there!',
        link  : 'https://www.allenmuncy.com'
      }

    ]},
  {day      : 'Overmorrow1',
    reminders: [
      {title: 'Another one'}
    ]},
  {day      : 'Overmorrow2',
    reminders: [
      {title: 'Another one'}
    ]},
  {day      : 'Overmorrow3',
    reminders: [
      {title: 'Another one'}
    ]},
  {day      : 'Overmorrow5',
    reminders: [
      {title: 'Another one'}
    ]},
  {day      : 'Overmorrow6',
    reminders: [
      {title: 'Another one'}
    ]}
];

const fibonacci_series = function(n) {
  if (n <= 0) {
    return [0];
  }
  if (n === 1) {
    return [0, 1];
  } else {
    let s = fibonacci_series(n - 1);
    s.push(s[s.length - 1] + s[s.length - 2]);
    return s;
  }
};

function findCurrentLevel(completions) {

  let level = completions.reduce((prev, current, index) => {
    let level = prev;
    if (current) {
      level++;
    } else {
      level--;
    }
    return level;
  }, 0);


  let fibArray = fibonacci_series(level);

  return fibArray[fibArray.length - 1];

}

function RecallsDaysComponent(props) {
  return (
    <div className='recall-column'>
      <h2>{props.day}</h2>
      {props.reminders.map((card, key) => {
        return <RecallCard key={card.title} {...card} />;
      })}
    </div>
  );
};

function RecallsComponent(props) {

  let i = 0;

  let days = [];

  props.recalls.forEach(recall => {
    let level = findCurrentLevel(recall.completions || []);
    let day = level - differenceInCalendarDays(new Date(), addDays(new Date(), i));
    if (day < 0) { return; }
    if (i < 2) {
      i++;
    }

    days[day] ? days[day].reminders.push(recall) : days[day] = {day, reminders: [recall]};
  });



  return (
    <div className='recalls-container'>
      {days.map((day, key) => {
        return <RecallsDaysComponent key={day.day} {...day} />;
      })}
    </div>
  );
}

import RecallsConnector from '../store/connections/Recalls.js';

let Recalls = connect(...RecallsConnector)(RecallsComponent);

export {
  Recalls,
  RecallsComponent
};
