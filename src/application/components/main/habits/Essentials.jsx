import React, { Component } from 'react';

import { BoolIcon, MomentumIndicator } from "../../../store/ConnectedComponents";



class Essentials extends Component {

    constructor(props) {
        super(props);

        this.doCheckin = this.doCheckin.bind(this);
    }




    doCheckin(e) {
        e.preventDefault();
        e.stopPropagation();

        let newStatus = null;


        if(this.props.currentCheckin.status==null) {
            newStatus=true;
        } else if(this.props.currentCheckin.status==true) {
            newStatus=false;
        }

        this.props.checkIn(this.props.habit.id, this.props.currentCheckin.checkinFor, newStatus);
    }

    render() {
        let interval = this.props.habit.profile.frame;
        if(this.props.habit.profile.frame=="days") {
            interval = "";
            this.props.habit.profile.pattern.forEach(function(day, index, array){
                switch(day) {
                    case 0:
                        interval += "S";
                        break;
                    case 1:
                        interval += "M";
                        break;     
                    case 2:
                        interval += "Tu";
                        break;
                    case 3:
                        interval += "W";
                        break;
                    case 4:
                        interval += "Tr";
                        break;
                    case 5:
                        interval += "F";
                        break;
                    case 6:
                        interval += "Sa";
                        break;
                } 
                
                if(index !== array.length - 1) {
                    interval += ", ";
                }
            });
        } 

        var todayCounts = this.props.currentCheckinStatus===null ? 1 : 0;

        var notedOutstanding = this.props.outstanding > todayCounts ? "Missed checkins" : null;

        return (
            <div className={"essentials status-" + this.props.currentCheckinStatus } >
                <BoolIcon action={this.doCheckin} status={this.props.currentCheckinStatus} />
                <div className="title-and-type">
                    <h2>{this.props.habit.title}</h2>
                    <span className="interval">{interval}</span> 
                    <span className="missed-checkins">
                        {notedOutstanding}
                    </span>
                    
                </div>
                
                <div className="meta">
                    <span className="score">{this.props.currentCheckin ? this.props.currentCheckin.score : ""}</span>
                    <MomentumIndicator habit_id={this.props.habit.id} />                 
                </div>
            </div>
        );
    }
}

export default Essentials;