import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from '../atoms/Link';
import ReactDOM from 'react-dom';
import { toggleNavigation } from '../store/slices/navigationOpenSlice';

function NavItem(props) {

  let [subNavOpen, setSubNavOpen] = useState(false);

  return (
    <li className={props.className + ' navitem'}>
      <div className='link-container'>
        <Link to={props.path} action={props.closeMenu}>
          <i className={`fa ${props.icon}`} aria-hidden='true'></i>
          {props.text}
        </Link>
        {props.children
        // eslint-disable-next-line
        && <i className={`fa fa-chevron-${subNavOpen ? 'down' : 'right'}`} onClick={e=>setSubNavOpen(!subNavOpen)}></i>
        }
      </div>
      {props.children && subNavOpen
                && <ul className='subnav'>
                  {props.children}
                </ul>
      }
    </li>
  );
}



function SubnavItem(props) {
  return (
    <li>
      <Link to={props.path} onClick={props.closeMenu}>
        {props.text}
      </Link>
    </li>
  );
}

function Curtain(props) {
  const dispatch = useDispatch();
  return ReactDOM.createPortal(
    <div className='curtain' onClick={()=>dispatch(toggleNavigation())}></div>,
    document.getElementById('modal-portal')
  );
}

function logout(e) {
  e.preventDefault();
  localStorage.removeItem('user');
  localStorage.removeItem('mySecretToken');
  window.location.href = '/';
  this.props.logout();
}


function NavSide(props) {

  const menuOpen = useSelector(store=>store.navigationOpen);
  let menuClass = menuOpen ? 'open' : 'closed';
  const curtain = menuOpen ? <Curtain /> : null;

  return (
    <div className={'app-navigation ' + menuClass}>
      <header className='overview'>
        <i className='fa fa-user-circle-o' aria-hidden='true'></i> {localStorage.getItem('user')}
      </header>

      {curtain}

      <ul className='places'>
        <NavItem path='/home' icon='fa-home' text='Home' />
        <NavItem path='/habits' icon='fa-rotate-left' text='Habits'>
          <SubnavItem path='/new-habit' text='New Habit' />
          <SubnavItem path='/archived-habits' text='Archived Habits' />
        </NavItem>
        <NavItem path='/FAQ' icon='fa-question-circle' text='Help' />
        <NavItem path='/feedback' icon='fa-commenting' text='Feedback' />
        <NavItem path='/account' icon='fa-user' text='Account' />
        <NavItem path='/get-subscription' icon='fa-trophy' text='Upgrade to premium ' className='gold' />
        <hr />

      </ul>
      <footer className='underview'>
        <div className='version'>
                        Habit Builder pre-alpha release 0.0.72
        </div>
        <div className='logout-section'>
          <a href='/logout'
            onClick={logout}>
                Logout
          </a>
        </div>
      </footer>
    </div>
  );

}

export {
  NavSide
};
