import React, { useState } from 'react';

import Subscription from '../Subscription';

var AccountPage = props => {
    var user = {// props.user 
        subscription: "premium",
        id: "8675s09",
        subscription_id: "21414fa"
    };

    return (
        <form onSubmit={e=>e.preventDefault()}>
            <Subscription />
        </form>
    )
}
export default AccountPage;