import React from 'react';
import { Checkins, Essentials, HabitCalendar, ViewDate, HabitGoals, ClosePane } from '../store/ConnectedComponents';
import Permission from '../atoms/Permission';

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


import { pinHabit, unpinHabit } from "../store/connections/resources/applicationActions";
import { connect } from 'react-redux';

var connectors = {
    props: (store, props) => {

        var habit_position = store.habits.findIndex(function(habit) {
    
            if(habit.id==props.match.params.id) {
                return true;
            }
            return false;
        });



        var goals = store.habits[habit_position] ? store.habits[habit_position].goals || [] : false || [];
        var canary = goals[goals.length - 1] && goals[goals.length - 1].strength;
    
        return {
            habit: store.habits[habit_position],    
            view_date: store.view_date,
            goals: goals,
            canary: canary
        }
    },
    dispatches: dispatch => {
        return {
            pin: id => {
                dispatch(pinHabit(id));
            },
            unpin: id => {
                dispatch(unpinHabit(id));
            }
        };
    }
}

export default connect(connectors.props, connectors.dispatches)(SingleHabit);