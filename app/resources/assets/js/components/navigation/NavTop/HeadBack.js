import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class HeadBack extends Component {

    constructor(props) {
        super(props);
    }


    render() {


        return (
            <nav className="top-left-action-button header-nav">
                <Link to="/home">
                    <i className="fa fa-close" aria-hidden="true"></i>
                </Link>
            </nav>
        );
    }
}

export default HeadBack;