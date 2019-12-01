import React, { Component } from 'react';


import { NavTop, NavBottom, GrandCentral, FloatingActionButton } from '../../store/ConnectedComponents';


class HabitTracker extends Component {

    constructor(props) {
        super(props);
    }



    render() {


        return (
        
            <div className="habit-tracker">
                <NavTop />
                <main>
                  <GrandCentral />
                  <FloatingActionButton />
                </main>
            </div>

        );
    }
}

export default HabitTracker;