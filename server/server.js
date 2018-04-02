// db and session for heroku
require('dotenv').config();

// get all the tools
var express  = require('express');
var session = require('express-session');
var cors = require('cors')
var app      = express();
var passport = require('passport');
var mongoose = require('mongoose');
var path     = require('path');
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var port     = process.env.PORT || 5000;

// set up
require('./config/passport')(passport);
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_URI);
app.use(cookieParser());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
  credentials: true,
  origin:"http://localhost:3000"
  // origin:"https://a3client.herokuapp.com"
}));

// passport & session
app.use(session({
    secret: 'iloveme',
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false }
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// routes
require('./app/routes.js')(app, passport);

// server
app.listen(port);
