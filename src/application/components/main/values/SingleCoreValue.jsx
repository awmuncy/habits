import React from 'react';
import { DefineCoreValue, CoreValue } from '../../../store/ConnectedComponents';

const SingleCoreValue = props => {

    var id = props.match.params.id;

    return (
        <div className="single-core-value" id={"habit-" + id}>   
            <div className="single-details">
                <CoreValue id={id} />
                <DefineCoreValue id={id} />
            </div>            
        </div>
    );
}

export default SingleCoreValue;