import React from 'react';
import { NewHabitGoal } from '../store/ConnectedComponents.js';
import { S_HabitGoals } from '../store/connectors.js';
import { connect } from 'react-redux';

function C_HabitGoals(props) {
    return (
        <div className="habit-goals">
            <table className="habit-goals--goals-list">
                <thead>
                    <tr>
                        <td>Color</td>
                        <td>Goal Date</td>
                        <td>Starting Point</td>
                        <td>Goal</td>
                    </tr>
                </thead>
                <tbody>
                    {props.goals ? props.goals.map(goal=>{
                        return (
                            <tr key={goal.goalDate}>
                                <td style={{backgroundColor: goal.color}}></td>
                                <td>{goal.goalDate}</td>
                                <td>{goal.startingPoint}</td>
                                <td>{goal.strength}</td>
                                <td><i className="fa fa-minus-circle"></i></td>
                            </tr>
                        );
                    }):null}
                    <NewHabitGoal habit_id={props.habit.id} />
                </tbody>
            </table>
        </div>
    )
}

var HabitGoals = connect(...S_HabitGoals)(C_HabitGoals);

export {
    HabitGoals
};