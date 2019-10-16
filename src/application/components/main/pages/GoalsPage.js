import React from 'react';
import { Goals } from '../../../store/ConnectedComponents';

import {
    Route,
    Link,
    Switch
  } from 'react-router-dom';

function GoalsPage(props) {

    document.title = "Goals | HabitApp";

    return (
        <div className="home-layout">
            <div>
                <Link to="/goals">
                    All
                </Link>
                <Link to="/goals/open">
                    Open
                </Link>
                <Link to="/goals/completed">
                    Completed
                </Link>
                <Link to="/goals/failures">
                    Failures
                </Link>
            </div>
            <div className="goals">
                <div className="goals__sort">
                
                </div>
                <Switch>            
                    <Route path="/goals/completed" component={()=><Goals filters={{status: [null, false, undefined]}} />} />
                    <Route path="/goals" component={Goals}  />
                </Switch>                      
            </div>
        </div>
    );
    
}


export default GoalsPage;