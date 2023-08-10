const express = require('express');
const debug = require('debug')('app:sessionsRouter');
const { MongoClient, ObjectId } = require('mongodb');

const authRouter = express.Router();

authRouter.route('/signup').post((req, res) => {
  res.json(req.body);
});

module.exports = authRouter;
