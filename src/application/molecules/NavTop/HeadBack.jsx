import React from 'react';
import { useHistory } from 'react-router-dom';
import { pageTransition } from '../../lib/pageTransition';


let HeadBack = props => {

  let history = useHistory();


  return (
    <header className='app-header'>
      <nav className='top-left-action-button header-nav'>
        <i onClick={()=>pageTransition().then(()=>history.goBack()) }
          className='fa fa-arrow-left' aria-hidden='true'></i>
      </nav>
    </header>
  );

};

export {
  HeadBack
};
