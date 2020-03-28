import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import { format, addDays } from 'date-fns';


class Sorting extends Component {


    constructor(props) {
        super(props);
        this.state = {
            startDate: new Date()

        }
        this.handleStartDateChange = this.handleStartDateChange.bind(this);
        this.moveToTomorrow = this.moveToTomorrow.bind(this);
        this.moveToYesterday = this.moveToYesterday.bind(this);
    }

    handleStartDateChange(e) {
        this.setState({startDate: e});
        var view_to_date = format(e, "MM-dd-yyyy");
        this.props.change_view_date(view_to_date);
    }

    componentDidMount(e) {
        var view_to_date = format(this.state.startDate, "MM-dd-yyyy");
        this.props.change_view_date(view_to_date);
    }

    componentDidMount(){
        const datePicker=document.getElementsByClassName("react-datepicker__input-container")[0];
        datePicker.childNodes[0].setAttribute("readOnly",true);
    }

    moveToTomorrow() {
        // var new_day = moment(this.state.startDate, "MMMM Do YYYY").add(1, 'd');
        var new_day = addDays(this.state.startDate, 1);
        this.handleStartDateChange(new_day);
        this.setState({
            startDate: new_day
        });
    }

    moveToYesterday() {
        // var new_day = moment(this.state.startDate, "MMMM Do YYYY").subtract(1, 'd');
        var new_day = addDays(this.state.startDate, -1);
        this.handleStartDateChange(new_day);
        this.setState({
            startDate: new_day
        });
    }


    render() {
        var filters = this.props.filters;

        return (
            <div className="sorting">
                <div className="nav-between-days">
                    <i className="fa fa-chevron-left" onClick={this.moveToYesterday}></i>
                    <DatePicker 
                        withPortal 
                        selected={this.state.startDate} 
                        dateFormat={"MMMM do yyyy"} 
                        todayButton={"Today"} 
                        timeFormat="Y-m-d" 
                        onChange={this.handleStartDateChange}

                    />
                    <i className="fa fa-chevron-right" onClick={this.moveToTomorrow}></i>                   
                </div>
                <div className="select-habits-to-view">
                    <ul>

                        <li onClick={()=>this.props.toggle_outstanding(filters)} className={filters.includes('outstanding')?'active-sort':''}>
                            <i className="fa fa-eye" aria-hidden="true"></i>
                            Outstanding
                        </li>

                    </ul>
                </div>
            </div>

        );
    }
}

export default Sorting;

        // View
            // Every day
            // Daily
            // Weekly
            // Monthly
            // Completed
            // Failed
            // Incomplete

        // Sort 
            // Status
                // Incomplete
                // Failed
                // Success
            // Score
                // Accending
                // Descending
            // Pace
                // Ascending
                // Descending
            // Time period

        // Add once we actually have multiple filters

        //     <li onClick={this.props.clear_filters}>
        //     <i className="fa fa-eye" aria-hidden="true"></i>
        //     Clear filters
        // </li>

    //     <li onClick={this.props.sort_by_status}>
    //     <i className="fa fa-list" aria-hidden="true"></i>
    //     Status
    // </li>
    // <li onClick={this.props.sort_by_score}>
    //     <i className="fa fa-list" aria-hidden="true"></i>
    //     Score
    // </li>