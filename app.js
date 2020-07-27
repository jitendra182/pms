var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dashBoardRouter = require("./routes/dashboard");
var addNewCatagoryRouter = require("./routes/addNewCatagory");
var addNewPasswordRouter = require("./routes/addNewPassword");
var passwordCatagoryRouter = require("./routes/passwordCatagory");
var passwordListRouter = require("./routes/passwordList");
var joinRouter= require("./routes/join")

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/dashboard',dashBoardRouter);
app.use('/addnew-catagory',addNewCatagoryRouter);
app.use('/addnew-password',addNewPasswordRouter);
app.use('/password-catagory',passwordCatagoryRouter);
app.use('/password-list',passwordListRouter);
app.use("/join",joinRouter);

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
