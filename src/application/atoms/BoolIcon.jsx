import React from 'react';


function BoolIcon(props) {

  let statusClass = '';

  if (props.pastDue === true) {
    statusClass = 'failure-candidate';
  }


  if (props.status === true) {
    let statusClass = 'success';
  } else if (props.status === false) {
    statusClass = 'failure';
  }

  return (
    // eslint-disable-next-line
    <span className={'status-icon ' + statusClass} onClick={props.action}></span>
  );
}

export {
  BoolIcon
};
