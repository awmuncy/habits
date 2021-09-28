import React, { Component } from 'react';


class EssentialProgress extends Component {



  bar_styles(progress) {


    return {
      '--progress': progress
    };
  }


  render() {

    if (!this.props.checkin) { return null; }


    let l5_style = this.bar_styles(this.props.checkin.latest_five);
    let l15_style = this.bar_styles(this.props.checkin.latest_fifteen);
    let l30_style = this.bar_styles(this.props.checkin.latest_thirty);
    return (
      <div className='essential-progress-bars'>
        <div className='essential-progress essential-progress--five' style={l5_style}>
        </div>
        <div className='essential-progress essential-progress--fifteen' style={l15_style}>
        </div>
        <div className='essential-progress essential-progress--thirty' style={l30_style}>
        </div>
      </div>
    );
  }

}


export {
  EssentialProgress
};
