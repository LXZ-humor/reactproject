var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/public', express.static(__dirname + '/public'))
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login',require("./routes/login"));
app.use('/category',require("./routes/Category/addCategory"));
app.use('/goods',require("./routes/Goods/index"))
app.use("/User",require("./routes/Users/index"))
// app.use("/AddCategory",require("./routes/category/category"))
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


console.log('正在监听端口8080')
module.exports = app;
