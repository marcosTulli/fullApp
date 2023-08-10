const debug = require('debug')('app:localStrategy');
const passport = require('passport');
const chalk = require('chalk');
const { Strategy } = require('passport-local');
const { MongoClient } = require('mongodb');
const { MONGO_URL, DB_NAME } = require('../variables');

module.exports = function localStrategy() {
  passport.use(
    new Strategy(
      {
        usernameField: 'username',
        passwordField: 'password',
      },
      (username, password, done) => {
        (async function validateUser() {
          let client;
          try {
            client = await MongoClient.connect(MONGO_URL);
            debug(`${chalk.green('Connected to the mongo DB')}`);
            const db = client.db(DB_NAME);
            const user = await db.collection('users').findOne({ username });
            if (user && user.password === password) {
              done(null, user);
            } else {
              done(null, false);
            }
          } catch (error) {
            done(error, false);
          }
          client.close();
        })();
      }
    )
  );
};
