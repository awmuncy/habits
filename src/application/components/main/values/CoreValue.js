import React from 'react';



function CoreValue(props){


    return (
        <div className="core-value">
            <h2>{props.title}</h2>
            <span className="subtitle">
                {props.content}
            </span>
        </div>
    );
}

export default CoreValue;