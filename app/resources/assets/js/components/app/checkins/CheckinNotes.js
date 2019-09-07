import React, { Component } from 'react';

class CheckinNotes extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
    }

    render() {

        return (
            <div className="notes">
                Add Note
            </div>
        );
    }
}

export default CheckinNotes;