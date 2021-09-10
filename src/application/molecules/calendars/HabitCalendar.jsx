import React from 'react';
import { connect } from 'react-redux';

import { HabitCalendarDaily, HabitCalendarMonthly } from '../../store/ConnectedComponents.js';
import { S_HabitsCalendar } from '../../store/connectors.js';


var C_HabitCalendar = props => {

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


var HabitCalendar = connect(...S_HabitsCalendar)(C_HabitCalendar);

export { 
    HabitCalendar
};