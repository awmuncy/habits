import React  from 'react';

import {SortableContainer, SortableElement, arrayMove, SortableHandle} from 'react-sortable-hoc';


const SortablePlank = SortableElement(({plank, component}) => {

    var Component = component;
    return (<Component id={plank.id} {...plank} />)
});



const SortablePlankContainer = SortableContainer(({planks, component}) => {

    if(!Array.isArray(planks)) planks = [];


    return (
        <div className="plank-list">
            {planks.map((plank, index) => (
                <SortablePlank key={plank.id} index={index} plank={plank} component={component} />
            ))}
        </div>
    );
});

function SortablePlanks(props) {

    var onSortEnd = props.onSortEnd ? props.onSortEnd : () => {};

    return (

        <div className={"planks " + props.wrapperClass }>
            <SortablePlankContainer
                helperClass="SortableHelper" 
                lockAxis="y"
                pressDelay={200}
                
                planks={props.items}
                onSortEnd={onSortEnd}
                component={props.component}
            />
        </div>
    );
}

export default SortablePlanks;