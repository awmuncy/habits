import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import { HeaderDefault } from '../molecules/NavTop/HeaderDefault';

let AccountPage = props => {


  return (
    <>
      <HeaderDefault />
      <div>
        <h1>Account</h1>
        <p>Name: {localStorage.getItem('user')}</p>
        <p>Joined: A long long time ago</p>
        <p>ID: {localStorage.getItem('id')}</p>
        <button className='btn btn--primary'><Link to='/get-subscription'>Get Premium</Link></button>
      </div>
    </>
  );
};
export default AccountPage;
