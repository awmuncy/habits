import React from 'react';
import { GoalEssential, PinnedChallenges } from '../../../store/ConnectedComponents';

function GoalSingle(props) {

    document.title = "Goal" + props.match.params.id + " | HabitsApp";

    return (
        <div className="goal-single">
            <GoalEssential id={props.match.params.id} />
        </div>
    );
    
}

export default GoalSingle;