const express = require('express');
const debug = require('debug')('app:sessionsRouter');
const { MongoClient, ObjectId } = require('mongodb');

const authRouter = express.Router();

authRouter.route('/signUp').post((req, res) => {
  const { username, password } = req.body;
  const url = 'mongodb+srv://marcosTulli:tuki@cluster0.hkb8byd.mongodb.net/?retryWrites=true&w=majority';
  const dbName = 'globomantics';

  (async function addUser() {
    let client;
    try {
      client = await MongoClient.connect(url);
      const db = client.db(dbName);
      const user = { username, password };
      const results = await db.collection('users').insertOne(user);
      console.log(results);
      req.login(results.insertedId, () => {
        res.redirect('/auth/profile');
      });
    } catch (error) {
      debug(error);
    }
    client.close();
  })();

  req.login(req.body, () => {
    res.redirect('/auth/profile');
  });
});

authRouter.route('/profile').get((req, res) => {
  res.json(req.user);
});

module.exports = authRouter;
