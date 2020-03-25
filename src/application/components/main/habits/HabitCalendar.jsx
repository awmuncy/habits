import React, { Component } from 'react';
import Datepicker from 'react-datepicker';
import moment from 'moment';


class HabitCalendar extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }


    
    // I need
        // - Checkins
        // - The "pattern"
        // - Ability to change checkin
    // Anything else? I think not.

    render() {
        

        var highlightWithRanges = [];
        var highlightWithRangesFail = [];
        var highlightWithRangesNull = [];

        this.props.checkins.forEach(item=>{

            var thisMoment = moment(item.checkinFor, "YYYY-MM-DD")

            if(item.status==true) {
                highlightWithRanges.push(thisMoment);
            } else if(item.status===false) {
                highlightWithRangesFail.push(thisMoment);
            } else {
                highlightWithRangesNull.push(thisMoment);
            }
        });



        return (
            <div className="habit-month-view">
                <Datepicker inline
                    highlightDates={[
                        {"successful-day": highlightWithRanges}, 
                        {"failure-day": highlightWithRangesFail},
                        {"unmarked-day": highlightWithRangesNull},                            
                    ]}
                    onChange={date=>{
                        var formattedDate = date.format("YYYY-MM-DD");

                        var checkin = this.props.checkins.find((checkin)=>{
                            return (checkin.checkinFor == formattedDate);
                        })

                        let newStatus = null;

                        if(checkin.status==null) {
                            newStatus=true;
                        } else if(checkin.status==true) {
                            newStatus=false;
                        }

                        this.props.checkIn(this.props.habit_id, formattedDate, newStatus);
                        console.log(date);
                    }}
                />
            </div>
        );
    }
}


export default HabitCalendar;