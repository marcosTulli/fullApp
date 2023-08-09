const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app:sessionsRouter');
const { MongoClient, ObjectId } = require('mongodb');
// const sessions = require('../data/sessions.json');

const sessionRouter = express.Router();

sessionRouter.route('/').get((req, res) => {
  const url = 'mongodb+srv://marcosTulli:tuki@cluster0.hkb8byd.mongodb.net/?retryWrites=true&w=majority';
  const dbName = 'globomantics';

  (async function mongo() {
    let client;
    try {
      client = await MongoClient.connect(url);

      debug(`${chalk.green('Connected to the mongo DB')}`);

      const db = client.db(dbName);
      const sessions = await db.collection('sessions').find().toArray();

      res.render('sessions', { sessions });
    } catch (error) {
      debug(error.stack);
    }
    client.close();
  })();
});

sessionRouter.route('/:id').get((req, res) => {
  const id = req.params.id;
  const url = 'mongodb+srv://marcosTulli:tuki@cluster0.hkb8byd.mongodb.net/?retryWrites=true&w=majority';
  const dbName = 'globomantics';

  (async function mongo() {
    let client;
    try {
      client = await MongoClient.connect(url);
      debug('Connected to the mongo DB');

      const db = client.db(dbName);
      const session = await db.collection('sessions').findOne({ _id: new ObjectId(id) });
      res.render('session', { session });
    } catch (error) {
      debug(error.stack);
    }
    client.close();
  })();
});

module.exports = sessionRouter;
