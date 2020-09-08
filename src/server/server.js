var express = require('express');
var path = require('path');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
var app = express();
var site = express();
const passport = require("passport");
const users = require("./routes/api/users");
const env = require('dotenv').config().parsed;

import notifications from "./notifications";
import { App, Homepage, LoginPage, LegalPage } from "./useHandlebars";

function environment(req, res, next) {
    res.writeHead( 200, { "Content-Type": "application/javascript" } );
    var encodedEnv = Buffer.from(JSON.stringify(env)).toString('base64');
    res.end(`const env=JSON.parse(atob("${encodedEnv}"))`);   
}

app.get("/jdcyn8675309.js", environment);
site.get("/jdcyn8675309.js", environment);

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
app.use("/payments", require('./routes/payments'));

const port = 5499; 
app.listen(port, () => console.log(`App server up and running on port ${port}`));
const sitePort = 5173;
site.listen(sitePort, () => console.log(`Site server up and running on port ${sitePort}`));

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./validation/passport")(passport);
// Routes
app.use("/api/users", users);
site.use("/api/users", users);

app.use("/reset-password", require("./routes/passwordReset"));

app.use("/feedback", require("./routes/feedback"));


app.use( express.static( path.resolve( __dirname, "../../dist/public" ) ) );
site.use( express.static( path.resolve( __dirname, "../../dist/public" ) ) );

site.get('/', (req, res) => {
    res.writeHead( 200, { "Content-Type": "text/html" } );


    res.end(Homepage({
        appUrl: `${env.APPLICATION_URL}`
    }));
});



site.get('/legal', (req, res) => {
    res.writeHead( 200, { "Content-Type": "text/html" } );


    res.end(LegalPage({pageTitle: "Legal"}));
});

app.post("/sync", (req, res) => {
    res.writeHead( 200, { "Content-Type": "text/json" } );

    var content = {};
    content = JSON.stringify(content);

	
    res.end(content);
});

var routes = [
    "/home",
    "/",
    '\/habit\/(([\\d|[a-z]){24}|([\\d|[a-z]){6})',
    '\/habits',
    "\/feedback",
    "*",
    "/login"
];

routes.forEach(toHome);

function toHome(route) {
    app.get(route, (req, res) => {
        res.writeHead( 200, { "Content-Type": "text/html" } );

        res.end(App());
    });
}

const db = require("./config/keys").mongoURI;

mongoose
    .connect(
      db,
      { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => console.log("MongoDB successfully connected"))
    .catch(err => {
        //console.log(err)
        console.log("Mongo didn't connect");
    });

notifications(app);