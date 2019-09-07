import React, { useState } from 'react';
import ReactDOM from 'react-dom';


const Login = function(props) {

    const [tab, toggleTab] = useState('register-selected');
    
    var switchToRegister = () => {
        toggleTab("register-selected");
    }

    var switchToLogin = () => {
        toggleTab("login-selected");
    }

    return (

        <div class={"login-register-component " + tab}>
            <span>Get started building your habits now!</span>
            <button id="register-side" onClick={switchToRegister}>Register</button>
            <button id="login-side" onClick={switchToLogin}>Log in</button>
            <div class="register-side">
            <h2>Register</h2>
                <form method="POST" action="" aria-label="Register">

                    <div class="form-group row">
                        <label for="name" class="col-md-4 col-form-label text-md-right">Name</label>

                        <div class="col-md-6">
                            <input id="name" type="text" class="form-control" name="name" value="" required placeholder="Johnny Appleseed" />
                        </div>
                    </div>

                    <div class="form-group row">
                        <label for="email" class="col-md-4 col-form-label text-md-right">E-Mail Address</label>

                        <div class="col-md-6">
                            <input id="email" placeholder="example@example.com" type="email" class="form-control" name="email" value="" required />

                        </div>
                    </div>

                    <div class="form-group row">
                        <label for="register-password" class="col-md-4 col-form-label text-md-right">Password</label>

                        <div class="col-md-6">
                            <input id="register-password" placeholder="Be clever" type="password" class="form-control" name="password" required />

                        </div>
                    </div>

                    <div class="form-group row">
                        <label for="password-confirm" class="col-md-4 col-form-label text-md-right">Confirm Password</label>

                        <div class="col-md-6">
                            <input id="password-confirm" type="password" placeholder="Remember how clever you were?" class="form-control" name="password_confirmation" required />
                        </div>
                    </div>

                    <div class="form-group row mb-0">
                        <div class="col-md-6 offset-md-4">
                            <button type="submit" class="btn btn-primary">
                                Register
                            </button>
                        </div>
                    </div>
                </form>
            </div>

            <div class="login-side">
                <h2>Log in</h2>
                <form method="POST" action="" arial-label="login">

                    <div class="form-group">
                        <label for="register-email">E-mail Address</label>
                        <input type="email" id="register-email" name="email" class="form-control" value="" required />


                    </div>
                        

                    <div class="form-group">
                        <label for="login-password">Password</label>
                        <input id="login-password" type="password" class="form-control" name="password" required />


                    </div>

                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" name="remember" id="remember" checked />

                        <label class="form-check-label" for="remember">
                            Remember Me
                        </label>
                    </div>

                    <button type="submit" class="btn btn-primary">
                        Login
                    </button>

                    <a class="btn ghost secondary forgot-password" href="">
                        Forgot Your Password?
                    </a>

                </form>

            </div>
        </div>

    );
}



if (document.getElementById('login-register-app')) {
    ReactDOM.render(    	
		  <Login />
		, 
	  document.getElementById('login-register-app'));
}
