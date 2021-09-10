const express = require('express');
const router = new express.Router();
import jwt_decode from 'jwt-decode';
const User = require('../../models/User');

async function AuthenticateUser(req, res, next) {

  let currentUser;

  try {
    currentUser = jwt_decode(req.body.userToken && req.body.userToken.value).id;

    currentUser = User.findById(currentUser);

  } catch (err) {
    res.status(401).send('User not authenticated');
    return;
  }


  req.user = currentUser;
  next();
}

router.use(AuthenticateUser);

module.exports = router;
