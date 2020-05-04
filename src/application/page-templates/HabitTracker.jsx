import React, { Component } from 'react';


import { NavSide, GrandCentral } from '../store/ConnectedComponents';

class HabitTracker extends Component {

    constructor(props) {
        super(props);
    }



    render() {


        return (
        
            <div className="habit-tracker">           
                <GrandCentral />            
                <NavSide />
            </div>

        );
    }
}

export default HabitTracker;