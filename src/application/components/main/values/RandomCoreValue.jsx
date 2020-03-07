import React from 'react';
import { Link } from 'react-router-dom';



function random(mn, mx) {  
    return Math.random() * (mx - mn) + mn;  
}  

function RandomCoreValue(props) {


    var cv_to_feature = props.core_values[Math.floor(random(1, props.core_values.length))-1];

    if(!cv_to_feature) return null;

    return (
        <div className="featured-core-values">
            <Link to={"/core-values"}>
                <div class="featured-core-value">
                    <h2>{cv_to_feature.title}</h2>
                    <p>{cv_to_feature.content}</p>
                </div>
            </Link>
        </div>
    );
}

export default RandomCoreValue;