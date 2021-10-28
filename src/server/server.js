import express from 'express';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);



import mongoose from 'mongoose';
import bodyParser from 'body-parser';
let app = express();
let site = express();
import passport from 'passport';

import dotenv from 'dotenv';
const env = dotenv.config().parsed;
import docs from './docs/docs.js';


import notifications from './notifications.js';
import { appTemplate, homepageTemplate, legalPage } from './useHandlebars.js';

function environment(req, res, next) {
  res.writeHead(200, { 'Content-Type': 'application/javascript' });
  let encodedEnv = Buffer.from(JSON.stringify(env)).toString('base64');
  res.end(`const env=JSON.parse(atob("${encodedEnv}"))`);
}


site.use(docs);

app.get('/jdcyn8675309.js', environment);
site.get('/jdcyn8675309.js', environment);

/* v I don't actually know what these do? v */
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
site.use(
  bodyParser.urlencoded({
    extended: false
  })
);
site.use(bodyParser.json());

/* ^ I don't have know what these do ^ */


const port = 5499;
// eslint-disable-next-line no-console
app.listen(port, () => console.log(`App server up and running on port ${port}`));
const sitePort = 5173;
// eslint-disable-next-line no-console
site.listen(sitePort, () => console.log(`Site server up and running on port ${sitePort}`));


import feedback from './routes/feedback.js';
app.use('/feedback', feedback);


app.use(express.static(path.resolve(__dirname, '../../dist/public')));
site.use(express.static(path.resolve(__dirname, '../../dist/public')));

site.get('/', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });


  res.end(homepageTemplate({
    appUrl: `${env.APPLICATION_URL}`
  }));
});



site.get('/legal', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });


  res.end(legalPage({pageTitle: 'Legal'}));
});

app.post('/sync', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/json' });

  let content = {};
  content = JSON.stringify(content);


  res.end(content);
});

let routes = [
  '/home',
  '/',
  '/habit/(([\\d|[a-z]){24}|([\\d|[a-z]){6})',
  '/habits',
  '/feedback',
  '*',
  '/login'
];

routes.forEach(toHome);

function toHome(route) {
  app.get(route, (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });

    res.end(appTemplate());
  });
}

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

notifications(app);
