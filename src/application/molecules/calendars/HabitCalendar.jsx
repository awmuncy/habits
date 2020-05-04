import React, { Component } from 'react';
import Datepicker from 'react-datepicker';
import { format, parse } from 'date-fns';

import { HabitCalendarDaily, /*HabitCalendarDays, HabitCalendarWeekly,*/ HabitCalendarMonthly/*,HabitCalendarQuarterly*/ } from '../../store/ConnectedComponents';


var HabitCalendar = props => {

    switch(props.profile.frame) {
        case "daily":
        case "days":
            return <HabitCalendarDaily habit_id={props.habit_id} />       
        // case "days": 
        //     return <HabitCalendarDays habit_id={props.habit_id} />
        // case "weekly": 
        // case "biweekly":
        //     return <HabitCalendarWeekly habit_id={props.habit} />

        case "monthly":
        case "bimonthly": 
            return <HabitCalendarMonthly habit_id={props.habit_id} />

        // case "quarterly":
        //     return <HabitCalendarQuarterly habit_id={props.habit_id} />  
            
        default:
            return null;
    }
}


export default HabitCalendar;