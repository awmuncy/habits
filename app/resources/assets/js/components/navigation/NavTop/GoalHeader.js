import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class HeadBack extends Component {

    constructor(props) {
        super(props);
    }


    render() {


        return (
            <nav className="back-with-icons header-nav">
                <Link to="/goals">
                    <i className="fa fa-angle-left top-left-action-button" aria-hidden="true"></i>
                </Link>
                <Link to="/home">
                    <i className="fa fa-close" aria-hidden="true"></i>
                </Link>
                <Link to="/home">
                    <i className="fa fa-close" aria-hidden="true"></i>
                </Link>
                <Link to="/home">
                    <i className="fa fa-close" aria-hidden="true"></i>
                </Link>
            </nav>
        );
    }
}

export default HeadBack;