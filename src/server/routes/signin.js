import express from 'express';
import React from 'react';
import Enter from '../../components/Enter';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import serialize from 'serialize-javascript';
import passport from 'passport';
import { getData } from '../../components/fetchData';

const router = express.Router();

router.get('/', notLoggedIn, (req, res, next) => {
  getData()
  .then(data => {
    const cond = req.isAuthenticated();
    const user = req.user;
    const errors = req.flash('errors');
    const mark = renderToString(
      <StaticRouter>
         <Enter />
      </StaticRouter>
    )
  return res.send(
      `<!DOCTYPE html>
          <html>
              <head>
                <title>Вход</title>
                  <link rel="stylesheet" type="text/css" href="main.css">
                   <link rel="shortcut icon" href="/images/main.ico" type="image/x-icon">
                    <meta name="viewport" content="width=device-width, initial-scale=1">
                     <script>window.__INITIAL_MESSAGE__ = ${serialize(errors)}</script>
                      <script>window.__INITIAL_COND__ = ${serialize(cond)}</script>
                       <script>window.__INITIAL_DATA__ = ${serialize(data)}</script>
                       <script>window.__INITIAL_USER__ = ${serialize(user)}</script>                   <script src='bundle.js' defer></script>
                       <title>Регистрация</title>
                        </head>
                      <body>
                     <div id="app">
                   ${mark}
                </div>
              </body>
          </html>
      `
    )
  }).catch(next)
});

router.post('/',
    passport.authenticate('local.signin', {
    successRedirect: '/profile',
    failureRedirect: '/signin',
    passReqToCallback: true
  })
);

function notLoggedIn(req, res, next) {
  if(!req.isAuthenticated()) {
    return next();
  }
  res.redirect('/profile');
}

export default router;
