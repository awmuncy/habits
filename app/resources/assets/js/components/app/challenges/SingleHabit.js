import React, { Component } from 'react';
import { Checkins, Essentials, EditChallenge } from '../../../store/ConnectedComponents';


class SingleHabit extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }


    render() {
        let checkins;

            checkins = <Checkins checkins={this.props.challenge.checkinSlots} habit_id={this.props.challenge.id} />;

        return (
            <div className="single-habit" id={"habit-" + this.props.challenge.id}>   
                <div className="habit-details">
                    <Essentials habit_id={this.props.challenge.id} />
                    {checkins}
  
                    <EditChallenge habit_id={this.props.challenge.id} />
                </div>            
            </div>
        );
    }
}


export default SingleHabit;