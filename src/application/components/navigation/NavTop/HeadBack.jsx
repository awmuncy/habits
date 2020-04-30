import React from 'react';
import { Link, useHistory } from 'react-router-dom';


export default props => {

    var history = useHistory();


    return (
        <header className="app-header">
            <nav className="top-left-action-button header-nav">
                <i onClick={()=>history.goBack()} className="fa fa-arrow-left" aria-hidden="true"></i>
            </nav>
        </header>
    );

}