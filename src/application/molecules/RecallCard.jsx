import React from 'react';
import {connect} from 'react-redux';

function RecallCardComponent(props) {
  return (
    <div className='recall-card'>
      <h3>{props.title}</h3>
      <h4>{props.prompt}</h4>
      <div>
        {props.body}
      </div>
      <div>Level: 8 going on 13</div>
      {props.link && <a href={props.link} target='_blank'>See</a>}
      <button onClick={() => props.recallAttempt(props.id, true)}>
        <i className='fa fa-arrow-up' aria-hidden='true'></i>
      </button>
      <button onClick={() => props.recallAttempt(props.id, false)}>
        <i className='fa fa-arrow-down' aria-hidden='true'></i>
      </button>
    </div>
  );
}


import RecallCardConnector from '../store/connections/RecallCard.js';

let RecallCard = connect(...RecallCardConnector)(RecallCardComponent);

export { RecallCard };
