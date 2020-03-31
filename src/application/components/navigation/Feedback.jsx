import React, { Component } from 'react';

class Feedback extends Component {

	componentDidMount(){
		this.nameInput.focus(); 
	 }

	
	render() {
		return (
			<div className="feedback">
				<p>Thanks in advance, feedback is great</p>
				<form action="/feedback" method="POST">
					<textarea ref={input=>this.nameInput=input} name="feedback" placeholder="Your feedback..."></textarea>
					<input type="hidden" name="userToken" value={localStorage.getItem("id")} />
					<button className="btn btn-primary" type="submit">Submit</button>
				</form>
			</div>
		);
	}

}

export default Feedback;