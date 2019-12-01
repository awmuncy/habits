import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class EditHabit extends Component {

    constructor(props) {
        super(props);
        this.state = {
			open: false,
        }
        this.startEdit = this.startEdit.bind(this);
        this.confirmDelete = this.confirmDelete.bind(this);

        this.startDelete = this.startDelete.bind(this);
        this.resetToDefault = this.resetToDefault.bind(this);
    }

    startEdit(e) {
    	this.setState({
    		open: "opened"
    	});
    }

    startDelete(e) {
        this.setState({
            open: "startDelete"
        });
    }

    resetToDefault(e) {
        this.setState({
            open: false
        });
    }


    confirmDelete(e) {
        this.props.RemoveHabit(this.props.habit_id);

        this.setState({
            open: "deleted"
        });
    }

    render() {

        let active;
        
        if(this.state.open=="deleted") return <Redirect to='/habits' />;


        switch(this.state.open) {
            case "startDelete": 
                active = (
                    <div className="confirm-delete">
                        <div className="actually-delete btn small dark" onClick={this.confirmDelete.bind(this)}>
                            Yes, get rid of it.
                        </div>
                        <div className="dont-delete btn small warning ghost" onClick={this.resetToDefault.bind(this)}>
                            Wait, nevermind.
                        </div>
                    </div>
                );

                break;
            case "opened": 
                active = (
                    <React.Fragment>
                        <div className="nevermind" onClick={this.resetToDefault.bind(this)}>
                            Nevermind
                        </div>
                        <div className="delete-this-habit" onClick={this.startDelete.bind(this)}>
                            Delete
                        </div>
                    </React.Fragment>
                );       
                break;
            default: 
                active = (
                    <div className="open-edit" onClick={this.startEdit.bind(this)}>
                        Edit habit
                        <i className="fa fa-pencil" aria-hidden="true"></i>
                    </div>
                );
        }

    	return (
            <div className="edit-habit">
                
            	{active}

            </div>
    	)
    }
}

export default EditHabit;