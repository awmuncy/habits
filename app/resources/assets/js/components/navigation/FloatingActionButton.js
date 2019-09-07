import React, { Component } from 'react';

import {
  Route,
  Link,
  Switch
} from 'react-router-dom';




const NewHabit = () => {
  return (
    <Link to="/new"> 
      <button aria-label="Start a new challenge"className="new-challenge-button fab">
          +
      </button>
    </Link>
  );
};


const NewGoal = () => {
  return (
    <Link to="/new-goal"> 
      <button aria-label="Start a new challenge" className="new-challenge-button fab">
          +
      </button>
    </Link>
  );
};


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
            
          </Switch>
        );
    }
}

export default FloatingActionButton;