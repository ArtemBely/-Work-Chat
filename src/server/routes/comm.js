import React from 'react';
import mongoose from 'mongoose';
import express from 'express';
import multer from 'multer';
import multerS3 from 'multer-s3';
import aws from 'aws-sdk';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import Communication from '../../components/Communication';
import Message from '../models/question';
import serialize from 'serialize-javascript';
import passport from 'passport';
import { getData } from '../../components/fetchData';

const router = express.Router();

router.get('/', isLoggedIn,  async (req, res, next) => {
  console.log(new Date().getHours() + '.' + new Date().getMinutes() + '  ' + new Date().getDate() + '.' + (new Date().getMonth() + 1) + '.' + new Date().getFullYear());
  getData()
  .then(data => {
    const user = req.user;
    const cond = req.isAuthenticated();
    const prof = renderToString(
      <StaticRouter>
           <Communication />
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

aws.config.update({
  secretAccessKey: 'xuL0fxQF4XGnu7EWh/Ti89ACExr+5NeDckPXqldy',
  accessKeyId: 'AKIAJE32G65JRVPUGIUA',
  region: 'ap-northeast-2'
});

const s3 = new aws.S3();

const fileFilter = (req, file, cb) => {
  if( file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetipe === 'image/svg') {
    cb(null, true);
  }
  else  { cb(null, false); }
};

var upload = multer({
  fileFilter: fileFilter,
  limits:{ fileSize: 5000000 },
  storage: multerS3({
    s3: s3,
    bucket: 'speaqiz-images',
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: 'META_DATA'});
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    }
  })
});

router.get('/:id', async (req, res, next) => {
  let message = await Message.findById(req.params.id);
  try {
    message.delete();
    res.redirect('/communication');
  }
  catch(err) {
    console.log(err);
  }
})

router.post('/', upload.single('cover'), async(req, res, next) => {
  const fileName = req.file !=null ? req.file.location : null
  const date = new Date().getHours() + ':' + new Date().getMinutes() + '    ' + new Date().getDate() + '.' + (new Date().getMonth() + 1) + '.' + new Date().getFullYear();
  let message = new Message({
    name: req.user.name,
    message: req.body.test2,
    coverImageName: fileName,
    date: date,
    mail: req.user.email
  });

  try {
    message = await message.save()
    console.log(message);
    res.redirect('/communication');
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
