import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import { SelectAssociated } from '../../../store/ConnectedComponents';
import { Redirect } from 'react-router-dom';



class NewGoal extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            endDate: null,
            submitted: false
        }

        this.handleEndDateChange = this.handleEndDateChange.bind(this);
        this.goalFormSubmit = this.goalFormSubmit.bind(this);
    }

    handleEndDateChange(e){
        this.setState({endDate: e});
    };

    goalFormSubmit(e) {

        e.preventDefault();

        var myForm = document.getElementById('new-goal');

        var formData;

        self = this;

        formData = new FormData(myForm);

        var object = {};


        formData.forEach(function(value, key){
            object[key] = value;
        });


        var goal = {
            title: object.title,
            endDate: object.begin_date
        };


        this.props.declareGoal(goal);
        this.setState({
            submitted: true
        });
        
    }

    render() {

        if(this.state.submitted) return <Redirect to="/goals" />;

        var cv = [
            {
                title: "Purpose",
                id: "purpose"
            },
            {
                title: "Respect",
                id: "respect"
            },
            {
                title: "Health",
                id: "health"
            },
            {
                title: "Kindness",
                id: "kindness"
            },
            {
                title: "Reason",
                id: "reason"
            }
        ];

        return (
            <form className="new-goal" onSubmit={this.goalFormSubmit} id="new-goal">
                <input type="text" placeholder="Title" name="title" />
                <input type="hidden" value={this.state.endDate} placeholder="Begin Date" name="begin_date" />
                <DatePicker selected={this.state.endDate} timeFormat="Y-m-d" onChange={this.handleEndDateChange} placeholderText="Date" />
                <SelectAssociated associations={cv} type="Core Values" slug="core-values" />
                <SelectAssociated associations={this.props.habits} type="Habits" slug="habits" />        
                <input type="submit" value="Submit" />        
            </form>
        );
    }
}

export default NewGoal;