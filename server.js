var express = require('express');
var cookieParser = require('cookie-parser');
var session      = require('express-session');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret: 'this is the secret', // process.env.SESSION_SECRET
    resave: true,
    saveUninitialized: true
}));
// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

require ("./assignment/app.js")(app);
var port = process.env.PORT || 3000;

app.listen(port);