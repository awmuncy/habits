import React from 'react';
import { dynamicSortMultiple } from '../../../../helpers';
import ProgressRings from "../blocks/ProgressRings"; // Route through central?

import { EssentialProgress } from "../../../store/ConnectedComponents";


var MomentumIndicator = props => {

    props.canary;
    if(!props.goals || props.goals.length<1) return <EssentialProgress checkin={props.currentCheckin} />;
    var goals = props.goals.slice();
    if(!props.currentCheckin) return null;

    

    goals.map(goal=>{
        goal.strength = parseInt(goal.strength);
        return goal;
    });

    goals.sort(dynamicSortMultiple('strength', 'startingPoint'));

    while(props.currentCheckin.score>goals[0].strength && goals.length>3) {
        goals.shift();
    }

    var figureInt = int => {
        if(!goals[int]) return 0;
        if(goals[int].startingPoint>=props.currentCheckin.score) return 0;
        var adjustedScore = (props.currentCheckin.score - goals[int].startingPoint)
        var adjustedGoal = (goals[int].strength - goals[int].startingPoint);
        
        return (adjustedScore / adjustedGoal);
    }

    var outer = figureInt(2);
    var middle = figureInt(1);
    var inner = figureInt(0);


    //<div><sup>{goals[2].startingPoint} -> {goals[2].strength}</sup>, <sup>{goals[1].startingPoint} -> {goals[1].strength}</sup>, <sup>{goals[0].startingPoint} -> {goals[0].strength}</sup></div>
    var style = {
        "--inner-ring-color": goals[0] ? goals[0].color : undefined,
        "--middle-ring-color": goals[1] ? goals[1].color : undefined,
        "--outer-ring-color": goals[2] ? goals[2].color : undefined
    };


    return (     
        <div style={style}>            
        <ProgressRings
            outer={outer} 
            middle={middle} 
            inner={inner} /> 
            
        </div>
    );
}

export default MomentumIndicator;