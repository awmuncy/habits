import React, { Component } from 'react';
import Datepicker from 'react-datepicker';
import { format, parse } from 'date-fns';
import { connect } from 'react-redux';
import { S_HabitsCalendar } from '../../store/connectors.js';

let C_HabitCalendarMonthly = props => {


  let highlightWithRanges = [];
  let highlightWithRangesFail = [];
  let highlightWithRangesNull = [];

  props.checkins.forEach(item=>{

    let thisMoment = parse(item.checkinFor, 'yyyy-MM-dd', new Date());

    if (item.status === true) {
      highlightWithRanges.push(thisMoment);
    } else if (item.status === false) {
      highlightWithRangesFail.push(thisMoment);
    } else {
      highlightWithRangesNull.push(thisMoment);
    }
  });


  return (
    <div className='habit-month-view'>
      <Datepicker
        selected={new Date()}
        inline
        highlightDates={[
          {'successful-day': highlightWithRanges},
          {'failure-day': highlightWithRangesFail},
          {'unmarked-day': highlightWithRangesNull}
        ]}
        onChange={date=>{
          let formattedDate = format(date, 'yyyy-MM-dd');

          let checkin = props.checkins.find((checkin)=>{
            return checkin.checkinFor === formattedDate;
          });

          let newStatus = null;

          if (checkin.status === null) {
            newStatus = true;
          } else if (checkin.status === true) {
            newStatus = false;
          }

          props.checkIn(props.habit_id, formattedDate, newStatus);
        }}
        showMonthYearPicker
      />
    </div>
  );
};


let HabitCalendarMonthly = connect(...S_HabitsCalendar)(C_HabitCalendarMonthly);

export {
  HabitCalendarMonthly
};
