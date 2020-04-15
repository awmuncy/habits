const braintree = require('braintree');
const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

import { PaymentsPage } from "../useHandlebars";

var paymentGateway = braintree.connect({
    environment: braintree.Environment.Sandbox,
    merchantId: "5vgdb6pw6c254bvh",
    publicKey: "yskh5gkmvsv6vszf",
    privateKey: "4e47344c208a672fba7c922be1bf736a"
});

router.get('/client_token', (req, res, next) => {

    paymentGateway.clientToken.generate({}, function (err, response) {
        res.send(PaymentsPage({token:response.clientToken}));
    });

});
router.use(bodyParser.json());

router.post("/", function (req, res) {
    var nonceFromTheClient = req.body.nonce;
    // Use payment method nonce here
    console.log("REQ");
    console.log(req.body);
    paymentGateway.transaction.sale({
        amount: "10.00",
        paymentMethodNonce: nonceFromTheClient,
        // deviceData: deviceDataFromTheClient,
        options: {
          submitForSettlement: true
        }
      }, function (err, result) {
          console.log(result);
          res.json(result);
    });
});



module.exports = router;