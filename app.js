const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello From my app');
});

//Comment
app.listen(3000, () => {
  console.log('Listening on port 3000');
});
