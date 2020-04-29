import React, { useState } from 'react';
import GetSubscription from './GetSubscription';
import { Link } from 'react-router-dom';

var AccountPage = props => {


    return (
        <div>
            <h1>Account</h1>
            <p>Name: Allen</p>
            <p>Joined: A long long time ago</p>
            <button class="btn btn--primary"><Link to="/get-subscription">Get Premium</Link></button>
        </div>
    )
}
export default AccountPage;