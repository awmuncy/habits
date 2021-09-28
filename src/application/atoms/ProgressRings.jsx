import React, { Component } from 'react';


let ProgressRings = props => {



  let circle_styles = function(progress) {
    progress = progress > 1 ? 1 : progress;

    return {
      '--circle-1'   : progress > 0.5 ? 0.5 : progress,
      '--circle-2'   : progress > 0.5 ? progress - 0.5 : 0,
      '--circle-full': progress
    };
  };

  let dial_complete = props.inner >= 1 && props.middle >= 1 && props.outer >= 1;

  let l5_style = circle_styles(props.inner);
  let l15_style = circle_styles(props.middle);
  let l30_style = circle_styles(props.outer);
  return (
    <section className={dial_complete ? 'dials dial-complete' : 'dials'}>
      <div className='dial large' style={l30_style}>
        <div className='dial-background one'></div>
        <div className='dial-container container1'>
          <div className='wedge'></div>
        </div>
        <div className='dial-container container2'>
          <div className='wedge'></div>
        </div>
        <div className='marker start'></div>
        <div className='marker end'></div>
      </div>


      <div className='dial medium' style={l15_style}>
        <div className='dial-background one'></div>
        <div className='dial-container container1'>
          <div className='wedge'></div>
        </div>
        <div className='dial-container container2'>
          <div className='wedge'></div>
        </div>
        <div className='marker start'></div>
        <div className='marker end'></div>
      </div>


      <div className='dial small' style={l5_style}>
        <div className='dial-background one'></div>
        <div className='dial-container container1'>
          <div className='wedge'></div>
        </div>
        <div className='dial-container container2'>
          <div className='wedge'></div>
        </div>
        <div className='marker start'></div>
        <div className='marker end'></div>
      </div>

    </section>
  );
};



export default ProgressRings;
