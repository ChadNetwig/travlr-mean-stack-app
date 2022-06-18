// CLN: added dotenv for environment variable used for JWT salt hash
require('dotenv').config();

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// CLN: added HBS constant
const hbs = require('hbs');
//CLN: added passport constant
const passport = require('passport');

// CLN: require database code for mongoose to connect to database at startup
require("./app_api/database/db");

// CLN:  require passport auth support
require('./app_api/config/passport');


var indexRouter = require('./app_server/routes/index');
var usersRouter = require('./app_server/routes/users');
var travelRouter = require('./app_server/routes/travel');
// CLN: added router for APIs
const apiRouter = require('./app_api/routes/index');
 
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));

// CLN: added partials for Handlebars
// register handlebars partials (https://www.npmjs.com/package/hbs)
hbs.registerPartials(path.join(__dirname, 'app_server', 'views/partials'));

app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//CLN: added use for passport and initialize it
app.use(passport.initialize());


// CLN : allow CORS access to Express backend from Angular frontend (origin at localhost:4200)
// NOTE: This must be before the app.use('/api', apiRouter) statement, otherwise the page is routed 
//       before the necessary CORS headers are added to the HTML
app.use('/api', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

// CLN:  added to catch unauthorized error and create 401
// NOTE: This must be before the app.use('/api', apiRouter) statement, otherwise the page is routed
//       before error handling 
app.use((err, req, res, next) => {
  if (err.name === 'UnauthroizedError') {
    res
      .status(401)
      .json({"message": err.name + ": " + err.message});
  }
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
// CLN: added new travel route
app.use('/travel', travelRouter);
// CLN: When any HTTP requests come in for /api pass to the apiRouter
app.use('/api', apiRouter);

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
  res.render('error');
});

module.exports = app;
