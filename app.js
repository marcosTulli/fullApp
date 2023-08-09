const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');

const PORT = process.env.PORT || 3000;
const app = express();
const sessionRouter = express.Router();

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, './public/')));

app.set('views', './src/views');
app.set('view engine', 'ejs');

sessionRouter.route('/').get((req, res) => {
  res.render('sesisons', {
    sessions: [
      { title: 'Session 1', description: 'This is session 1' },
      { title: 'Session 2', description: 'This is session 2' },
      { title: 'Session 3', description: 'This is session 3' },
      { title: 'Session 4', description: 'This is session 4' },
      { title: 'Session 5', description: 'This is session 5' },
    ],
  });
});

sessionRouter.route('/1').get((req, res) => {
  res.send('Hello Single sessions');
});

app.use('/sessions', sessionRouter);

app.get('/', (req, res) => {
  res.render('index', { title: 'Welcome to Globomantics', data: ['a', 'b', 'c'] });
});

app.listen(PORT, () => {
  debug(`Listening on PORT ${chalk.green(PORT)} `);
});
