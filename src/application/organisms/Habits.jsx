import React, { Component } from 'react';
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';
import { Link } from 'react-router-dom';
import { PinnedHabits, Habit } from '../store/ConnectedComponents.js';
import { connect } from 'react-redux';
import { S_Habits } from '../store/connectors.js';

function filterHabits(habits, filters) {

  habits = habits.map(habit=>{
    if (filters.outstanding) {
      if (habit.checkinSlots[habit.checkinSlots.length - 1].status !== null) {
        habit.filtered_out = habit.filtered_out || true;
      }
    }
    if (filters.archived) {
      if (habit.deleted) {
        habit.filtered_out = habit.filtered_out || true;
      }
      if (habit.archived) {
        habit.filtered_out = habit.filtered_out || true;
      }
    }
    if (filters.archivedOnly) {

      if (habit.archived) {
        habit.filtered_out = false;
      } else {
        habit.filtered_out = true;
      }

    } else {
      if (habit.archived) {
        habit.filtered_out = true;
      }
    }

    return habit;
  });

  return habits;
}

/* eslint-disable-next-line */
const SortableHabit = SortableElement(({habit}) =>
  <Habit id={habit.id} />
);

/* eslint-disable-next-line */
const SortableHabits = SortableContainer(({habits}) => {

  if (!Array.isArray(habits)) { habits = []; }


  return (
    <div className='habit-list'>
      {habits.map((habit, index) =>
        <SortableHabit key={habit.id} index={index} habit={habit} />
      )}
    </div>
  );
});


class C_Habits extends Component {

  constructor(props) {
    super(props);
    this.onSortEnd = this.onSortEnd.bind(this);
    this.state = {
      habits: props.habits
    };
  }

  onSortEnd({oldIndex, newIndex}) {
    let habitlist = arrayMove(this.props.habits, oldIndex, newIndex);

    habitlist.map(function(item, key) {
      item.filtered_out = false;
      item.position = key;
      return item;
    });

    this.props.sortHabits(habitlist);
  }

  static getDerivedStateFromProps(props, state) {

    props.view_date;

    state.habits = state.habits ? state.habits : [];

    state.habits.map(function(item, key) {
      item.filtered_out = false;
      item.position = key;
      return item;
    });


    let filters = {
      outstanding : props.filters.includes('outstanding') || false,
      archived    : props.archived || false,
      archivedOnly: props.archivedOnly
    };

    return {
      habits: filterHabits(props.habits, filters)
    };
  }



  render() {

    let hasShowing = !(this.state.habits.filter(habit=>!habit.filtered_out).length > 0);

    if (this.state.habits.length === 0 || hasShowing) {
      let message = this.props.archivedOnly ? 'Looks like you don\'t have any archived habits'
        : 'Looks like you don\'t have any active habits. Go ahead and make one!';
      return (
        <div className='no-habits'>
          <p>{message}</p>
          <button className='btn btn--primary'>
            <Link to='/new-habit'>
                            Make a new habit!
            </Link>
          </button>
        </div>
      );
    }

    return (

      <div className='my-habits'>
        <PinnedHabits />
        <SortableHabits
          habits={this.state.habits}
          helperClass='SortableHelper'
          lockAxis='y'
          useDragHandle={true}
          pressDelay={200}
          onSortEnd={this.onSortEnd.bind(this)}
        />
      </div>

    );
  }
}

let Habits = connect(...S_Habits)(C_Habits);

export {
  Habits
};
