import express from 'express';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';
import crdtDriver from '@awmuncy/sqlite-crdt/src/crdtDriver.js';
import https from 'https';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const options = {
  key : fs.readFileSync(__dirname + '/cert/key.pem', 'utf8'),
  cert: fs.readFileSync(__dirname + '/cert/cert.pem', 'utf8')
};

const port = 5499;


import bodyParser from 'body-parser';
let app = express();

let server = https.createServer(options, app);
let site = express();
// server.listen(port);
app.listen(port, () => console.log(`App server up and running on port ${port}`));

app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
  next();
});

import dotenv from 'dotenv';
const env = dotenv.config().parsed;


import notifications from './notifications.js';
import { appTemplate, homepageTemplate, legalPage } from './useHandlebars.js';

function environment(req, res, next) {
  res.writeHead(200, { 'Content-Type': 'application/javascript' });
  let encodedEnv = Buffer.from(JSON.stringify(env)).toString('base64');
  res.end(`const env=JSON.parse(atob("${encodedEnv}"))`);
}


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



// eslint-disable-next-line no-console

const sitePort = 5173;
// eslint-disable-next-line no-console
site.listen(sitePort, () => console.log(`Site server up and running on port ${sitePort}`));


// import feedback from './routes/feedback.js';
// app.use('/feedback', feedback);



import initSqlJs from '@jlongster/sql.js';
let db;
let crdt;
async function main() {

  const SQL = await initSqlJs({
    // Required to load the wasm binary asynchronously. Of course, you can host it wherever you want
    // You can omit locateFile completely when running in node
  });

  try {
    let data = fs.readFileSync('./db.db');
    db = new SQL.Database(data);
  } catch (e) {
    db = new SQL.Database();
  }

  // Create a database
  crdt = await crdtDriver(db, {messagesOnly: true, debug: true, serverMode: true, group: 'my-group'});

  console.log('SQL is ready');




  app.post('/crdt-sync', async(req, res) => {

    let back = await crdt.deliverMessages(req.body);

    let data = crdt.debug.db.export();
    const buffer = Buffer.from(data);
    fs.writeFileSync('./db.db', buffer);


    res.send(
      JSON.stringify({
        status: 'ok',
        data  : back
      })
    );
  });

  app.use(express.static(path.resolve(__dirname, '../../dist/public')));
  site.use(express.static(path.resolve(__dirname, '../../dist/public')));

  site.get('/', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });


    res.end(homepageTemplate({
      appUrl: `${env.APPLICATION_URL}`
    }));
  });

  app.use((req, res, next) => {
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
    res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
    next();
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


  notifications(app);




}

main();
