import React from 'react';
import { SortablePlanks, CoreValue } from '../../../store/ConnectedComponents';
import { arrayMove } from 'react-sortable-hoc';



function CoreValues(props) {

    function onSortEnd({oldIndex, newIndex}) { 
        var list = arrayMove(props.core_values, oldIndex, newIndex); 
        // props.sortCoreValues(list);
    }

    return (
        <SortablePlanks items={props.core_values} component={CoreValue} onSortEnd={onSortEnd} wrapperClass="core-values" />
    );
}

export default CoreValues;