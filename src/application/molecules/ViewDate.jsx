import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import { format, addDays } from 'date-fns';
import { connect } from 'react-redux';
import { S_ViewDate } from '../store/connectors.js';

class C_ViewDate extends Component {


  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date()

    };
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.moveToTomorrow = this.moveToTomorrow.bind(this);
    this.moveToYesterday = this.moveToYesterday.bind(this);
  }

  handleStartDateChange(e) {
    this.setState({startDate: e});
    let view_to_date = format(e, 'MM-dd-yyyy');
    this.props.change_view_date(view_to_date);
  }



  componentDidMount() {
    let view_to_date = format(this.state.startDate, 'MM-dd-yyyy');
    this.props.change_view_date(view_to_date);
    const datePicker = document.getElementsByClassName('react-datepicker__input-container')[0];
    datePicker.childNodes[0].setAttribute('readOnly', true);
  }

  moveToTomorrow() {
    let new_day = addDays(this.state.startDate, 1);
    this.handleStartDateChange(new_day);
    this.setState({
      startDate: new_day
    });
  }

  moveToYesterday() {
    let new_day = addDays(this.state.startDate, -1);
    this.handleStartDateChange(new_day);
    this.setState({
      startDate: new_day
    });
  }


  render() {

    return (
      <div className='sorting'>
        <div className='nav-between-days'>
          {/* eslint-disable-next-line */}
          <i className='fa fa-chevron-left' onClick={this.moveToYesterday}></i>
          <DatePicker
            withPortal
            selected={this.state.startDate}
            dateFormat={'MMMM do yyyy'}
            todayButton={'Today'}
            timeFormat='Y-m-d'
            onChange={this.handleStartDateChange}

          />
          {/* eslint-disable-next-line */}
          <i className='fa fa-chevron-right' onClick={this.moveToTomorrow}></i>
        </div>
      </div>

    );
  }
}

let ViewDate = connect(...S_ViewDate)(C_ViewDate);

export {
  ViewDate
};
