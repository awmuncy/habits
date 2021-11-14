import React, { Component } from 'react';
import { IntervalFor } from '../store/ConnectedComponents.js';
import { connect } from 'react-redux';
import { S_Checkin } from '../store/connectors.js';

class C_Checkin extends Component {



  render() {

    let args = [this, this.props.id, this.props.checkin.checkinFor];


    let icons;

    if (this.props.status !== null) {
      // eslint-disable-next-line
      icons = <span className='icon' onClick={this.props.checkIn.bind(...args, null)}></span>;
    } else {
      icons
                = <React.Fragment>
          <button
            aria-label='Yes, I did check in'
            className='check-yes'
            onClick={this.props.checkIn.bind(...args, true)}></button>
          <button
            aria-label='No, I did not check in'
            className='check-no'
            onClick={this.props.checkIn.bind(...args, false)}></button>
        </React.Fragment>
      ;
    }

    let note = this.props.checkin.note ? this.props.checkin.note : 'No note';
    let className = (this.props.loading ? 'loading' : '')
      + (this.props.status === true ? ' did' : ' didnt')
      + ' checkin '
      + (this.props.checkin.bonus === true ? 'bonus' : '');

    return (
      <li
        className={ className }>
        <IntervalFor checkinFor={this.props.checkin.checkinFor} frame={this.props.frame} />

        <span className='score'>{this.props.score}</span>

        {icons}

      </li>
    );
  }
}


let Checkin = connect(...S_Checkin)(C_Checkin);

export {
  Checkin
};
