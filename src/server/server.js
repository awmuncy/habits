var express = require('express');
var path = require('path');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
var app = express();
var env = require("dotenv").config({path: __dirname + '/../../.env'}).parsed;
const passport = require("passport");
const users = require("./routes/api/users");
import notifications from "./notifications";
const resetPassword = require("./routes/passwordReset");

console. devLog = (message) => {
	console.log("DEVELOPEMENT LOG:");
	console.log(message);
}

import { App, Homepage, LoginPage } from "./useHandlebars";

app.use(
    bodyParser.urlencoded({
        extended: false
    })
);

app.use(bodyParser.json());



const db = require("./config/keys").mongoURI;

mongoose
    .connect(
      db,
      { useNewUrlParser: true }
    )
    .then(() => console.log("MongoDB successfully connected"))
    .catch(err => {
        //console.log(err)
        console.log("Mongo didn't connect");
    });

const port = 5000; 
app.listen(port, () => console.log(`Server up and running on port ${port}`));

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);
// Routes
app.use("/api/users", users);

app.use("/reset-password", resetPassword);


app.use( express.static( path.resolve( __dirname, "../../dist/public" ) ) );


app.get('/', (req, res) => {
    res.writeHead( 200, { "Content-Type": "text/html" } );


    res.end(Homepage());
});

app.get('/login', (req, res) => {
    res.writeHead( 200, { "Content-Type": "text/html" } );


    res.end(LoginPage());
});

app.get("/csrf", (req, res) => {
    res.writeHead( 200, { "Content-Type": "text/json" } );

	var content = `{"csrf":"2AgNFInqdb0unkwcB9kFpYOwLezq8qMKkoqUmzQw", "tokenizedUser": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjZjQyM2NmOGEyYTgwM2MwODYzZmM0MCIsIm5hbWUiOiJNYXJrIEVsc29uIiwiaWF0IjoxNTY2MDgxNDY0LCJleHAiOjE1OTc2MzgzOTB9.KQHHdyO09iNDznP4S7n_EDmRy_kkb4i82aaqO9lITR"}`;

	
    res.end(content);
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
    "\/goals",
    '\/goal\/(([\\d|[a-z]){24}|([\\d|[a-z]){6})',
    '\/new-goal',
    "*"
];

routes.forEach(toHome);

function toHome(route) {
    app.get(route, (req, res) => {
        res.writeHead( 200, { "Content-Type": "text/html" } );

        res.end(App());
    });
}



notifications(app);


module.exports = app;