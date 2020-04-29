import React from 'react';

import Subscription from '../Subscription';


var Checkout = props => {
    return(
        <form onSubmit={e=>e.preventDefault()}>
            <div className="subscription-mock-up">
                <div className="subscription-mock-up--header">
                    Checkout
                </div>
                <div className="subscription-mock-up--body">
                    <div className="subscription-mock-up--line-item">
                        <div>Monthly Subscription</div>                        
                        <div>$5.00</div>
                    </div>
                    <div className="subscription-mock-up--line-item total">
                        <div>Total</div>                        
                        <div>$5.00</div>
                    </div>
                </div>

                <div className="subscription-mock-up--footer">
                    <div className="subscription-mock-up--disclaimer">
                        This is the amount due now. <em>This is a <strong>recurring</strong> payment</em>, meaning you will be charged this amount monthly.
                        For more information, please see our <a href="/details">details page</a> for terms and conditions, cancellation policy, and contact information. 
                    </div>
                    
                    <Subscription />
                </div>

            </div>
            
        </form>
    )
}

export default Checkout;