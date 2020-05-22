const braintree = require('braintree');
const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const braintreeAuth = require("../config/braintree")
var paymentGateway = braintree.connect(braintreeAuth);
const User = require("../models/User");

router.get('/client_token', (req, res, next) => {

    paymentGateway.clientToken.generate({}, function (err, response) {
        res.send({token:response.clientToken});
    });

});
router.use(bodyParser.json());

router.post("/", async function (req, res) {
    var nonceFromTheClient = req.body.nonce;
    var currentUser = req.body.user;
  
    var name = await User.findById(currentUser).then((user) => {
        return user.name;
    });
    // You must create a custom to create a subscription
    paymentGateway.customer.create({
        firstName: name,
        lastName: "",
        paymentMethodNonce: nonceFromTheClient
    }, function(err, result){
        // Callbacks, so oldschool
        var tokenFromTheCustomer = result.customer.paymentMethods[0].token;

        paymentGateway.subscription.create({
            paymentMethodToken: tokenFromTheCustomer,
            planId: "basic"
        }, function(err, result) {
            // Callbacks, so oldschool
            res.json(result);
        });
    });
});

router.post("/cancel", (req, res, next) => {

    
    res.json({success:true, message: "Subscription canceled."});
});


module.exports = router;