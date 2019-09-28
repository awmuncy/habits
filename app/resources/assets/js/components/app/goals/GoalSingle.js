import React from 'react';
import { GoalEssential, PinnedHabits } from '../../../store/ConnectedComponents';

function GoalSingle(props) {

    document.title = "Goal" + props.match.params.id + " | HabitsApp";

    return (
        <div className="goal-single">
            <GoalEssential id={props.match.params.id} />
        </div>
    );
    
}

export default GoalSingle;