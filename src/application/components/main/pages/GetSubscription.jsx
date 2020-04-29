import React, { useState } from "react";
import { Link } from 'react-router-dom';



var GetSubscription = props => {
    var [monthly, setMonthly]   = useState(false);
    var [annual, setAnnual]     = useState(false);

    var disabled = "btn--disabled";
    if(monthly || annual) {
        disabled = "";
    }

    return (
        <div class="home-layout">
            <div className="get-subscription">
                <div className="select-subscription">
                    <div onClick={()=>{setMonthly(!monthly); setAnnual(false)}} className={"select-premium select-premium-monthly " + (monthly ? "select-premium--selected" : "")}>
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
                    <div onClick={()=>{setAnnual(!annual); setMonthly(false)}} className={"select-premium select-premium-annual " + (annual ? "select-premium--selected" : "")}>
                        <div className="select-premium--graphic">
                            <img src="/images/logo.png" />
                        </div>
                        <div className="select-premium--content">
                            <div className="select-premium--title">
                                Annual
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
    );
}

export default GetSubscription;