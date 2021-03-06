import React, { Component } from 'react';
import jwt_decode from 'jwt-decode';
import { SAVE_USER } from '../../actions.js';
import { HeaderDefault } from '../store/ConnectedComponents.js';

function saveUser(token, subscription_type) {

  let action = {
    type             : SAVE_USER,
    token            : token,
    subscription_type: subscription_type
  };

  let message = {
    type   : 'dispatch',
    payload: action
  };
  navigator.serviceWorker.ready.then(sw => {
    sw.active.postMessage(message);
  });

}


class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {
      user    : '',
      password: ''
    };

    this.loginAction = this.loginAction.bind(this);
  }

  loginAction(e) {
    e.preventDefault();
    fetch('/api/auth/login', {
      method     : 'POST',
      credentials: 'same-origin',
      body       : JSON.stringify({password: this.state.password, email: this.state.user}),
      headers    : {
        'Content-Type'    : 'application/json',
        'Accept'          : 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      }
    }).then((response) => {
      return response.text();
    }).then((data)=> {
      let loginInfo = JSON.parse(data);
      if (loginInfo.token) {
        let token = loginInfo.token.slice(6);
        localStorage.setItem('mySecretToken', token);
        let detokenizedUser = jwt_decode(token);
        localStorage.setItem('user', detokenizedUser.name);
        saveUser(token, detokenizedUser.subscription_type);
        // (If service worker is installed, go home. Otherwise, go to install page, which directs home)?
        window.location.href = '/home';
      } else {
        console.warn('Login failed');
        alert('Login failed.');
      }
    });
  }

  render() {

    return (
      <>
        <HeaderDefault blank={true} />
        <div className='home-layout'>
          <div className='home-main'>
            <div className='login-page'>
              <form className='login-form' onSubmit={this.loginAction}>
                <input
                  type='text'
                  value={this.state.user}
                  placeholder='Email'
                  onChange={(e)=>this.setState({user: e.target.value})} />
                <input
                  type='password'
                  value={this.state.password}
                  placeholder='Password'
                  onChange={(e)=>this.setState({password: e.target.value})} />
                <div>
                  <a href='/#register' type='button' className='btn btn--ghost'>Register</a>
                  <button type='submit' className='btn primary'>Log in</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>

    );
  }
}

export default Login;
