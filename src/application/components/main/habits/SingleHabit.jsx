import React, { Component } from 'react';
import { Checkins, Essentials, EditHabit, HabitCalendar } from '../../../store/ConnectedComponents';
import Datepicker from 'react-datepicker';
import moment from 'moment';


class SingleHabit extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }


    

    render() {
        

        if(!this.props.habit) return null;
        let checkins;

        var highlightWithRanges = [];
        var highlightWithRangesFail = [];
        var highlightWithRangesNull = [];

        this.props.habit.checkinSlots.forEach(item=>{

            var thisMoment = moment(item.checkinFor, "YYYY-MM-DD")

            if(item.status==true) {
                highlightWithRanges.push(thisMoment);
            } else if(item.status===false) {
                highlightWithRangesFail.push(thisMoment);
            } else {
                highlightWithRangesNull.push(thisMoment);
            }
        });

        checkins = <Checkins checkins={this.props.habit.checkinSlots} habit_id={this.props.habit.id} />;

        return (
            <div className="single-habit" id={"habit-" + this.props.habit.id}>   
                <div className="habit-details">
                    <Essentials habit_id={this.props.habit.id} />
                    {checkins}
  
                    <EditHabit habit_id={this.props.habit.id} />

                    <HabitCalendar habit_id={this.props.habit.id} />
                </div>            
            </div>
        );
    }
}


export default SingleHabit;