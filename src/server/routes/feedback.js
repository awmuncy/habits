const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
var { feedbackEmail } = require("../mail/email");


var PasswordReset = require("../models/PasswordReset");
var User = require("../models/User");

import { PasswordResetTemplate } from "../useHandlebars";




// This route receives the form
router.post('/', (req, res) => {


    var currentUser = req.body.userToken;
  

    User.findById(currentUser).then((user) => {

        feedbackEmail(req.body.feedback, user.name, user.email);
        res.redirect("/home");
    });

    


    
});

module.exports = router;