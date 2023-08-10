const express = require('express');
const debug = require('debug')('app:sessionsRouter');
const passport = require('passport');
const { MongoClient, ObjectId } = require('mongodb');

const authRouter = express.Router();

authRouter.route('/signUp').post((req, res) => {
  const { username, password } = req.body;
  const url = 'mongodb+srv://marcosTulli:tuki@cluster0.hkb8byd.mongodb.net/?retryWrites=true&w=majority';
  const dbName = 'globomantics';

  (async function tuki() {
    let client;
    try {
      client = await MongoClient.connect(url);
      const db = client.db(dbName);
      const user = { username, password };
      results = await db.collection('users').insertOne(user);
      debug(results);
      req.login(results.inserteId, () => {
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
      succesRedirect: '/auth/profile/',
      failure: '/',
    })
  );

authRouter.route('/profile').get((req, res) => {
  res.json(req.user);
});

module.exports = authRouter;
