/* Imports requeired */
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const logStream = require('./util/logStream')();
const debug = require('debug')('app:main');
const bodyParser = require('body-parser');
//Import hbs and configure it
require('./util/handlebarsURLConfiguration')(require('hbs'));
  //Authentication and user session
const passport = require('passport');
const session = require('express-session');
const passportConfig = require('./util/passport-config');
  //Routing components
const route = require('./util/routeMe');

const database = require('./database/models/index');

const app = express();  //The main app

/*
All request are logged to the log file
If no format is provided by the env, use dev by default
If no log path was set in the env vars, the logStream var
will be undefined, thus assigning the stdout to the stream
*/
app.use(morgan(process.env.LOG_FORMAT || 'dev', { stream: logStream }));
app.use(morgan('dev', {skip: function(req, res){ return res.statusCode < 400 }}))

// view engine setup
debug("View Engine Setting Up");
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//Passport config
app.use(session({
  secret: 'do not tell no one ;)',
  saveUninitialized: true,
  resave: true
}));
app.use(passport.initialize());
app.use(passport.session());
passportConfig(passport);

route(app, passport);

app.use(cookieParser());

//Static File config
app.use('/static', express.static(path.join(__dirname, 'static')));
//Bootstrap and jquery-poppers
//********EVERY ROUTE MUST START WITH A '/'*******
app.use('/assetsvendor/bootstrap', express.static(path.join(__dirname, 'node_modules', 'bootstrap', 'dist')));
app.use('/assetsvendor/jquery', express.static(path.join(__dirname, 'node_modules', 'jquery', 'dist')));
app.use('/assetsvendor/popper', express.static(path.join(__dirname, 'node_modules', 'popper.js', 'dist', 'umd')));
app.use('/assetsvendor/fontawesome', express.static(path.join(__dirname, 'node_modules', '@fortawesome', 'fontawesome-free')));
app.use('/assetsvendor/socket.io', express.static(path.join(__dirname, 'node_modules', 'socket.io-client', 'dist')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', {
    title: 'Error | Note Taker',
    authenticated: req.user
  });
});

module.exports = app;
