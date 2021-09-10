import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { S_HeaderDefault } from '../../store/connectors.js';

class C_HeaderDefault extends Component {

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
        var NavContents;
        if(this.props.blank) {
            NavContents = (
                <>
                <span />
                <h1 className="app-title">HabCheck</h1>
                <span />
                </>
            );
        } else {
            NavContents = (
                <>
                    <i className="fa fa-bars" aria-hidden="true" onClick={this.toggleNav}></i>
                    
                    <Link to={"/home"}><i className="fa fa-home" aria-hidden="true" ></i></Link>
                </>
            );
        }


        return (
            <header className="app-header">
                <nav className="site-nav">
                    <div className="header-nav">
                        {NavContents}
                    </div>                
                </nav>
            </header>
        );
    }
}

var HeaderDefault = connect(...S_HeaderDefault)(C_HeaderDefault);

export {
    HeaderDefault
};