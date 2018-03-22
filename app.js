// get all the tools
var express  = require('express');
var app      = express();
var passport = require('passport');
var path     = require('path');
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
var port     = process.env.PORT || 5000;

// set up
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '/public')));
app.set('views', __dirname + '/views');

// for passport
app.use(session({
    secret: 'iloveme',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// routes
require('./app/routes.js')(app, passport);

// server
app.listen(port);
console.log('Running at ' + port);
