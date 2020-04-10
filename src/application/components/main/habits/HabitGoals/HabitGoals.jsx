import React from 'react';
import { NewHabitGoal } from '../../../../store/ConnectedComponents';


export default props => {
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
                            <tr>
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