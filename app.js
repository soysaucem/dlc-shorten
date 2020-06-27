import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import sassMiddleware from 'node-sass-middleware';
import session from 'express-session';

import frontendRouter from './routes/frontend/index';
import backendRouter from './routes/backend/index';
import validateJwt from './common/middlewares/jwt-validation';
import handleJwtError from './common/middlewares/jwt-error-handler';
import startup from './common/middlewares/startup';

export const app = express();

const sessionSecret = process.env.SESSION_SECRET;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// middlewares setup
app.use(
  session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 3600000,
    },
  })
);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  sassMiddleware({
    src: path.join(__dirname, 'public'),
    dest: path.join(__dirname, 'public'),
    indentedSyntax: false, // true = .sass and false = .scss
    sourceMap: true,
  })
);
app.use(express.static(path.join(__dirname, 'public')));
app.use(startup);

app.use('/', frontendRouter);
app.use('/api', validateJwt(), handleJwtError, backendRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  if (process.env.MODE === 'development') {
    console.log(err.message);
    console.log(err);
  }

  // render the error page
  res.status(err.status || 500);
  if (err.status === 404) {
    return res.render('pages/404.html');
  }
  return res.render('pages/503.html');
});
