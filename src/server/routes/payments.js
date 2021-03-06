import braintree from 'braintree';
import express from 'express';
const router = new express.Router();
import bodyParser from 'body-parser';
import braintreeAuth from '../config/braintree.js';
let paymentGateway = braintree.connect(braintreeAuth);
import User from '../models/User.js';

router.get('/client_token', (req, res, next) => {

  paymentGateway.clientToken.generate({}, function(err, response) {
    // eslint-disable-next-line no-console
    console.log(err);
    res.send({token: response.clientToken});
  });

});
router.use(bodyParser.json());

router.post('/', async function(req, res) {
  let nonceFromTheClient = req.body.nonce;
  let currentUser = req.body.user;
  let plan = req.body.subscriptionType;

  let name = await User.findById(currentUser).then((user) => {
    return user.name;
  });
    // You must create a custom to create a subscription
  paymentGateway.customer.create({
    firstName         : name,
    lastName          : '',
    paymentMethodNonce: nonceFromTheClient
  }, function(err, result) {
    // eslint-disable-next-line no-console
    console.log(err);
    // Callbacks, so oldschool
    let tokenFromTheCustomer = result.customer.paymentMethods[0].token;

    paymentGateway.subscription.create({
      paymentMethodToken: tokenFromTheCustomer,
      planId            : plan
    }, function(err, result) {
    // eslint-disable-next-line no-console
      console.log(err);
      // Callbacks, so oldschool
      // If succcess, tell browser & db to change user's sub type
      User.findById(currentUser).then(user => {
        user.subscription_type = 'premium';
        user.save();
      });
      res.json(result);
    });
  });
});

router.post('/cancel', (req, res, next) => {


  res.json({success: true, message: 'Subscription canceled.'});
});


export default router;
