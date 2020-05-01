const braintree = require('braintree');
const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const braintreeAuth = require("../config/braintree")
var paymentGateway = braintree.connect(braintreeAuth);

router.get('/client_token', (req, res, next) => {

    paymentGateway.clientToken.generate({}, function (err, response) {
        res.send({token:response.clientToken});
    });

});
router.use(bodyParser.json());

router.post("/", function (req, res) {
    var nonceFromTheClient = req.body.nonce;

    // You must create a custom to create a subscription
    paymentGateway.customer.create({
        firstName: "Allen",
        lastName: "Muncy",
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