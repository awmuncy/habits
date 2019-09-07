import React, { Component } from 'react';

class AssociatedItems extends Component {

    constructor(props) {
        super(props);


    }

    render() {
        var associations = this.props.associations;

        return (
            <label>
                {this.props.type}
                <select className="associated-items" multiple name={"associated-" + this.props.slug}>
                    {
                        associations.map((habit) => {
                            return (
                                <option value={habit.id}>{habit.title}</option>
                            );
                        })
                    }
                </select>
            </label>
        );
    }
}

export default AssociatedItems;