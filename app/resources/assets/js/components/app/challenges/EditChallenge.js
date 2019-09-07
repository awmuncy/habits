import React, { Component } from 'react';

class EditChallenge extends Component {

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
        this.props.RemoveChallenge(this.props.habit_id);

        this.setState({
            open: "deleted"
        });
    }

    render() {

    	let active;


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
                        <div className="delete-this-challenge" onClick={this.startDelete.bind(this)}>
                            Delete
                        </div>
                    </React.Fragment>
                );       
                break;
            default: 
                active = (
                    <div className="open-edit" onClick={this.startEdit.bind(this)}>
                        Edit challenge
                        <i className="fa fa-pencil" aria-hidden="true"></i>
                    </div>
                );
        }

    	return (
            <div className="edit-challenge">
                
            	{active}

            </div>
    	)
    }
}

export default EditChallenge;