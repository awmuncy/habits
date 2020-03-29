import React, { useState } from 'react';

var FormError = props => {
    return props.error ? (
        <div className="form-error">
            { props.error }
        </div>
    ) : null;
}

const Register = function(props) {

    var [formResponse, setFormResponse] = useState({});
    var [password, setPassword] = useState("");
    var [email, setEmail] = useState("");
    var [name, setName] = useState("");
    var [password2, setPassword2] = useState("");

    var [success, setSuccess] = useState(false);

    var registerAction = e => {
        e.preventDefault();
        fetch('/api/users/register', {
            method: 'POST',  
            credentials: "same-origin",
            body: JSON.stringify({
                password: password, 
                email: email,
                password2: password2,
                name: name
            }),
            headers: {
                'Content-Type': 'application/json',
                "Accept": "application/json",
                "X-Requested-With": "XMLHttpRequest",
                'X-CSRF-TOKEN': document.csrf
            }
        }).then((response) => {
            return response.json();
        }).then((registerInfo)=> {
            if(registerInfo.success) {
                setSuccess(true);
            } else {
                setFormResponse(registerInfo);
            }
            
            console.log(registerInfo);
        });
    }

    if(success) {
        return (
            <div className="register-form">
                <div className="register-side">
                    <h2>Success! You can now <a href="/login">login</a>.</h2>
                    <a href="/login" className="btn btn-primary btn--lg">Login</a>
                </div>
            </div>
        )
    }

    return (

        <div className="register-form">
            <div className="register-side">
            <h2>Start building habits</h2>
                <form method="POST" onSubmit={registerAction} aria-label="Register">

                    <div className="form-group row">
                        <label htmlFor="name" className="col-md-4 col-form-label text-md-right">Name</label>

                        <div className="col-md-6">
                            <input id="name" value={name} onChange={e=>setName(e.target.value)} type="text" className="form-control" name="name" required placeholder="Johnny Appleseed" />
                        </div>
                        <FormError error={formResponse.name} />
                    </div>

                    <div className="form-group row">
                        <label htmlFor="email" className="col-md-4 col-form-label text-md-right">E-Mail Address</label>

                        <div className="col-md-6">
                            <input id="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="example@example.com" type="email" className="form-control" name="email" required />

                        </div>
                        <FormError error={formResponse.email} />
                    </div>

                    <div className="form-group row">
                        <label htmlFor="register-password" className="col-md-4 col-form-label text-md-right">Password</label>

                        <div className="col-md-6">
                            <input id="register-password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Be clever" type="password" className="form-control" name="password" required />
                        </div>
                        <FormError error={formResponse.password} />
                    </div>

                    <div className="form-group row">
                        <label htmlFor="password-confirm" className="col-md-4 col-form-label text-md-right">Confirm Password</label>

                        <div className="col-md-6">
                            <input id="password-confirm" value={password2} onChange={e=>setPassword2(e.target.value)} type="password" placeholder="Remember how clever you were?" className="form-control" name="password2" required />
                        </div>
                        <FormError error={formResponse.password2} />
                    </div>

                    <div className="form-group row mb-0">
                        <div className="col-md-6 offset-md-4">
                            <button type="submit" className="btn btn-primary">
                                Create your account
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>

    );
}

export default Register;