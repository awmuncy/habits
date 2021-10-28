import express from 'express';
const router = new express.Router();
import jwt_decode from 'jwt-decode';
import User from '../../models/User.js';

async function AuthenticateUser(req, res, next) {

  let currentUser;

  try {
    let token = req.headers.authorization.split('  ')[1];

    let id = jwt_decode(token)?.id;
    currentUser = User.findById(id);

  } catch (err) {
    res.status(401).send('User not authenticated');
    return;
  }


  req.user = currentUser;
  next();
}

router.use(AuthenticateUser);

export default router;
