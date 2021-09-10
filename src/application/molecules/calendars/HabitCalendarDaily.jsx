import React from 'react';
import Datepicker from 'react-datepicker';
import { format, parse, parseISO, addDays, getDay } from 'date-fns';
import { connect } from 'react-redux';
import { S_HabitsCalendar } from '../../store/connectors.js';

// Daily (this one)
// Daily w/ bonus (this one, probably)
// Daily wo/ bonus (maybe this one, maybe not)

// Weekly (another one)
// Biweekly (same as previous)

// Monthly (New)
// Bi monthly (Probably same as previous)

// Quartly, annually

var C_HabitCalendar = props => {


    var highlightWithRanges = [];
    var highlightWithRangesFail = [];
    var highlightWithRangesNull = [];

    props.checkins.forEach(item=>{

        var thisMoment = parse(item.checkinFor, "yyyy-MM-dd", new Date());
        if(item.status==true) {
            highlightWithRanges.push(thisMoment);
        } else if(item.status===false) {
            highlightWithRangesFail.push(thisMoment);
        } else {
            highlightWithRangesNull.push(thisMoment);
        }
    });

    return (
        <div className="habit-calendar-days">
            <Datepicker 
                minDate={addDays(parseISO(props.beginDate), 1)}
                selected={new Date()}
                inline
                highlightDates={[
                    {"successful-day": highlightWithRanges}, 
                    {"failure-day": highlightWithRangesFail},
                    {"unmarked-day": highlightWithRangesNull},                            
                ]}
                dayClassName={date=>{
                    if(props.profile.frame==="daily") return;
                    if(props.profile.pattern.includes(getDay(date))) {
                        return;
                    } else {
                        return "bonus";
                    }
                }}
                filterDate={date=>{
                    if(props.profile.frame==="daily") return true;
                    if(!props.profile.bonus && !props.profile.pattern.includes(getDay(date))) {
                        return false;
                    } 
                    return true;
                }}
                onChange={date=>{
                    var formattedDate = format(date, "yyyy-MM-dd");

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

var HabitCalendarDaily = connect(...S_HabitsCalendar)(C_HabitCalendar);

export {
    HabitCalendarDaily
};