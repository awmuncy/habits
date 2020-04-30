import React, { Component } from 'react';

import { 
  NewHabit,
  SingleHabit,
  HeaderDefault
} from '../../store/ConnectedComponents';

import {
  HomePage,
  ArchivedHabitsPage,
  AccountPage,
  GetSubscriptionPage,
  CheckoutPage,
  HabitsPage,
  FAQPage, 
  FeedbackPage
} from '../../pages/pages';

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
            <Route exact path="/get-subscription" component={GetSubscriptionPage} />
            <Route exact path="/checkout" component={CheckoutPage} />

            <Route path="/habits" component={HabitsPage} />
            <Route path="/feedback" component={FeedbackPage} />
            <Route path="/new" component={NewHabit} />
            
            <Route
              path='/habit/:id'
              render={(props) => <SingleHabit {...props} />}
            />


            <Route path="/FAQ" component={FAQPage} />
            <Route component={FourOhFourPage} />
          </Switch>
        );

    }
}

export default GrandCentral;