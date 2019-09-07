import React, { Component } from 'react';
import {
  Route,
  Switch
} from 'react-router-dom';

import { HeaderDefault, HeadBack, ClosePane, GoalHeader } from "../../store/ConnectedComponents";




class Navigation extends Component {

    constructor(props) {

        super(props);
        this.state = {
            menuState : "minimized"
        }
        this.toggleNav = this.toggleNav.bind(this);
    }



    toggleNav() {
        this.props.toggleNav();
    }


    render() {


        return (

            <header className="app-header">
                <Switch>
                    <Route path="/new" component={HeadBack} />
                    <Route
                        path='/habit/:id'
                        render={(props) => <ClosePane {...props} />}
                    />
                    <Route 
                        path='/goal/:id'
                        component={GoalHeader}
                    />

                    <Route component={HeaderDefault} />
                </Switch>
            </header>

        );
    }
}

export default Navigation;