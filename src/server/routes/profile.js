import React from 'react';
import express from 'express';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import Profile from '../../components/Profile';
import serialize from 'serialize-javascript';
import passport from 'passport';
import { getData } from '../../components/fetchData';

const router = express.Router();

router.get('/', isLoggedIn,  async (req, res, next) => {
  getData()
  .then(data => {
    const user = req.user;
    const cond = req.isAuthenticated();
    const prof = renderToString(
      <StaticRouter>
           <Profile />
      </StaticRouter>
    )
    return res.send(
      `<!DOCTYPE html>
            <html>
                <head>
                   <title>Speaqiz - Регистрация</title>
                      <link rel="stylesheet" type="text/css" href="main.css">
                          <meta name="viewport" content="width=device-width, initial-scale=1">
                             <script src='bundle.js' defer></script>
                              <script>window.__INITIAL_DATA__= ${serialize(data)}</script>
                               <script>window.__INITIAL_COND__= ${serialize(cond)}</script>
                                <script>window.__INITIAL_USER__= ${serialize(user)}</script>
                               </head>
                             <body>
                           <div id="app">
                        ${prof}
                  </div>
              </body>
        </html>
      `
    )
  }).catch(next)

});

router.get('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/');
});

function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}

export default router;
