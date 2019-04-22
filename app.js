const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello world!!!');
});

app.get('/api/courses', (req, res) => {
  // in real env , get the list of data from database and return them
  res.send([1, 2, 3]);
});

// PORT
app.listen(8080, () => {
  console.log('listening on port 8080...');
});
