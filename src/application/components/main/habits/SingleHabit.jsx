import React from 'react';
import { Checkins, Essentials, HabitCalendar, ViewDate, HabitGoals, ClosePane } from '../../../store/ConnectedComponents';
import Permission from '../../navigation/Permission';

var SingleHabit = props => {
        

    if(!props.habit) return null;
    let checkins;

    checkins = <Checkins checkins={props.habit.checkinSlots} habit_id={props.habit.id} />;

    return (
        <>
            <ClosePane id={props.habit.id} />
            <div className="home-layout">
                <ViewDate />
                <div className="single-habit home-main" id={"habit-" + props.habit.id}>   
                    <div className="habit-details">
                        
                        <Essentials habit_id={props.habit.id} />
                        {checkins}

                        <div className="calendar-and-date">
                            <HabitCalendar habit_id={props.habit.id} />
                            <Permission feature="habit-goals" alt={<div><div>Goals available in premium.</div><a className="btn btn--premium" href="/get-subscription">Get Premium</a></div>}>
                                <HabitGoals habit_id={props.habit.id} />
                            </Permission>
                            
                        </div>
                    </div>            
                </div>
            </div>
        </>
    );
}


export default SingleHabit;