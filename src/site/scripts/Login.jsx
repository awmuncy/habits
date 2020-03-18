import React, { Component } from 'react';
import jwt_decode from 'jwt-decode';
import { SAVE_USER } from '../../actions';

function saveUser(token) {

    var action = {
        type: SAVE_USER,
        token: token
    };

    var message = {
        type: "dispatch",
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
            user: "",
            password: ""
        }

        this.loginAction = this.loginAction.bind(this);
    }

    loginAction(e) {
        e.preventDefault();
        fetch('/api/users/login', {
            method: 'POST',  
            credentials: "same-origin",
            body: JSON.stringify({password: this.state.password, email: this.state.user}),
            headers: {
                'Content-Type': 'application/json',
                "Accept": "application/json",
                "X-Requested-With": "XMLHttpRequest",
                'X-CSRF-TOKEN': document.csrf
            }
        }).then((response) => {
            return response.text();
        }).then((data)=> {
            var loginInfo = JSON.parse(data);
            if(loginInfo.token) {
                var token = loginInfo.token.slice(6);
                localStorage.setItem("mySecretToken", token);
                var detokenizedUser = jwt_decode(token);
                localStorage.setItem("user", detokenizedUser.name);
                saveUser(token);
                window.location.href = "/home";
            } else {
                console.log("Login failed");
            }
        });
    }

    render() {

        document.title = "Login | HabitsApp";

        return (
            <div className="login-page">
                <form className="login-form" onSubmit={this.loginAction}>
                    <input type="text" value={this.state.user} placeholder="User" onChange={(e)=>this.setState({user: e.target.value})} />
                    <input type="password" value={this.state.password} placeholder="Password" onChange={(e)=>this.setState({password: e.target.value})} />
                    <div>
                        <button type="submit" className="btn primary">Log in</button>
                        <button type="button" className="btn btn--secondary">Register</button>                
                    </div>
                </form>
            </div>
        );
    }
}

export default Login;