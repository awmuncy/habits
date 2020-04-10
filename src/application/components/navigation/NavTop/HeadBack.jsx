import React, { Component } from 'react';
import { Link, useHistory } from 'react-router-dom';


export default props => {

    var history = useHistory();


    return (
        <nav className="top-left-action-button header-nav">
            <i onClick={()=>history.goBack()} className="fa fa-arrow-left" aria-hidden="true"></i>
        </nav>
    );

}