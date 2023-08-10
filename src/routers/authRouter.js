const express = require('express');
const debug = require('debug')('app:authRouter');
const { MongoClient, ObjectID } = require('mongodb');
const passport = require('passport');
const { MONGO_URL, DB_NAME } = require('../config/variables');

const authRouter = express.Router();

authRouter.route('/signUp').post((req, res) => {
  const { username, password } = req.body;
  (async function addUser() {
    let client;
    try {
      console.log(variables.MONGO_URL);
      client = await MongoClient.connect(MONGO_URL);

      const db = client.db(DB_NAME);
      const user = { username, password };
      const results = await db.collection('users').insertOne(user);
      debug(results);
      req.login(results.insertedId, () => {
        res.redirect('/auth/profile');
      });
    } catch (error) {
      debug(error);
    }
    client.close();
  })();
});

authRouter
  .route('/signIn')
  .get((req, res) => {
    res.render('signin');
  })
  .post(
    passport.authenticate('local', {
      successRedirect: '/auth/profile',
      failureRedirect: '/',
    })
  );
authRouter.route('/profile').get((req, res) => {
  res.json(req.user);
});

module.exports = authRouter;
