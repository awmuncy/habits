import React from 'react';

import {CoreValues} from '../../../store/ConnectedComponents';
import {DefineCoreValue} from '../../../store/ConnectedComponents';

const CoreValuesPage = function(props) {
    document.title = "Core Values | HabitsApp";

    return (
        <div className="home-layout">
            <CoreValues />
            <DefineCoreValue />
        </div>
    );
}

export default CoreValuesPage;