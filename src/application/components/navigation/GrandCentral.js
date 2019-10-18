import React, { Component } from 'react';

import { 
  HomePage,
  FAQ, 
  Feedback,
  NewHabit,
  NewGoal, 
  SingleHabit, 
  GoalsPage, 
  GoalSingle,
  HabitsPage,
  Login,
  CoreValuesPage,
  SingleCoreValue
} from '../../store/ConnectedComponents';

import {
  Route,
  Switch
} from 'react-router-dom';

const FourOhFourPage = function() {
  document.title = "404 | HabitsApp";
  return <div>No page here. 404.</div>
}

class GrandCentral extends Component {


    constructor(props) {
        super(props);

    }


    render() {

        return(
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/home" component={HomePage} />

            <Route path="/login" component={Login} />

            <Route path="/habits" component={HabitsPage} />
            <Route path="/feedback" component={Feedback} />
            <Route path="/new" component={NewHabit} />
            <Route path="/new-goal" component={NewGoal} />
            <Route
              path='/habit/:id'
              render={(props) => <SingleHabit {...props} />}
            />
            <Route 
                path='/goal/:id'
                component={GoalSingle}
            />
            <Route 
                path='/core-value/:id'
                component={SingleCoreValue}
            />
            <Route 
                path='/goals'
                component={GoalsPage}
            />
            <Route path="/core-values" component={CoreValuesPage} />
            <Route path="/FAQ" component={FAQ} />
            <Route component={FourOhFourPage} />
          </Switch>
        );

    }
}

export default GrandCentral;