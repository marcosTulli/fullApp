const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app:sessionsRouter');
const { MongoClient, ObjectId } = require('mongodb');
const { MONGO_URL, DB_NAME } = require('../config/variables');
const speakerService = require('../services/speakerService');

const sessionRouter = express.Router();

sessionRouter.use((req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect('/auth/signIn');
  }
});

sessionRouter.route('/').get((req, res) => {
  (async function mongo() {
    let client;
    try {
      client = await MongoClient.connect(MONGO_URL);
      debug(`${chalk.green('Connected to the mongo DB')}`);
      const db = client.db(DB_NAME);
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
  (async function mongo() {
    let client;
    try {
      client = await MongoClient.connect(MONGO_URL);
      debug('Connected to the mongo DB');

      const db = client.db(DB_NAME);
      const session = await db.collection('sessions').findOne({ _id: new ObjectId(id) });
      const speaker = await speakerService.getSpeakerById(session.speakers[0].id);
      console.log(speaker.data);
      session.speaker = speaker.data;
      res.render('session', { session });
    } catch (error) {
      debug(error.stack);
    }
    client.close();
  })();
});

module.exports = sessionRouter;
