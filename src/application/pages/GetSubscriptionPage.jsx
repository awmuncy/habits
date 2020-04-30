import React, { useState } from "react";
import { Link } from 'react-router-dom';

import { HeadBack } from "../store/ConnectedComponents";

var GetSubscription = props => {
    var [monthly, setMonthly]   = useState(false);
    var [annual, setAnnual]     = useState(false);

    var disabled = "btn--disabled";
    if(monthly || annual) {
        disabled = "";
    }

    var clickMonthly = () => {
        setMonthly(!monthly);
        setAnnual(false);      
        var to = monthly ? null : "monthly";  
        props.setCheckout(to);
    }

    var clickAnnual = () => {
        setAnnual(!annual);
        setMonthly(false);
        var to = annual ? null : "annual";
        props.setCheckout(to);
    }

    return (
        <>
            <HeadBack />
            <div className="home-layout">
                <div className="get-subscription">
                    <div className="select-subscription">
                        <div onClick={clickMonthly} className={"select-premium select-premium-monthly " + (monthly ? "select-premium--selected" : "")}>
                            <div className="select-premium--graphic">
                                <img src="/images/logo.png" />
                            </div>
                            <div className="select-premium--content">
                                <div className="select-premium--title">
                                    Monthly - $5/mo
                                </div>
                                <p>Monthly subscription to premium</p>
                            </div>
                        </div>
                        <div onClick={clickAnnual} className={"select-premium select-premium-annual " + (annual ? "select-premium--selected" : "")}>
                            <div className="select-premium--graphic">
                                <img src="/images/logo.png" />
                            </div>
                            <div className="select-premium--content">
                                <div className="select-premium--title">
                                    Annual - $50/yr
                                </div>
                                <p>Annual subscription to premium, saves $10 yearly.</p>
                            </div>
                        </div>
                    </div>
                    <div className="proceed-to-checkout">
                        {disabled ? <div className=""><button className={"btn btn--primary " + disabled}>Proceed to checkout</button></div>: 
                        <Link to="/checkout">
                            <button className={"btn btn--primary " + disabled}>Proceed to checkout</button>
                        </Link>
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export { 
    GetSubscription
};

var dispatchesToStore = dispatch => {
    return {
        setCheckout: to => dispatch({type: "SET_CHECKOUT", to: to})
    };
};
var storeToProps = (store, props) => {
    return {
        checkout_selected: store.checkout
    }
};

import { connect } from "react-redux";
export default connect(storeToProps, dispatchesToStore)(GetSubscription);