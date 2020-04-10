import React from 'react';
import { Checkins, Essentials, HabitCalendar, ViewDate, HabitGoals } from '../../../store/ConnectedComponents';



var SingleHabit = props => {
        

    if(!props.habit) return null;
    let checkins;

    checkins = <Checkins checkins={props.habit.checkinSlots} habit_id={props.habit.id} />;

    return (
        <div className="home-layout">
            <ViewDate />
            <div className="single-habit home-main" id={"habit-" + props.habit.id}>   
                <div className="habit-details">
                    
                    <Essentials habit_id={props.habit.id} />
                    {checkins}

                    <div className="calendar-and-date">
                        <HabitCalendar habit_id={props.habit.id} />
                        
                        <HabitGoals habit_id={props.habit.id} />
                    </div>
                </div>            
            </div>
        </div>
    );
}


export default SingleHabit;