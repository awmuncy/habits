import React, { Component } from 'react';
import { SortableHandle } from 'react-sortable-hoc';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Essentials } from '../store/ConnectedComponents.js';
import { S_Habit } from '../store/connectors.js';


class C_Habit extends Component {


  render() {

    let hide = this.props.habit.filtered_out;
    let id = this.props.id;

    if (hide || this.props.pinned_habits.includes(id.toString())) {
      return <div></div>;
    }

    if (!this.props.habit) { return null; }

    // eslint-disable-next-line
    const SortHandle = SortableHandle(() =>
      <Link to={'habit/' + id}>
        <Essentials habit_id={id} />
      </Link>
    );

    return (
      <div className='single-habit' id={'habit-' + id}>
        <SortHandle />
      </div>
    );
  }
}

const Habit = connect(...S_Habit)(C_Habit);

export {
  Habit
};
