import React, { Component } from 'react';
import { Checkins, Essentials, EditHabit } from '../../../store/ConnectedComponents';
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

        this.props.habit.checkinSlots.forEach(item=>{
            if(item.status==true) {
                highlightWithRanges.push(moment(item.checkinFor, "YYYY-MM-DD"));
            }
        });

        checkins = <Checkins checkins={this.props.habit.checkinSlots} habit_id={this.props.habit.id} />;

        return (
            <div className="single-habit" id={"habit-" + this.props.habit.id}>   
                <div className="habit-details">
                    <Essentials habit_id={this.props.habit.id} />
                    {checkins}
  
                    <EditHabit habit_id={this.props.habit.id} />
                    <div className="habit-month-view">
                        <Datepicker inline
                            highlightDates={[{"successful-day": highlightWithRanges}]}
                        />
                    </div>
                </div>            
            </div>
        );
    }
}


export default SingleHabit;