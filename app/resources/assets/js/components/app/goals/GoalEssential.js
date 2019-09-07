import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';


import { BoolIcon, TimeLeft } from '../../../store/ConnectedComponents';


class GoalEssential extends Component {

    constructor(props) {
        super(props);

        this.changeGoalStatus = this.changeGoalStatus.bind(this);
    }

    changeGoalStatus(e) {
        e.preventDefault();
        var goal = this.props.goal;
        var status = null;
        if(goal.status === null || goal.status === undefined) {
            status = true;
        } else if(goal.status=="true" || goal.status==true){
            status=false;
        }

        this.props.changeGoalStatus(status, goal.id);
    }

    render() {
        var goal = this.props.goal;
        var id = goal.id;
        var date = moment.unix(parseInt(goal.endDate) / 1000).format('MMMM Do');
        var date_formatted = moment.unix(parseInt(goal.endDate) / 1000).format('MM/DD/YYYY');



        return (
            <Link to={"/goal/" + id} className="goal">
                <div className="goal__essentials">
                    <div className="goal__dots">
                        <BoolIcon status={goal.status} action={this.changeGoalStatus} />
                    </div>                        
                    <div className="goal-meta">
                        <h2>{goal.title}</h2>
                        <div className="sub-meta">
                            <span className="core-values__label">
                                Healthy
                            </span>
                            <span className="timeframe">{date}</span>        
                        </div>
                    </div>

                    <TimeLeft date={date_formatted} />                        
                </div>
            </Link>
        );
    }
}

export default GoalEssential;