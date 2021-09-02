import React from 'react';


function BoolIcon(props) {

    var statusClass = "";
    
    if(props.pastDue==true) {
        statusClass = "failure-candidate";
    }   

    
    if(props.status==true) {
        var statusClass = "success";
    } else if(props.status==false) {
        statusClass = "failure";
    }

    return (
        <span className={"status-icon " + statusClass} onClick={props.action}></span>
    );
}

export {
    BoolIcon
};