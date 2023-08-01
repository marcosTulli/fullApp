const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');

const app = express();
const port = 3000;

app.use(morgan('tiny'));

app.get('/', (req, res) => {
  res.send('Hello From my app');
});

//Comment
app.listen(port, () => {
  debug(`Listening on port ${chalk.green(port)} `);
});
