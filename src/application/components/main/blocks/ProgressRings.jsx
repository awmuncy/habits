import React, { Component } from 'react';


var ProgressRings = props => {



	var circle_styles = function(progress) {
		progress = progress > 1 ? 1 : progress;

		return {
			"--circle-1": progress > .5 ? .5 : progress,
			"--circle-2": progress > .5 ? progress - .5 : 0,
			"--circle-full": progress 
		};
	}

	var dial_complete = (props.inner>=1 && props.middle>=1 && props.outer>=1);

	var l5_style = circle_styles(props.inner);
	var l15_style = circle_styles(props.middle);
	var l30_style = circle_styles(props.outer);
	return (
		<section className={dial_complete ? "dials dial-complete" : "dials"}>
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



export default ProgressRings;