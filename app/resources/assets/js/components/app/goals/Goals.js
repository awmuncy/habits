import React from 'react';
import { arrayMove } from 'react-sortable-hoc';
import { GoalEssential, SortablePlanks } from '../../../store/ConnectedComponents';


function Goals(props) {

    function onSortEnd({oldIndex, newIndex}) { 
        var list = arrayMove(props.goals, oldIndex, newIndex); 
        props.sortGoals(list);
    }

    

    return <SortablePlanks wrapperClass="my-goals" onSortEnd={onSortEnd} items={props.goals} component={GoalEssential} />
}

export default Goals;