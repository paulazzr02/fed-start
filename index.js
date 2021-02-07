const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const favicon = require('serve-favicon');
const logger = require('morgan');

const app = express();
const port = process.env.PORT || '3000';

const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const aboutRouter = require('./routes/about');
const searchRouter = require('./routes/search');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// render HTML files
app.engine('html', require('ejs').renderFile);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'dist')));
app.use(favicon(path.join(__dirname, 'favicon.ico')));
// app.use(favicon(path.join(__dirname, 'dist', 'favicon.ico')));

app.use('/', indexRouter);
app.use(loginRouter);
app.use(aboutRouter);
app.use(searchRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error.html', { title: 'Error' });
});

app.listen(port, () => {
  console.log(`webapp listening on port ${port}`);
});
