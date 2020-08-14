import express from 'express';
import React from 'react';
import Enter from '../../components/Enter';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import serialize from 'serialize-javascript';
import passport from 'passport';

const router = express.Router();

router.get('/', notLoggedIn, (req, res, next) => {
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
              <title>Speaqiz - Регистрация</title>
                <link rel="stylesheet" type="text/css" href="main.css">
                 <meta name="viewport" content="width=device-width, initial-scale=1">
                  <script>window.__INITIAL_MESSAGE__ = ${serialize(errors)}</script>
                   <script>window.__INITIAL_COND__ = ${serialize(cond)}</script>
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
