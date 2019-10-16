import React, { Component } from 'react';

class Feedback extends Component {

	render() {
		return (
			<div className="feedback">
				For now, we email. Email goes to Allen@AllenMuncy.com <br /> 
				<a href="mailto:Allen@AllenMuncy.com?subject=Habit%20App%3A%20Feedback%20from%20a%20user&body=Hi%20Allen%2C%0A%0AI've%20got%20feedback%20for%20you.%20%0A%0A." className="btn btn--lg">Start email</a>
			</div>
		);
	}

}

export default Feedback;