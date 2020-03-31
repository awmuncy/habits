import React, { Component } from 'react';

import {
  Route,
  Link,
  Switch
} from 'react-router-dom';




const NewHabit = () => {
  return (
    <React.Fragment>
      <Link to="/feedback">
        <button aria-label="Give feedback" className="fab-feedback"><i className="fa fa-comment"></i> </button>
      </Link>
      <Link to="/new"> 
        <button aria-label="Start a new habit"className="new-habit-button fab">
            +
        </button>
      </Link>
    </React.Fragment>
  );
};


const NewGoal = () => {
  return (
    <Link to="/new-goal"> 
      <button aria-label="Start a new habit" className="new-habit-button fab">
          +
      </button>
    </Link>
  );
};

const DefaultFAB = () => {
  return (
    <Link to="/feedback">
      <button aria-label="Give feedback" className="fab-feedback"><i className="fa fa-comment"></i> </button>
    </Link>
  )
}

class FloatingActionButton extends Component {

    constructor(props) {
        super(props);
    }



    render() {


        return (        
          <Switch>
            <Route path="/goals" component={NewGoal} />
            <Route path="/new" component={null} />
            <Route path="/habits" component={NewHabit} />
            <Route path="/home" component={NewHabit} />
            <Route component={DefaultFAB} />
          </Switch>
        );
    }
}

export default FloatingActionButton;