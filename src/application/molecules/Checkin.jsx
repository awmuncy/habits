import React, { Component } from 'react';
import { IntervalFor } from '../store/ConnectedComponents';


class Checkin extends Component {

    constructor(props) {
        super(props);


    }

    render() {

        var args = [this, this.props.id,  this.props.checkin.checkinFor]        
        

        let icons;

        if(this.props.status!=null) {
            icons = (<span className="icon" onClick={this.props.checkIn.bind(...args, null)}></span>);
        } else {
            icons = (
                <React.Fragment>
                    <button aria-label="Yes, I did check in" className="check-yes" onClick={this.props.checkIn.bind(...args, true)}></button>
                    <button aria-label="No, I did not check in" className="check-no" onClick={this.props.checkIn.bind(...args, false)}></button>
                </React.Fragment>
            );            
        } 

        var note = this.props.checkin.note ? this.props.checkin.note : "No note";

        return (
            <li className={ (this.props.loading ? "loading" : "") + (this.props.status==true ? " did" : " didnt") + " checkin " + (this.props.checkin.bonus==true ? "bonus": "")}>
                <IntervalFor checkinFor={this.props.checkin.checkinFor} frame={this.props.frame} />
            
                <span className="score">{this.props.score}</span>         
                
                {icons}

            </li>
        );
    }
}


export default Checkin;