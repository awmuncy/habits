import React, { Component, useEffect } from 'react';
import { HeaderDefault } from '../molecules/NavTop/HeaderDefault';



import {
  HomePage,
  AccountPage,
  HabitsPage,
  FAQPage,
  FeedbackPage,
  SingleHabitPage,
  LoginPage
} from '../pages/pages';

import {
  Route,
  Switch,
  useLocation
} from 'react-router-dom';

const FourOhFourPage = function() {
  document.title = '404 | HabitsApp';
  return (
    <>
      <HeaderDefault />
      <div>No page here. 404.</div>
    </>
  );
};



function GrandCentral(props) {
  const location = useLocation();
  useEffect(() => {
    if (window.pageIsRendering) {

      window.pageRenderComplete();
    }
  }, [location]);


  return (
    <Switch>
      <Route exact path='/' component={HomePage} />
      <Route exact path='/home' component={HomePage} />
      <Route exact path='/account' component={AccountPage} />
      <Route path='/habits' component={HabitsPage} />
      <Route path='/feedback' component={FeedbackPage} />
      <Route
        path='/habit/:id'
        render={(props) => <SingleHabitPage {...props} />}
      />


      <Route path='/FAQ' component={FAQPage} />

      <Route path='/login' component={LoginPage} />

      <Route component={FourOhFourPage} />
    </Switch>
  );


}

export {
  GrandCentral
};
