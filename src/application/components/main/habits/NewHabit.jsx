import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import { IntervalSelect } from '../../../store/ConnectedComponents';

import {
  Redirect
} from 'react-router-dom';


class NewHabit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open : false,
            startDate: new Date()
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleStartDateChange = this.handleStartDateChange.bind(this);
        this.submitNewHabit = this.submitNewHabit.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.state.opening) {
            document.querySelector('#new_habit').scrollIntoView({ 
                behavior: 'smooth' 
            });
            this.setState({opening: false});
        }
    }

    handleClick() {
        this.setState({
            open : true,
            opening: true
        });



    }

    nevermind() {
        this.setState({
            closed : true
        });
    }

    handleStartDateChange(e) {
        this.setState({startDate: e});
    }

    submitNewHabit(e) {
        e.preventDefault();

        

        var myForm = document.getElementById('new_habit');

        var formData;

        self = this;

        formData = new FormData(myForm);


        var object = {};


        formData.forEach(function(value, key){
            object[key] = value;
        });


        var habit = {};

        habit.profile = {};

        habit.profile.frame = object.timeframe;
        
        switch(object.timeframe) {
            case "annually":
                if(object.quarterly=="on") {
                    habit.profile.frame = "quarterly";
                    break;
                }         
                if(object.twiceannually=="on") {
                    habit.profile.frame = "twiceannually";
                    break;
                }       
                break;
            case "weekly":
                if(object.biweekly=="on") {
                    habit.profile.frame = "biweekly";
                }
                break;
            case "monthly":
                if(object.twicemonthly=="on") {
                    habit.profile.frame = "twicemonthly";
                }
                if(object.bimonthly=="on") {
                    habit.profile.frame = "bimonthly";
                }
                break;

            default: 
                
        } 

        habit.profile.pattern = [];
        habit.title = object.title;
        
        

        var dddd = new Date(parseInt(object.begin_date));

        var mm = dddd.getMonth() + 1; 
        var dd = dddd.getDate();

        habit.beginDate = [dddd.getFullYear(),
          (mm>9 ? '' : '0') + mm,
          (dd>9 ? '' : '0') + dd
         ].join('-');


        if(object.timeframe=="days") {
            if(object.sunday=="on") habit.profile.pattern.push(0);
            if(object.monday=="on") habit.profile.pattern.push(1);
            if(object.tuesday=="on") habit.profile.pattern.push(2);
            if(object.wednesday=="on") habit.profile.pattern.push(3);
            if(object.thursday=="on") habit.profile.pattern.push(4);
            if(object.friday=="on") habit.profile.pattern.push(5);
            if(object.saturday=="on") habit.profile.pattern.push(6);
        }



        if(object.bonus=="on") {
            habit.profile.bonus = true;
        } else {
            habit.profile.bonus = false;
        }

        habit.profile.goal1 = object.goal1;
        habit.profile.goal2 = object.goal2;
        habit.profile.goal3 = object.goal3;

        this.setState({closed: true});

        this.props.createHabit(habit);
    }

    render() {
        if (this.state.closed === true) {
          return <Redirect to='/home' />
        }


        return(
            <div className="new-habit">
                
                <form id="new_habit" className="new-habit-form"  onSubmit={this.submitNewHabit}>
                    
                    <h3>New Habit</h3>            
                    <span className="nevermind" onClick={this.nevermind.bind(this)}>Cancel</span>        
                    <input type="hidden" value={this.state.startDate} placeholder="Begin Date" name="begin_date" />
                    <DatePicker selected={this.state.startDate} timeFormat="Y-m-d" onChange={this.handleStartDateChange} />
                    <input type="text" placeholder="Title" name="title" />
                    <IntervalSelect />
                    <div className="goals">
                        <label>Short term: <input name="goal1" type="number" /></label>
                        <label>Mid term: <input name="goal2" type="number" /></label>
                        <label>Ultimate: <input name="goal3" type="number" /></label>
                    </div>
                    <input type="submit" value="Submit" className="btn primary" />
                </form>
            
            </div>
        );
    }
}


export default NewHabit;