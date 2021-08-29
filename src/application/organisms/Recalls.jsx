import React from 'react';
import { connect } from "react-redux";
import { RecallCard } from '../store/ConnectedComponents';
import { differenceInCalendarDays, addDays } from 'date-fns';

var testDays = [
    {day: "Today", reminders: [
        {title: "Hello!"}
    ]},
    {day: "Tomorrow", reminders: [
        {title: "Another one1"},
        {title: "Another one2"},
        {title: "Another one3"},
        {title: "Another one4"},
        {title: "Another one5"},
        {   
            title: "Another one6",
            prompt: "Remember X?",
            body: "Hello there!",
            link: "https://www.allenmuncy.com"
        }

    ]},
    {day: "Overmorrow1", reminders: [
        {title: "Another one"}
    ]},
    {day: "Overmorrow2", reminders: [
        {title: "Another one"}
    ]},
    {day: "Overmorrow3", reminders: [
        {title: "Another one"}
    ]},
    {day: "Overmorrow5", reminders: [
        {title: "Another one"}
    ]},
    {day: "Overmorrow6", reminders: [
        {title: "Another one"}
    ]}
];


function RecallsDaysComponent(props) {
    return (
        <div className="recall-column">
            <h2>{props.day}</h2>
            {props.reminders.map((card, key) => {
                return <RecallCard key={card.title} {...card} />
            })}
        </div>
    );
};

function RecallsComponent(props) {

    var i = 0;
    
    var days = [];

    props.recalls.forEach(recall => {
        var day = (recall.level || 0) - differenceInCalendarDays(new Date(), addDays(new Date(), i));
        if(day<0) return;
        if(i<2) {
            i++;
        }

        days[day] ? days[day].reminders.push(recall) : days[day] = ({day, reminders: [recall]});
    });



    return (
        <div className="recalls-container">
            {days.map((day, key) => {
                return <RecallsDaysComponent key={day.day} {...day} />
            })}
        </div>
    );
}

import RecallsConnector from '../store/connections/Recalls';

var Recalls = connect(...RecallsConnector)(RecallsComponent);

export {
    Recalls,
    RecallsComponent
};