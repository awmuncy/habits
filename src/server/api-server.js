import express from 'express';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import passport from 'passport';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);



import mongoose from 'mongoose';
import bodyParser from 'body-parser';
let api = express();
api.listen(3030, () => {
  // eslint-disable-next-line no-console
  console.log('Api server running on port 3030');
});

import apiRoutes from './routes/api.js';

api.use(passport.initialize());
import validation from './validation/passport.js';
validation(passport);

import dotenv from 'dotenv';
const env = dotenv.config().parsed;
import docs from './docs/docs.js';

api.use(
  bodyParser.urlencoded({
    extended: false
  })
);
api.use(bodyParser.json());

api.use('/docs', docs);
api.use('/api', apiRoutes);
api.use('/', (req, res) => {
  res.json({
    links: [
      '/auth',
      '/users',
      '/reset-password',
      '/payments'
    ]
  });
});

import keys from './config/keys.js';
const db = keys.mongoURI;

mongoose
  .connect(
    db,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  // eslint-disable-next-line no-console
  .then(() => console.log('MongoDB successfully connected'))
  .catch(err => {
    // eslint-disable-next-line no-console
    console.log(err);
    // eslint-disable-next-line no-console
    console.log('Mongo didn\'t connect');
  });
