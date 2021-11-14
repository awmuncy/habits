import { formatDistance } from 'date-fns/esm';
import React from 'react';
import { connect } from 'react-redux';
import { deleteCheckin } from '../lib/requests';


function CheckinComponent(props) {
  let {checkin, habitId} = props;
  return (
    <li className='checkin'>
      {formatDistance(new Date(checkin), new Date())}
      <div onClick={e => deleteCheckin(checkin, habitId) }><i className='fa fa-trash'></i></div>
    </li>
  );
}

function CheckinProps(store, props) {

  return {};
}

function CheckinDispatches(dispatch) {
  return {};
}

const Checkin = connect(CheckinProps, CheckinDispatches)(CheckinComponent);

export {
  Checkin,
  CheckinComponent,
  CheckinProps,
  CheckinDispatches
};
