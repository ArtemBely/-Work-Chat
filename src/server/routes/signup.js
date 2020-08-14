import React from 'react';
import passport from 'passport';
import mongoose from 'mongoose';
import express from 'express';
import serialize from 'serialize-javascript';
import { StaticRouter } from 'react-router-dom';
import { renderToString } from 'react-dom/server';
import SignUp from '../models/registration.js';
import Registration from '../../components/Registration';
import { getData } from '../../components/fetchData';

const LocalStrategy = require('passport-local').Strategy;
const router = express.Router();

passport.serializeUser(function(user, done) {
  done(null, user.id);
});
passport.deserializeUser(function(id, done) {
  SignUp.findById(id, function(err, user) {
    done(err, user);
  });
});

router.get('/', notLoggedIn, (req, res, next) => {
  getClass()
  .then(data => {
    const cond = req.isAuthenticated();
    const user = req.user;
    const mark = renderToString(
      <StaticRouter>
         <Registration />
      </StaticRouter>
    )
    return res.send(
      `<!DOCTYPE html>
          <html>
              <head>
                <title>Регистрация</title>
                  <link rel="stylesheet" type="text/css" href="../main.css">
                  <link rel="shortcut icon" href="/images/main.ico" type="image/x-icon">
                  <meta name="viewport" content="width=device-width, initial-scale=1">
                    <script src='/bundle.js' defer></script>
                        <script>window.__INITIAL_COND__= ${serialize(cond)}</script>
                         <script>window.__INITIAL_USER__= ${serialize(user)}</script>
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
  }).catch(next)
});

router.post('/', notLoggedIn, (req, res, done) => {
  var name = req.body.name;
  var lastname = req.body.lastname;
  var email = req.body.email;
  var password = req.body.password;
  var confirm = req.body.confirm;

  req.checkBody('email', 'Email должен быть правильного формата ;)').isEmail();
  req.checkBody('password', 'Минимальная длина пароля 5 символов').isLength({min: 5});
  req.checkBody('confirm', 'Пароль не совпадает').equals(password);

  var errors = req.validationErrors();

    if(errors) {

          const cond = req.isAuthenticated();
          const mark = renderToString(
            <StaticRouter>
               <Registration />
            </StaticRouter>
          )
        return res.send(
            `<!DOCTYPE html>
                <html>
                    <head>
                      <title>Регистрация</title>
                        <link rel="stylesheet" type="text/css" href="main.css">
                         <link rel="shortcut icon" href="/images/main.ico" type="image/x-icon">
                          <meta name="viewport" content="width=device-width, initial-scale=1">
                           <script src='bundle.js' defer></script>
                             <script>window.__INITIAL_ERRORS__= ${serialize(errors)}</script>
                             <script>window.__INITIAL_COND__= ${serialize(cond)}</script>
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
      }

      SignUp.findOne({email: email}, function(err, user) {
        if (err) {
          return done(err);
        }
        if(user) {
            const errors = [{'msg': 'Такой Email уже используется'}];
            const cond = req.isAuthenticated();
            const mark = renderToString(
              <StaticRouter>
                 <Registration />
              </StaticRouter>
            )
          res.send(
            `<!DOCTYPE html>
                <html>
                    <head>
                      <title>Регистрация</title>
                        <link rel="stylesheet" type="text/css" href="main.css">
                         <link rel="shortcut icon" href="/images/main.ico" type="image/x-icon">
                          <meta name="viewport" content="width=device-width, initial-scale=1">
                           <script src='bundle.js' defer></script>
                             <script>window.__INITIAL_ERRORS__= ${serialize(errors)}</script>
                             <script>window.__INITIAL_COND__= ${serialize(cond)}</script>
                             <title>Практикуй английский</title>
                              </head>
                            <body>
                           <div id="app">
                         ${mark}
                      </div>
                    </body>
                </html>
            `
          );

        return done(null, false);
      }

      var newUser = new SignUp({
        name: name,
        lastname: lastname,
        email: email,
        password: password
      });

      SignUp.createUser(newUser, function(err, user) {
        if (err) throw err;
        console.log(user);
      });

      const success = true;
      const cond = req.isAuthenticated();
      const indicate = 'Вы успешно зарегестрировались и теперь можете войти в личный кабинет!';
      const they = renderToString(
            <StaticRouter>
               <Registration />
            </StaticRouter>
          )
          res.send(
            `<!DOCTYPE html>
                  <html>
                      <head>
                         <title>Регистрация</title>
                            <link rel="stylesheet" type="text/css" href="main.css">
                              <link rel="shortcut icon" href="/images/main.ico" type="image/x-icon">
                               <meta name="viewport" content="width=device-width, initial-scale=1">
                                <script src='bundle.js' defer></script>
                                  <script>window.__INITIAL_STATE__ = ${serialize(indicate)}</script>
                                   <script>window.__INITIAL_SUCCESS__ = ${serialize(success)}</script>
                                    <script>window.__INITIAL_INDICATE__ = ${serialize(indicate)}</script>
                                    <script>window.__INITIAL_COND__= ${serialize(cond)}</script>
                                    </head>
                                  <body>
                                 <div id="app">
                              ${they}
                        </div>
                    </body>
              </html>
            `
          )
        });
      });

      //*вход в акк*//

      passport.use('local.signin', new LocalStrategy ({
          usernameField: 'email',
          passwordField: 'password',
          passReqToCallback: true
      },
      function(req, email, password, done) {
      SignUp.findOne({email: email}, async function(err, user) {
      if(err) {
        console.log(err);
        return done(err);
      }

          if(!user) {
            req.flash('errors', 'Не найдено пользователей, возможно вы еще не зарегистрировались');
            return done(null, false);
          }

          SignUp.comparePassword(password, user.password, function(err, isMatch) {
              if (err) throw err;
              if(isMatch) {
                return done(null, user);
              }
              else {
                req.flash('errors', 'Неверный пароль');
                return done(null, false)
              }
             })

          });
      }));

    function notLoggedIn(req, res, next) {
        if(!req.isAuthenticated()) {
          return next();
        }
        res.redirect('/profile');
    }



export default router;
