import React, { Component } from 'react';
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';

import { PinnedHabits, Habit } from '../../../store/ConnectedComponents';


const SortableHabit = SortableElement(({habit}) => 
    <Habit id={habit.id} />
);


const SortableHabits = SortableContainer(({habits}) => {

    if(!Array.isArray(habits)) habits = [];


    return (
        <div className="habit-list">
            {habits.map((habit, index) => (
                <SortableHabit key={habit.id} index={index} habit={habit} />
            ))}
        </div>
    );
});


class Habits extends Component {

    constructor(props) {
        super(props);
        this.onSortEnd = this.onSortEnd.bind(this);
        this.state = {
            habits: props.habits
        };
    }

    onSortEnd({oldIndex, newIndex}) { 
        var habitlist = arrayMove(this.props.habits, oldIndex, newIndex); 

        habitlist.map(function(item, key){
            item.filtered_out = false;
        	item.position = key;
        	return item;
        });

        this.props.sortHabits(habitlist);
    }

    static getDerivedStateFromProps(props, state) {
        
        props.view_date;

        state.habits = state.habits ? state.habits : [];

        state.habits.map(function(item, key){
            item.filtered_out = false;
            item.position = key;
            return item;
        });

        function filterHabits() {

            var habits = props.habits;

            if(props.filters.includes("outstanding")) {
                habits = habits.map(function(habit){
                    if(habit.checkinSlots[habit.checkinSlots.length - 1].status!==null) {
                        habit.filtered_out = true;                  
                    } 
                    return habit;
                });
            }

            return habits;
        }


        return {
            habits: filterHabits()
        }        
    }



	render () {     

        if(this.state.habits.length==0) {
            return <div>Make a new habit!</div>
        }

		return (

			<div className="my-habits">
                <PinnedHabits />
                <SortableHabits 
                habits={this.state.habits} 
                helperClass="SortableHelper" 
                lockAxis="y"
                useDragHandle={true}
                pressDelay={200}
                onSortEnd={this.onSortEnd.bind(this)}
                 />                
			</div>

		);
	}
}


export default Habits;