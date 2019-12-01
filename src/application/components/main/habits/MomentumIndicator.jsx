import React, { Component } from 'react';


class MomentumIndicator extends Component {

    constructor(props) {
        super(props);
    }


    render() {


        return (
            <i className={"fa fa-signal momentum-indicator momentum-" + this.props.momentum}><i className="fa fa-signal"></i></i>
        );
    }
}

export default MomentumIndicator;