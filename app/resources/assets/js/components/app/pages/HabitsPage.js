import React, { Component } from 'react';

import { Challenges, Sorting } from '../../../store/ConnectedComponents';


function HabitsPage() {

    document.title = "Habits | HabitsApp";

    return (	
        <div className="home-layout">
            <Sorting />
            <Challenges />
        </div>
    );
}

export default HabitsPage;