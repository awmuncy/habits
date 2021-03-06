import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory, Redirect } from 'react-router-dom';
import Permission from '../../atoms/Permission.jsx';
import { S_ClosePane } from '../../store/connectors.js';

let C_ClosePane = props => {
  let [deleted, deleteThis] = useState(false);
  if (deleted) { return <Redirect to={'/home'} />; }

  let history = useHistory();
  let habit = props.id;
  let pin_icon;
  if (props.pinned_habits.includes(habit)) {
    /* eslint-disable-next-line */
    pin_icon = <div onClick={()=>props.unpin(habit)}>Unpin</div>;
  } else if (props.pinned_habits.length === 3) {
    pin_icon = '';
  } else {
    /* eslint-disable-next-line */
    pin_icon = <i className='fa fa-thumb-tack' onClick={()=>props.pin(habit)}></i>;
  }

  let deleteHabit = () => {
    if (confirm('Delete habit: are you sure? This operation cannot be undone.')) {
      if (confirm('You seem pretty sure. Seriously, delete?')) {
        props.removeHabit(habit);
        deleteThis(true);
      }
    }
  };

  return (
    <header className='app-header'>
      <nav className='top-left-action-button header-nav'>
        <i onClick={()=>history.goBack()} className='fa fa-arrow-left' aria-hidden='true'></i>
        <div className='ricons'>
          <i
            onClick={()=>{ if (confirm('Archive habit?')) { props.archiveHabit(habit); } }}
            className='fa fa-archive'
            aria-hidden='true' ></i>
          <i onClick={deleteHabit} className='fa fa-trash' aria-hidden='true'></i>

          <Permission feature='pinned-habits'>
            {pin_icon}
          </Permission>
        </div>
      </nav>
    </header>
  );
};

let ClosePane = connect(...S_ClosePane)(C_ClosePane);

export {
  ClosePane
};
