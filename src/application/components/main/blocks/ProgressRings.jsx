import React, { Component } from 'react';


class ProgressRings extends Component {

	constructor(props) {
        super(props);
	}

	circle_styles(progress) {
		progress = progress > 1 ? 1 : progress;

		return {
			"--circle-1": progress > .5 ? .5 : progress,
			"--circle-2": progress > .5 ? progress - .5 : 0,
			"--circle-full": progress 
		};
	}

	render() {


		var l5_style = this.circle_styles(this.props.inner);
		var l15_style = this.circle_styles(this.props.middle);
		var l30_style = this.circle_styles(this.props.outer);
		return (
			<section className="dials">
			  <div className="dial large" style={l30_style}>
			    <div className="dial-background one"></div>
			    <div className="dial-container container1">
			      <div className="wedge"></div>
			    </div>
			    <div className="dial-container container2">
			      <div className="wedge"></div>
			    </div>
			    <div className="marker start"></div>  
			    <div className="marker end"></div>     
			  </div>

			  
			   <div className="dial medium" style={l15_style}>
			    <div className="dial-background one"></div>
			    <div className="dial-container container1">
			      <div className="wedge"></div>
			    </div>
			    <div className="dial-container container2"> 
			      <div className="wedge"></div>
			    </div>
			    <div className="marker start"></div>   
			    <div className="marker end"></div>      
			  </div>

			  
			   <div className="dial small" style={l5_style}>
			    <div className="dial-background one"></div>
			    <div className="dial-container container1">
			      <div className="wedge"></div>
			    </div>
			    <div className="dial-container container2">
			      <div className="wedge"></div>
			    </div>
			    <div className="marker start"></div>  
			    <div className="marker end"></div>     
			  </div> 
			  
			</section>
		);
	}

}


export default ProgressRings;