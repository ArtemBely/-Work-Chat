import mongoose from 'mongoose';
import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import validator from 'express-validator';
import session from 'express-session';
import serialize from 'serialize-javascript';
import { StaticRouter, matchPath } from 'react-router-dom';
import Routes from '../components/fetchRoutes';
import App from '../components/App';
import Main from '../components/Main';
import passport from 'passport';
import flash from 'connect-flash';
import { getData } from '../../components/fetchData';

const port = process.env.PORT || 5000;
const CONNECTION_URI = process.env.MONGODB_URI;
const app = express();

import apiRouter from './routes/api';
import signRouter from './routes/signup';
import signInRouter from './routes/signin';
import profileRouter from './routes/profile';
import commRouter from './routes/comm';
import workRouter from './routes/work';

require('dotenv/config');

mongoose.connect(
  CONNECTION_URI || process.env.CONNECT,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  },
  () => {
    console.log('Connection completed');
  }
);

app.use(function(req, res, next) {
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: false }));

app.use(validator());
app.use(cookieParser())
app.use(session({
  secret: 'mysecret',
  resave: false,
  saveUnitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use('/signup', signRouter);
app.use('/signin', signInRouter);
app.use('/profile', profileRouter);
app.use('/api', apiRouter);
app.use('/communication', commRouter);
app.use('/work', workRouter);

app.get('/', (req, res, next) => {
  getClass()
  .then(data => {
    const cond = req.isAuthenticated();
    const user = req.user;
    const mark = renderToString(
      <StaticRouter>
         <Main />
      </StaticRouter>
    )
    return res.send(
      `<!DOCTYPE html>
          <html>
              <head>
                <title>Изучайте языки вместе со speaqiz</title>
                  <link rel="stylesheet" type="text/css" href="../main.css">
                  <link rel="shortcut icon" href="/images/astronaut-3.ico" type="image/x-icon">
                  <meta name="viewport" content="width=device-width, initial-scale=1">
                    <script src='/bundle.js' defer></script>
                     <script>window.__INITIAL_DATA__= ${serialize(data)}</script>
                        <script>window.__INITIAL_COND__= ${serialize(cond)}</script>
                         <script>window.__INITIAL_USER__= ${serialize(user)}</script>
                          <title>Практикуй английский</title>
                        </head>
                      <body>
                     <div id="app">
                   ${mark}
                </div>
              </body>
          </html>`
      )
  }).catch(next)
});

app.get('*', (req, res, next) => {
  const activeRouter = Routes.find((route) => matchPath(req.url, route)) || {};
  const promise = activeRouter.fetchInitialData
                  ? activeRouter.fetchInitialData(req.url)
                  : Promise.resolve()

  promise
  .then(data => {
    const context = { data };
    const mark = renderToString(
      <StaticRouter location={req.url} context={context}>
         <App data={data}/>
      </StaticRouter>
    );
    res.send(
      `<!DOCTYPE html>
       <html>
        <head>
          <title>Изучайте языки вместе со speaqiz</title>
            <link rel="stylesheet" type="text/css" href="../main.css">
            <link rel="shortcut icon" href="/images/astronaut-3.ico" type="image/x-icon">
             <meta name="viewport" content="width=device-width, initial-scale=1">
              <script src='/bundle.js' defer></script>
                 <script>window.__INITIAL_DATA__= ${serialize(data)}</script>
                    <title>Практикуй английский</title>
                  </head>
                <body>
               <div id="app">
             ${mark}
          </div>
        </body>
    </html>`
    )
  }) .catch(next)
});
/*
app.use((error, req, res, next) => {
  res.status(error.status);

    res.json({
    status: error.status,
    message: error.message,
    stack: error.stack
  });
});
*/

app.use((req, res, next) => {  //<-- заменить если появится непредвиденная ошибка
   const err = new Error ('Noooo');
     err.status = 404;
     next (err);
});

app.listen(port, () => { console.log('Connected!'); })
