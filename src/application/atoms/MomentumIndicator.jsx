import React from 'react';
import { dynamicSortMultiple } from '../../helpers.js';
import ProgressRings from '../atoms/ProgressRings.jsx'; // Route through central?
import { connect } from 'react-redux';
import { EssentialProgress } from '../store/ConnectedComponents.js';
import { S_MomentumIndicator } from '../store/connectors.js';


let C_MomentumIndicator = props => {

  props.canary;
  if (!props.goals || props.goals.length < 1) { return <EssentialProgress checkin={props.currentCheckin} />; }
  let goals = props.goals.slice();
  if (!props.currentCheckin) { return null; }



  goals.map(goal=>{
    goal.strength = parseInt(goal.strength);
    return goal;
  });

  goals.sort(dynamicSortMultiple('strength', 'startingPoint'));

  while (props.currentCheckin.score > goals[0].strength && goals.length > 3) {
    goals.shift();
  }

  let figureInt = int => {
    if (!goals[int]) { return 0; }
    if (goals[int].startingPoint >= props.currentCheckin.score) { return 0; }
    let adjustedScore = props.currentCheckin.score - goals[int].startingPoint;
    let adjustedGoal = goals[int].strength - goals[int].startingPoint;

    return adjustedScore / adjustedGoal;
  };

  let outer = figureInt(2);
  let middle = figureInt(1);
  let inner = figureInt(0);


  let style = {
    '--inner-ring-color' : goals[0] ? goals[0].color : undefined,
    '--middle-ring-color': goals[1] ? goals[1].color : undefined,
    '--outer-ring-color' : goals[2] ? goals[2].color : undefined
  };


  return (
    <div style={style}>
      <ProgressRings
        outer={outer}
        middle={middle}
        inner={inner} />

    </div>
  );
};

let MomentumIndicator = connect(...S_MomentumIndicator)(C_MomentumIndicator);

export {
  MomentumIndicator
};
