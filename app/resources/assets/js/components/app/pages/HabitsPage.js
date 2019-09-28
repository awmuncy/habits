import React, { Component } from 'react';

import { Habits, Sorting } from '../../../store/ConnectedComponents';


function HabitsPage() {

    document.title = "Habits | HabitsApp";

    return (	
        <div className="home-layout">
            <Sorting />
            <Habits />
        </div>
    );
}

export default HabitsPage;