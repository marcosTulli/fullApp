const express = require('express');
const sessionsData = require('../data/sessions.json');

const sessionRouter = express.Router();

sessionRouter.route('/').get((req, res) => {
  res.render('sessions', {
    sessionsData,
  });
});

sessionRouter.route('/:id').get((req, res) => {
  const id = req.params.id;
  res.render('session', { session: sessionsData[id] });
});

module.exports = sessionRouter;
