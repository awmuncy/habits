import React, { Component } from 'react';
import Datepicker from 'react-datepicker';
import { format, parse } from 'date-fns';

// Daily (this one)
// Daily w/ bonus (this one, probably)
// Daily wo/ bonus (maybe this one, maybe not)

// Weekly (another one)
// Biweekly (same as previous)

// Monthly (New)
// Bi monthly (Probably same as previous)

// Quartly, annually

var HabitCalendar = props => {


    var highlightWithRanges = [];
    var highlightWithRangesFail = [];
    var highlightWithRangesNull = [];

    props.checkins.forEach(item=>{

        var thisMoment = parse(item.checkinFor, "yyyy-MM-dd", new Date());
        console.log(thisMoment);

        if(item.status==true) {
            highlightWithRanges.push(thisMoment);
        } else if(item.status===false) {
            highlightWithRangesFail.push(thisMoment);
        } else {
            highlightWithRangesNull.push(thisMoment);
        }
    });

    return (
        <div className="habit-month-view">
            <Datepicker 
                selected={new Date()}
                inline
                highlightDates={[
                    {"successful-day": highlightWithRanges}, 
                    {"failure-day": highlightWithRangesFail},
                    {"unmarked-day": highlightWithRangesNull},                            
                ]}
                onChange={date=>{
                    var formattedDate = format(date, "yyyy-MM-dd");
                    console.log(formattedDate);

                    var checkin = props.checkins.find((checkin)=>{
                        return (checkin.checkinFor == formattedDate);
                    })

                    let newStatus = null;

                    if(checkin.status==null) {
                        newStatus=true;
                    } else if(checkin.status==true) {
                        newStatus=false;
                    }

                    props.checkIn(props.habit_id, formattedDate, newStatus);
                }}
            />
        </div>
    );
}


export default HabitCalendar;