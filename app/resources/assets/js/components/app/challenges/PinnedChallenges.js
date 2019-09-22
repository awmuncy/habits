import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Essentials } from '../../../store/ConnectedComponents';




class PinnedChallenge extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        if (this.props.id == null) return null;
        return (
            <div className="pinned-challenge single-habit">
                <Link to={"habit/" + this.props.id}>
                    <Essentials habit_id={this.props.id} />
                </Link>
            </div>
        );
    }
}


class PinnedChallenges extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="pinned-challenges">
                {
                    this.props.pinned.map((pinned)=>{
                        return <PinnedChallenge id={pinned} key={pinned} />
                    })
                }
            </div>
        );
    }
}

export default PinnedChallenges;

            // <div className="pinned-challenge">
            //     Plus one. <i className="fa fa-thumb-tack"></i>
            // </div>