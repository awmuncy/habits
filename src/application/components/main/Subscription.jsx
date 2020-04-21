import React, { useState } from 'react';

import paymentRequest from 'braintree-web/payment-request';
var createClient = require('braintree-web/client').create;

function startPayment(instance) {

    var amount = '0.00';

    instance.tokenize(
        {
            details: {
                total: {
                label: 'Total',
                amount: {
                    currency: 'USD',
                    value: amount
                }
                }
            }
        }, function (err, payload) {
            console.log("Find nonce:");
            console.log(payload);
        if (err) {
            // Handle errors from processing payment request
        }
            var createSubscription = {
                nonce: payload.nonce,
                user: localStorage.getItem("id")
            };

            fetch('/payments', {
                method: 'POST',  
                headers: {
                    'Content-Type': 'application/json'
                }, 
                body: JSON.stringify(createSubscription)                  
            }).then(r=>r.json()).then(json=>console.log(json));
        });
}




var SubscriptionModule = props => {
    var user = {// props.user 
        subscription: "basic",
        id: "8675s09",
        subscription_id: "21414fa"
    };
    var [auth, setAuth] = useState(null);
    var [client, setClient] = useState(null);
    var [paymentInstance, setPaymentInstance] = useState(null);
    var [subscriptionStarted, setStartSubscription] = useState(false);

    if(auth===null) {
        fetch('/payments/client_token')
            .then(body=>{
                return body.json()
            })
            .then(json=>{
                console.log("Token: " + json.token);
                setAuth(json.token);
            })
        return null;
    }
    if(client===null) {
        createClient({
            authorization: auth
        }, (err, response) => {
            console.log("Client:");
            console.log(response);
            setClient(response);
        });
        return null;
    }
    if(paymentInstance===null) {
        paymentRequest.create({
            client: client
        }, (err, instance) => {
            console.log(err);
            console.log(instance);
    
            
    
            setPaymentInstance(instance);
        });
        return null; 
    }    

    if(user.subscription=="premium") {
        return (
            <div>
                To cancel subscription, email admin@checkyourhabit.com. 
            </div>
        )
    }
    var start;
    if(!subscriptionStarted) {
        start = (
            <button onClick={()=>setStartSubscription(true)}>
                Get premium
            </button>
        );
    } else {
        start = (
            <button className="btn btn--primary" onClick={() => startPayment(paymentInstance)}>Proceed to payment</button>
        );
    }

    return (

        <form onSubmit={e=>e.preventDefault()}>
            <div className="startPayment">
                <h2>Updgrade to premium</h2>
                <p><em>Get a premium subscription for $5 a month.</em> <a href="/learn-more">Learn more</a></p>
                <div>
                    You will _not_ be chanrged for the first 28 days. After that, you will be charged $5 a month. You can cancel any time and will receive no further charges.
                </div>
                {start}
            </div>
        </form>
    )
}
export default SubscriptionModule;