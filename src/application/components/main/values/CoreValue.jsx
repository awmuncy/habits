import React from 'react';
import { Link } from 'react-router-dom';


function CoreValue(props){


    return (
        <Link to={"/core-value/" + props.id}>
            <div className="core-value">
                <h2>{props.title}</h2>
                <span className="subtitle">
                    {props.content}
                </span>
            </div>
        </Link>
    );
}

export default CoreValue;