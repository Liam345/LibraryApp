const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
var passport   = require('passport');
var session    = require('express-session');
//var flash = require('connect-flash');
require('dotenv').config();


const app = express();
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.text());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(flash());

//Models
var models = require('./server/models');

// For Passport . We will be using Token instead of session for now,
//app.use(session({ secret: 'keyboard cat',resave: true, saveUninitialized:true})); // session secret
app.use(passport.initialize());
//app.use(passport.session()); // persistent login sessions

//load Passport strategies
const localSignupStrategy = require('./server/config/passport/local-signup');
const localLoginStrategy = require('./server/config/passport/local-login');
passport.use('local-signup', localSignupStrategy);
passport.use('local-login',localLoginStrategy);
//require('./server/config/passport/passport.js')(passport,models.User);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

//Routes
const authRoutes = require('./server/routes/auth');
const apiRoutes = require('./server/routes/index');
app.use('/auth',authRoutes);
app.use('/api',apiRoutes);

//require('./server/routes')(app,passport); 

app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to the beginning of nothingness.',
}));

module.exports = app;