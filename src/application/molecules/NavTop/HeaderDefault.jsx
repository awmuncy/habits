import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from '../../atoms/Link';
import { toggleNavigation } from '../../store/slices/navigationOpenSlice';

function HeaderDefault(props) {

  const dispatch = useDispatch();

  let NavContents;
  if (props.blank) {
    NavContents
                = <>
        <span />
        <h1 className='app-title'>HabCheck</h1>
        <span />
      </>
    ;
  } else {
    NavContents
                = <>
        <i className='fa fa-bars' aria-hidden='true' onClick={() => dispatch(toggleNavigation())}></i>

        <Link to={'/home'}><i className='fa fa-home' aria-hidden='true' ></i></Link>
      </>
    ;
  }


  return (
    <header className='app-header default'>
      <nav className='site-nav'>
        <div className='header-nav'>
          {NavContents}
        </div>
      </nav>
    </header>
  );
}

export {
  HeaderDefault
};
