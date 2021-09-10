import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import { HeaderDefault } from '../store/ConnectedComponents.js';

var AccountPage = props => {


    return (
        <>
            <HeaderDefault />
            <div>
                <h1>Account</h1>
                <p>Name: Allen</p>
                <p>Joined: A long long time ago</p>
                <button class="btn btn--primary"><Link to="/get-subscription">Get Premium</Link></button>
            </div>
        </>
    )
}
export default AccountPage;