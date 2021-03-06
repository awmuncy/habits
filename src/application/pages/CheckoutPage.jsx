import React from 'react';

import Subscription from './Subscription';

import { Redirect } from 'react-router-dom';
import { HeadBack } from '../store/ConnectedComponents';


let Yearly = () => {
  return (
    <div className='subscription-mock-up--body'>
      <div className='subscription-mock-up--line-item'>
        <div>Yearly Subscription</div>
        <div>$50.00</div>
      </div>
      <div className='subscription-mock-up--line-item total'>
        <div>Total</div>
        <div>$50.00</div>
      </div>
    </div>
  );
};

let Monthly = () => {
  return (
    <div className='subscription-mock-up--body'>
      <div className='subscription-mock-up--line-item'>
        <div>Monthly Subscription</div>
        <div>$5.00</div>
      </div>
      <div className='subscription-mock-up--line-item total'>
        <div>Total</div>
        <div>$5.00</div>
      </div>
    </div>
  );
};

let Checkout = props => {
  if (props.subscription === null) {
    return <Redirect to='/get-subscription' />;
  }


  return (
    <>
      <HeadBack />
      <form onSubmit={e=>e.preventDefault()}>
        <div className='subscription-mock-up'>
          <div className='subscription-mock-up--header'>
                        Checkout
          </div>
          {props.subscription === 'yearly' ? <Yearly /> : <Monthly />}

          <div className='subscription-mock-up--footer'>
            <div className='subscription-mock-up--disclaimer'>
              This is the amount due now. <em>This is a <strong>recurring</strong>
              payment</em>, meaning you will be charged this amount on
              a {props.subscription === 'yearly' ? 'n' : null} {props.subscription} basis.
              For more information, please see our <a href='/details'>details page</a>
              for terms and conditions, cancellation policy, and contact information.
            </div>

            <Subscription subscriptionType={props.subscription} />
          </div>

        </div>

      </form>
    </>
  );
};

export {
  Checkout
};


let storeToProps = (store, props) => {

  return {
    subscription: store.subscription
  };
};

import { connect } from 'react-redux';
export default connect(storeToProps)(Checkout);
