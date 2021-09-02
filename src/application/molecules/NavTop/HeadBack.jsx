import React from 'react';
import { useHistory } from 'react-router-dom';


var HeadBack = props => {

    var history = useHistory();


    return (
        <header className="app-header">
            <nav className="top-left-action-button header-nav">
                <i onClick={()=>history.goBack()} className="fa fa-arrow-left" aria-hidden="true"></i>
            </nav>
        </header>
    );

}

export {
    HeadBack
};