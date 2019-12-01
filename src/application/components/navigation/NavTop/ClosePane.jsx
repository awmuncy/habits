import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class ClosePane extends Component {

    constructor(props) {
        super(props);
    }



    render() {
        var habit = this.props.match.params.id;
        var pin_icon;
        if(this.props.pinned_habits.includes(habit)) {
            pin_icon = <div onClick={()=>this.props.unpin(habit)}>Unpin</div>;
        } else if(this.props.pinned_habits.length==3) {
            pin_icon = '';
        } else {
            pin_icon = <i className="fa fa-thumb-tack" onClick={()=>this.props.pin(habit)}></i>
        }

        return (
            <nav className="top-left-action-button header-nav">
                <Link to="/home">
                    <i className="fa fa-angle-left" aria-hidden="true"></i>
                </Link>
                {pin_icon}
            </nav>
        );
    }
}

export default ClosePane;