import React from 'react';

import {CoreValues} from '../../../store/ConnectedComponents';
import {NewCoreValue} from '../../../store/ConnectedComponents';

const CoreValuesPage = function(props) {
    document.title = "Core Values | HabitsApp";

    return (
        <div className="home-layout">
            <CoreValues />
            <NewCoreValue />
        </div>
    );
}

export default CoreValuesPage;