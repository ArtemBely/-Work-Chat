import React from 'react';
import mongoose from 'mongoose';
import express from 'express';
import axios from 'axios';
import SignUp from '../models/registration';
import Message from '../models/question';
import Theme from '../models/theme';
import passport from 'passport';

const router = express.Router();

router.get('/profilefast', async (req, res, next) => {
  let user = await SignUp.find();
    let message = await Message.find();
      let theme = await Theme.find();
    res.json({user, message, theme});
  return;
});

export default router;
