import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { IntervalSelect } from '../../../store/ConnectedComponents';

import {
  Redirect
} from 'react-router-dom';


class NewChallenge extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open : false,
            startDate: moment()
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleStartDateChange = this.handleStartDateChange.bind(this);
        this.submitNewChallenge = this.submitNewChallenge.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.state.opening) {
            document.querySelector('#new_challenge').scrollIntoView({ 
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

    submitNewChallenge(e) {
        e.preventDefault();

        

        var myForm = document.getElementById('new_challenge');

        var formData;

        self = this;

        formData = new FormData(myForm);


        var object = {};


        formData.forEach(function(value, key){
            object[key] = value;
        });


        var challenge = {};

        challenge.profile = {};

        challenge.profile.frame = object.timeframe;
        
        switch(object.timeframe) {
            case "annually":
                if(object.quarterly=="on") {
                    challenge.profile.frame = "quarterly";
                    break;
                }         
                if(object.twiceannually=="on") {
                    challenge.profile.frame = "twiceannually";
                    break;
                }       
                break;
            case "weekly":
                if(object.biweekly=="on") {
                    challenge.profile.frame = "biweekly";
                }
                break;
            case "monthly":
                if(object.twicemonthly=="on") {
                    challenge.profile.frame = "twicemonthly";
                }
                if(object.bimonthly=="on") {
                    challenge.profile.frame = "bimonthly";
                }
                break;

            default: 
                
        } 

        challenge.profile.pattern = [];
        challenge.title = object.title;
        
        // !!!
        challenge.profile = {
            frame: "days",
            pattern: [0, 1, 2, 3, 4, 5, 6]
        };

        var dddd = new Date(parseInt(object.begin_date));

        var mm = dddd.getMonth() + 1; 
        var dd = dddd.getDate();

        challenge.beginDate = [dddd.getFullYear(),
          (mm>9 ? '' : '0') + mm,
          (dd>9 ? '' : '0') + dd
         ].join('-');


        if(object.timeframe=="days") {
            if(object.sunday=="on") challenge.profile.pattern.push(0);
            if(object.monday=="on") challenge.profile.pattern.push(1);
            if(object.tuesday=="on") challenge.profile.pattern.push(2);
            if(object.wednesday=="on") challenge.profile.pattern.push(3);
            if(object.thursday=="on") challenge.profile.pattern.push(4);
            if(object.friday=="on") challenge.profile.pattern.push(5);
            if(object.saturday=="on") challenge.profile.pattern.push(6);
        }



        if(object.bonus=="on") {
            challenge.profile.bonus = true;
        } else {
            challenge.profile.bonus = false;
        }

        this.setState({closed: true});

        this.props.createChallenge(challenge);
    }

    render() {
        if (this.state.closed === true) {
          return <Redirect to='/home' />
        }


        return(
            <div className="new-challenge">
                
                <form id="new_challenge" className="new-challenge-form"  onSubmit={this.submitNewChallenge}>
                    
                    <h3>New Challenge</h3>            
                    <span className="nevermind" onClick={this.nevermind.bind(this)}>Cancel</span>        
                    <input type="hidden" value={this.state.startDate} placeholder="Begin Date" name="begin_date" />
                    <DatePicker selected={this.state.startDate} timeFormat="Y-m-d" onChange={this.handleStartDateChange} />
                    <input type="text" placeholder="Title" name="title" />
                    <IntervalSelect />
                    <input type="submit" value="Submit" className="btn primary" />
                </form>
            
            </div>
        );
    }
}


export default NewChallenge;