const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
var { passwordReset } = require("../mail/email");

var PasswordReset = require("../models/PasswordReset");
var User = require("../models/User");

import { PasswordResetTemplate } from "../useHandlebars";


// This route is dead simple: display a form
router.get('/', (req, res) => {

    var response = PasswordResetTemplate({start:true});

    res.writeHead( 200, { "Content-Type": "text/html" } );
    res.end(response);
});

// This route receives the form
router.post('/', (req, res) => {

    // Write a token, a timestamp, and an email to a mongo table
    // Once successful, send an email to the email with a link like this
    // checkyourhabit.com/password-reset/8acdacd03fa2ed2041c124921

    // If email has other password resets, remove them
    PasswordReset.find({user:req.body.email}).then(resets=>{
        resets.forEach(reset=>{
            reset.remove();
        })
    });

    // Create the reset record
    var reset = new PasswordReset({
        user: req.body.email,
        expires: new Date()
    });

    // Save the reset record
    reset.save()
        // Send the email and display page
        .then(user => {
            passwordReset(req.body.email, reset._id);
            res.writeHead( 200, { "Content-Type": "text/html" } );
            var response = PasswordResetTemplate({sent:true, email: req.body.email});
            res.end(response);
        })
        // Unless there are problems. 
        .catch(err => {
            console.log(err);
            res.writeHead( 400, { "Content-Type": "text/html" } );
            res.end("Failure.");
        });
    
});

// Linked from email
router.get('/:identifier', (req, res) => {

    // Check identifer against databse.
    // Check database timestamp
    // If timestamp is too old or doesn't exist, return "Sorry, this link doesn't seem to work. Your link may have expired."
    PasswordReset.findById( req.params.identifier ).then(reset => {

        var ONE_HOUR = 60 * 60 * 1000; /* ms */

        // If reset doesn't work: 
        if (!reset || (reset.expires - new Date) > ONE_HOUR) {
            res.writeHead( 404, { "Content-Type": "text/html" } );
            var response = PasswordResetTemplate({textResponse:"Sorry, the link didn't work. It may have expired."});
            res.end(response);
        } else {                
            // Password reset form    
            res.writeHead( 200, { "Content-Type": "text/html" } );

            var response = PasswordResetTemplate({resetForm:true});
            res.end(response);
        }
    });


});

router.post('/:identifier', async (req, res) => {


    var ONE_HOUR = 60 * 60 * 1000; /* ms */

    var userEmail;

    // Find reset by ID
    var userEmail = await PasswordReset.findById( req.params.identifier ).then(reset => {
        if (!reset || (reset.expires - new Date) > ONE_HOUR) {
            res.writeHead( 404, { "Content-Type": "text/html" } );
            var response = PasswordResetTemplate({textResponse:"Sorry, the link didn't work. It may have expired."});
            res.end(response);
            return;
        } else {                   
            reset.remove(); 
            return reset.user;
        }
    });
    
    if(!userEmail) return;

    // Find user by reset & update password
    User.findOne({ email : userEmail }).then(foundUser => {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(req.body.password, salt, (err, hash) => {
                if (err) throw err;
                foundUser.password = hash;
                foundUser
                    .save()
                    .then(user => {
                        res.writeHead( 200, { "Content-Type": "text/html" } );
                        var response = PasswordResetTemplate({textResponse:"Password reset"});
                        res.end(response);
                    })
                    .catch(err => console.log(err)); 
            });
        });
    });    
});


module.exports = router;