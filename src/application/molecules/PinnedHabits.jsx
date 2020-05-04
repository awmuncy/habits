import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Essentials } from '../store/ConnectedComponents';




class PinnedHabit extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        if (this.props.id == null) return null;
        return (
            <div className="pinned-habit single-habit">
                <Link to={"habit/" + this.props.id}>
                    <Essentials habit_id={this.props.id} />
                </Link>
            </div>
        );
    }
}


class PinnedHabits extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {

        if(this.props.pinned_habits.length===0) return null;

        return (
            <div className="pinned-habits">
                {
                    this.props.pinned_habits.map((pinned)=>{
                        return <PinnedHabit id={pinned} key={pinned} />
                    })
                }
            </div>
        );
    }
}

export default PinnedHabits;