import React, { Component } from 'react';
import jwt_decode from 'jwt-decode';


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
                this.props.saveUser(token);
                this.props.history.push('/');
            } else {
                console.log("Failure");
            }
        });
    }

    render() {

        document.title = "Login | HabitsApp";

        return (
            <div className="login-page">
                <form onSubmit={this.loginAction}>
                    <input type="text" value={this.state.user} placeholder="User" onChange={(e)=>this.setState({user: e.target.value})} />
                    <input type="password" value={this.state.password} placeholder="Password" onChange={(e)=>this.setState({password: e.target.value})} />
                    <button type="submit">Log in</button>
                </form>
            </div>
        );
    }
}

export default Login;