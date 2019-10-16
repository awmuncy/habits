import React, { Component } from 'react';

import { NavSide } from '../../../store/ConnectedComponents';



class HeaderDefault extends Component {

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
            <nav className="site-nav">
                <div className="header-nav">
                    <i className="fa fa-bars" aria-hidden="true" onClick={this.toggleNav}></i>
                    <h1 className="app-title">HabCheck</h1>
                    <i className="fa fa-bell-o disabled" aria-hidden="true" ></i>
                </div>
                <NavSide />
            </nav>
        );
    }
}

export default HeaderDefault;

