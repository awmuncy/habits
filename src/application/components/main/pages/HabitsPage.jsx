import React, { Component } from 'react';

import { Habits, Sorting, HeaderDefault } from '../../../store/ConnectedComponents';


function HabitsPage() {

    document.title = "Habits | HabitsApp";

    return (	
        <>
            <HeaderDefault />
            <div className="home-layout">
                <Sorting />
                <Habits />
            </div>
        </>
    );
}

export default HabitsPage;