import React from 'react';
import { HeaderDefault } from '../store/ConnectedComponents.js';

function DefaultLayout(props) {

  return (
    <>
      <HeaderDefault />
      <div className='home-layout'>
        {props.children}
      </div>
    </>
  );
}

export {
  DefaultLayout
};
