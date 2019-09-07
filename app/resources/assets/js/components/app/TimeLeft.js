import React, { Component } from 'react';
import moment from 'moment';

function TimeLeft(props) {
    
    var eventdate = moment(props.date, 'MM/DD/YYYY');
    var todaysdate = moment();
    var months = eventdate.diff(todaysdate, 'months');
    var weeks = eventdate.diff(todaysdate, 'weeks');
    var days = eventdate.diff(todaysdate, 'days');

    var left = months;
    var measure = "months";

    if(months < 2) {
        left = weeks;
        measure = "weeks";
    }
    if(weeks < 2) {
        left = days;
        measure = "days";
    }

    if(left<0) {
        
    }
    

    return (
        <span className="time-left">
            <span className="time">{left}</span>
            <span className="measure">{measure}</span>
        </span>
    );
}

export default TimeLeft;