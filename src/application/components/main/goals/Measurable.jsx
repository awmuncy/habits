import React, { Component } from 'react';

class BoolIcon extends Component {
    constructor (props) {
        super(props);
    }

    render() {
        return (
            <span className="status-icon" onClick={this.doCheckin}></span>
        );
    }
}

export default BoolIcon;