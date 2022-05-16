import React, { Component, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from '../atoms/Link';
import Permission from '../atoms/Permission.jsx';
import NavItemConnector from '../store/connections/NavItem.js';
import NavSideConnector from '../store/connections/NavSide.js';
import ReactDOM from 'react-dom';

function NavItemComponent(props) {

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

let NavItem = connect(...NavItemConnector)(NavItemComponent);
let SubnavItem = connect(...NavItemConnector)(SubnavItemComponent);

function SubnavItemComponent(props) {
  return (
    <li>
      <Link to={props.path} onClick={props.closeMenu}>
        {props.text}
      </Link>
    </li>
  );
}

function Curtain(props) {
  return ReactDOM.createPortal(
    <div className='curtain' onClick={() => { 
      props.closeMenu()}
    }></div>,
    document.getElementById('modal-portal')
  );
}

class C_NavSide extends Component {

  constructor(props) {
    super(props);

    this.startSync = this.startSync.bind(this);
  }

  logout(e) {
    e.preventDefault();
    // Delete database
    localStorage.removeItem('user');
    localStorage.removeItem('mySecretToken');
    window.location.href = '/';
    this.props.logout();
  }

  startSync() {
    this.props.startSync();
  }

  render() {

    let menuClass = this.props.menuState ? 'open' : 'closed';
    const curtain = this.props.menuState ? <Curtain closeMenu={this.props.closeMenu} /> : null;

    let syncStatusMessage;
    switch (this.props.syncStatus) {
    case 'underway':
      syncStatusMessage = 'Trying Sync';
      break;
    case 'complete':
      syncStatusMessage = 'Synced';
      break;
    case 'failed':
      syncStatusMessage = 'Not Synced';
      break;
    case 'start':
      syncStatusMessage = 'Starting Sync';
      break;
    default:
      syncStatusMessage = 'Sync';
    }


    return (



      <div className={'app-navigation ' + menuClass}>
        <header className='overview'>
          <i className='fa fa-user-circle-o' aria-hidden='true'></i> {localStorage.getItem('user')}
        </header>

        {/* eslint-disable-next-line */}
        
        {curtain}

        <ul className='places'>
          <NavItem path='/home' icon='fa-home' text='Home' />
          <NavItem path='/habits' icon='fa-rotate-left' text='Habits'>
            <SubnavItem path='/new-habit' text='New Habit' />
            <SubnavItem path='/archived-habits' text='Archived Habits' />
          </NavItem>
          <Permission feature='recalls'>
            <NavItem path='/recalls' icon='fa-microchip' text='Recall'>
              <SubnavItem path='/new-recall' text='New Recall' />
            </NavItem>
          </Permission>
          <NavItem path='/FAQ' icon='fa-question-circle' text='Help' />
          <NavItem path='/feedback' icon='fa-commenting' text='Feedback' />
          <NavItem path='/account' icon='fa-user' text='Account' />
          <NavItem path='/get-subscription' icon='fa-trophy' text='Upgrade to premium ' className='gold' />
          <hr />
          {/* eslint-disable-next-line */}
          <li className={'sync-status ' + this.props.syncStatus} onClick={()=>this.props.startSync()} >
            <div className='link-container'>
              <i className='fa fa-refresh' aria-hidden='true'></i>
              <span className='sync-status-text'>{syncStatusMessage}</span>
            </div>
          </li>

        </ul>
        <footer className='underview'>
          <div className='version'>
                        Habit Builder pre-alpha release 0.0.72
          </div>
          <div className='logout-section'>
            <a href='/logout'
              onClick={this.logout.bind(this)}>
                Logout
            </a>
          </div>
        </footer>
      </div>

    );
  }
}


const NavSide = connect(...NavSideConnector)(C_NavSide);

export {
  NavSide
};
