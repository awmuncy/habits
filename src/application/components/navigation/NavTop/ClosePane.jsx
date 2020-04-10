import React, { Component, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Permission from '../Permission';
import { Redirect } from 'react-router-dom';

var ClosePane = props => {
    var [deleted, deleteThis] = useState(false);
    if(deleted) return <Redirect to={"/home"}  />;

    var history = useHistory();
    var habit = props.match.params.id;
    var pin_icon;
    if(props.pinned_habits.includes(habit)) {
        pin_icon = <div onClick={()=>props.unpin(habit)}>Unpin</div>;
    } else if(props.pinned_habits.length==3) {
        pin_icon = '';
    } else {
        pin_icon = <i className="fa fa-thumb-tack" onClick={()=>props.pin(habit)}></i>
    }

    var deleteHabit = () => {
        if(confirm("Delete habit: are you sure? This operation cannot be undone.")) {
            if(confirm("You seem pretty sure. Seriously, delete?")) {
                props.removeHabit(habit);
                deleteThis(true);
            }
        }
    }

    return (
        <nav className="top-left-action-button header-nav">
            <i onClick={()=>history.goBack()} className="fa fa-arrow-left" aria-hidden="true"></i>
            <div className="ricons">
                <i onClick={()=>{confirm("Archive habit?")}} className="fa fa-archive" aria-hidden="true" ></i>
                <i onClick={deleteHabit} className="fa fa-trash" aria-hidden="true"></i>
            
                <Permission feature="pinned-habits">
                    {pin_icon}
                </Permission>
            </div>
        </nav>
    );
}

export default ClosePane;