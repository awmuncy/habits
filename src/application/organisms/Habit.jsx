import React, { Component } from 'react';
import { SortableHandle } from 'react-sortable-hoc';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Essentials } from '../store/ConnectedComponents';
import { S_Habit } from '../store/connectors';


class C_Habit extends Component {

    constructor(props) {
        super(props);

    }

    render() {
        
        var hide = this.props.habit.filtered_out;
        var id = this.props.id;

        if(hide || this.props.pinned_habits.includes(id.toString())){
            return <div></div>;
        }

        if(!this.props.habit) return null;


        const SortHandle = SortableHandle(() => (
            <Link to={"habit/" + id}>
                <Essentials habit_id={id} />
            </Link>
        )); 

        return (
            <div className="single-habit" id={"habit-" + id}>   
                <SortHandle />                
            </div>
        );
    }
}

const Habit = connect(...S_Habit)(C_Habit);

export {
    Habit
};