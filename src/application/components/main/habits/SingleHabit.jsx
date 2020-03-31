import React, { Component } from 'react';
import { Checkins, Essentials, EditHabit, HabitCalendar, ViewDate } from '../../../store/ConnectedComponents';


class SingleHabit extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }


    

    render() {
        

        if(!this.props.habit) return null;
        let checkins;


        checkins = <Checkins checkins={this.props.habit.checkinSlots} habit_id={this.props.habit.id} />;

        return (
            <div className="home-layout">
                <ViewDate />
                <div className="single-habit home-main" id={"habit-" + this.props.habit.id}>   
                    <div className="habit-details">
                        
                        <Essentials habit_id={this.props.habit.id} />
                        {checkins}
    

                        <HabitCalendar habit_id={this.props.habit.id} />
                        <EditHabit habit_id={this.props.habit.id} />
                    </div>            
                </div>
            </div>
        );
    }
}


export default SingleHabit;