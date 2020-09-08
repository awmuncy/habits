var express = require('express');
var path = require('path');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
var app = express();
const passport = require("passport");
const users = require("./routes/api/users");


import notifications from "./notifications";
import { App, Homepage, LoginPage, LegalPage } from "./useHandlebars";


/* v I don't actually know what these do? v */
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);

app.use("/payments", require('./routes/payments'));


app.use(bodyParser.json());
/* ^ I don't have know what these do ^ */


const port = 5000; 
app.listen(port, () => console.log(`Server up and running on port ${port}`));

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./validation/passport")(passport);
// Routes
app.use("/api/users", users);

app.use("/reset-password", require("./routes/passwordReset"));

app.use("/feedback", require("./routes/feedback"));


app.use( express.static( path.resolve( __dirname, "../../dist/public" ) ) );


app.get('/', (req, res) => {
    res.writeHead( 200, { "Content-Type": "text/html" } );


    res.end(Homepage());
});


app.get('/legal', (req, res) => {
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


module.exports = app;