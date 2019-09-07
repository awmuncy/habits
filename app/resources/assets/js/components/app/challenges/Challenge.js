import React, { Component } from 'react';
import { SortableHandle } from 'react-sortable-hoc';
import { Link } from 'react-router-dom';

import { Essentials } from '../../../store/ConnectedComponents';




class Challenge extends Component {

    constructor(props) {
        super(props);

    }

    render() {
        
        var hide = this.props.challenge.filtered_out || this.props.challenge.checkinSlots.length==0 || this.props.challenge.deleted;
        var id = this.props.challenge.id;

        if(hide || this.props.pinned.includes(id.toString())){
            return <div></div>;
        }

        if(!this.props.challenge) return null;


        const SortHandle = SortableHandle(() => (
            <Link to={"habit/" + id}>
                <Essentials habit_id={id} />
            </Link>
        )); 

        return (
            <div className="single-habit" id={"habit-" + id}>   
                <SortHandle />                
            </div>
        );
    }
}


export default Challenge;