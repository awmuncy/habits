import React, { useState } from 'react';
import { changeSubscription } from '../store/connections/resources/applicationActions';

import paymentRequest from 'braintree-web/payment-request';
import { create as createClient } from 'braintree-web/client';

function startPayment(instance, subscriptionType, callback) {

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
                user: localStorage.getItem("id"), // User token from store
                subscriptionType: subscriptionType
            };

            fetch('/payments', {
                method: 'POST',  
                headers: {
                    'Content-Type': 'application/json'
                }, 
                body: JSON.stringify(createSubscription)                  
            }).then(r=>r.json()).then(json=>{
                console.log(json)
                callback(true);   
            });
        });
        
}




var SubscriptionModule = props => {

    var [success, setSuccess] = useState(false);
    var [auth, setAuth] = useState(null);
    var [client, setClient] = useState(null);
    var [paymentInstance, setPaymentInstance] = useState(null);
    var [subscriptionStarted, setStartSubscription] = useState(false);
    
    var subscriptionSuccess = () => {
        setSuccess(true);
        props.changeSubscription("premium");
    }

    if(success) {
        return (
            <div className="successfully-subscribed">Payment succeeded. Welcome to Premium!</div>
        )
    }

    if(auth===null) {
        fetch('/payments/client_token')
            .then(body=>{
                return body.json()
            })
            .then(json=>{
                console.log("Token: " + json.token);
                setAuth(json.token);
            });
    }
    if(client===null && auth!==null) {
        createClient({
            authorization: auth
        }, (err, response) => {
            console.log("Client:");
            console.log(response);
            setClient(response);
        });
    }
    if(paymentInstance===null && client!==null) {
        paymentRequest.create({
            client: client
        }, (err, instance) => {
            console.log(err);
            console.log(instance);
    
            
    
            setPaymentInstance(instance);
        });
    }    


    var start;
    if(paymentInstance===null) {
        start = null;
    } else
    if(!subscriptionStarted) {
        start = (
            <button className="btn btn--ghost" onClick={()=>setStartSubscription(true)}>
                I understand & agree
            </button>
        );
    } else {
        start = (
            <button className="btn btn--primary" onClick={() => startPayment(paymentInstance, props.subscriptionType, subscriptionSuccess)}>Proceed to payment</button>
        );
    }

    return (

        <form onSubmit={e=>e.preventDefault()}>
            {start}
        </form>
    )
}

export {
    SubscriptionModule
};

var storeToProps = (store, props) => {
    return {
        userToken: store.user.token
    };
};

var dispatchesToStore = dispatch => {
    return {
        changeSubscription: new_subscription_type => dispatch(changeSubscription(new_subscription_type))
    }
};

import { connect } from 'react-redux';
export default connect(storeToProps, dispatchesToStore)(SubscriptionModule);