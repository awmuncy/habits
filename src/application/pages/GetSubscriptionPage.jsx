import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { HeadBack } from '../store/ConnectedComponents';

let GetSubscription = props => {


  let user = props.user;

  if (user.subscription === 'premium') {
    return (
      <>
        <HeadBack />
        <div className='home-layout'>
          <div>
                            To cancel subscription, email admin@checkyourhabit.com.
          </div>
        </div>
      </>
    );
  }
  let [monthly, setMonthly] = useState(false);
  let [yearly, setyearly] = useState(false);

  let disabled = 'btn--disabled';
  if (monthly || yearly) {
    disabled = '';
  }

  let clickMonthly = () => {
    setMonthly(!monthly);
    setyearly(false);
    let to = monthly ? null : 'monthly';
    props.setCheckout(to);
  };

  let clickyearly = () => {
    setyearly(!yearly);
    setMonthly(false);
    let to = yearly ? null : 'yearly';
    props.setCheckout(to);
  };

  return (
    <>
      <HeadBack />
      <div className='home-layout'>
        <div className='get-subscription'>
          <div className='select-subscription'>
            {/* eslint-disable-next-line */}
            <div onClick={clickMonthly} className={'select-premium select-premium-monthly ' + (monthly ? 'select-premium--selected' : '')}>
              <div className='select-premium--graphic'>
                <img src='/images/logo.png' alt='Check your habit logo' />
              </div>
              <div className='select-premium--content'>
                <div className='select-premium--title'>
                                    Monthly - $5/mo
                </div>
                <p>Monthly subscription to premium</p>
              </div>
            </div>
            {/* eslint-disable-next-line */}
            <div onClick={clickyearly} className={'select-premium select-premium-yearly ' + (yearly ? 'select-premium--selected' : '')}>
              <div className='select-premium--graphic'>
                <img src='/images/logo.png' alt='Check your habit logo' />
              </div>
              <div className='select-premium--content'>
                <div className='select-premium--title'>
                                    Annual - $50/yr
                </div>
                <p>Annual subscription to premium, saves $10 yearly.</p>
              </div>
            </div>
          </div>
          <div className='proceed-to-checkout'>
            {disabled ? <div className=''>
              <button className={'btn btn--primary ' + disabled}>Proceed to checkout</button>
            </div>
              : <Link to='/checkout'>
                <button className={'btn btn--primary ' + disabled}>Proceed to checkout</button>
              </Link>
            }
          </div>
        </div>
      </div>
    </>
  );
};

export {
  GetSubscription
};

let dispatchesToStore = dispatch => {
  return {
    setCheckout: to => dispatch({type: 'SET_CHECKOUT', to: to})
  };
};
let storeToProps = (store, props) => {
  return {
    checkout_selected: store.checkout,
    user             : store.user
  };
};

import { connect } from 'react-redux';
export default connect(storeToProps, dispatchesToStore)(GetSubscription);
