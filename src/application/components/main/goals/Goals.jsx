import React from 'react';
import { arrayMove } from 'react-sortable-hoc';
import { GoalEssential, SortablePlanks } from '../../../store/ConnectedComponents';
import moment from 'moment';


function Goals(props) {

    function onSortEnd({oldIndex, newIndex}) { 
        var list = arrayMove(props.goals, oldIndex, newIndex); 
        props.sortGoals(list);
    }

    var goals = props.goals;

    
    var now = new Date().getTime();

    if(props.hide && props.hide.includes("past_completed")) {
        goals.map(goal=>{
            var date = parseInt(goal.endDate);
            if(goal.status!==null && date < now) {
                goal.hidden = true;
            }
            return goal;
        }); 
    }

    return <SortablePlanks wrapperClass="my-goals" onSortEnd={onSortEnd} items={goals} component={GoalEssential} />
}

export default Goals;