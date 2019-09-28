import React, { Component } from 'react';

class AssociatedItems extends Component {

    constructor(props) {
        super(props);

    }



    render() {
        var id_orig = this.props.id;
        var allAssociations = this.props.associations;
        var habits = this.props.habits;
        var associated_items = [];

        allAssociations.forEach(couple => {
            if(couple[1]==id_orig) {
                couple.reverse();
            }
            if(item[0]==id_orig) {
                associated_items.push(item[1]);
            }
        });

        return (
            associated_items.map( id => {
                <Habit id={id} />
                <Goal id={id} />
                <ToDo id={id} />
                <CoreValue id={id} />
            });
        );
    }
}

export default AssociatedItems;