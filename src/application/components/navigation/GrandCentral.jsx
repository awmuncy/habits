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
  CoreValuesPage,
  SingleCoreValue,
  ArchivedHabitsPage,
  AccountPage,
  GetSubscription,
  Checkout,
  HeaderDefault
} from '../../store/ConnectedComponents';

import {
  Route,
  Switch
} from 'react-router-dom';

const FourOhFourPage = function() {
  document.title = "404 | HabitsApp";
  return (
    <>
      <HeaderDefault />
      <div>No page here. 404.</div>
    </>
  );
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
            <Route exact path="/archived-habits" component={ArchivedHabitsPage} />
            <Route exact path="/account" component={AccountPage} />
            <Route exact path="/get-subscription" component={GetSubscription} />
            <Route exact path="/checkout" component={Checkout} />

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