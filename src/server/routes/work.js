import React from 'react';
import express from 'express';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import Work from '../../components/Work';
import Separate from '../../components/Separate';
import serialize from 'serialize-javascript';
import passport from 'passport';
import { getData } from '../../components/fetchData';
import Theme from '../models/theme.js';
import Messages from '../models/messages.js';

const router = express.Router();

router.get('/', isLoggedIn,  async (req, res, next) => {
  getData()
  .then(data => {
    const user = req.user;
    const cond = req.isAuthenticated();
    const prof = renderToString(
      <StaticRouter>
           <Work />
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

router.get('/:id', async(req, res, next) => {
  getData()
  .then(data => {
    const user = req.user;
    const cond = req.isAuthenticated();
    const prof = renderToString(
      <StaticRouter>
           <Separate />
      </StaticRouter>
    )
    return res.send(
      `<!DOCTYPE html>
            <html>
                <head>
                   <title>Speaqiz - Регистрация</title>
                      <link rel="stylesheet" type="text/css" href="../main.css">
                          <meta name="viewport" content="width=device-width, initial-scale=1">
                             <script src='/bundle.js' defer></script>
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
  }).catch(next);
});

router.get('/:id/:param2', async(req, res, next) => {
  let mes = await Theme.find({title: req.params.id});
  let able = mes[0].scope;
  let able3 = able.findIndex(ab => ab._id == req.params.param2);
  able.splice(able3, 1);

  try {
    mes[0].save();
    res.redirect('/work/' + req.params.id);
  }
  catch(err) {
    console.log(err);
    res.redirect('/profile');
  }
});

router.post('/:id', async(req, res, next) => {

  let message = new Messages({
    name: req.user.name,
    msg: req.body.test2,
    date: new Date().getHours() + ':' + new Date().getMinutes() + '  ' + new Date().getDate() + '.' + (new Date().getMonth() + 1) + '.' + new Date().getFullYear(),
    mail: req.user.email
  });

  let separate = await Theme.find({title: req.params.id});
  let arr = separate[0].scope;

    arr.push(message);
    try {
      separate[0].save();
      console.log(separate);
      res.redirect('/work/' + separate[0].title);
    }
    catch(err) {
      console.log(err);
      res.redirect('/profile');
    }
  console.log(separate);
});

router.post('/', async(req, res, next) => {
  let theme = new Theme({
    title: req.body.title
  });
  try {
    theme = await theme.save();
    console.log(theme);
    res.redirect('/work');
  }
  catch(err) {
    console.log(err);
    res.redirect('/');
  }
});


function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}

export default router;
