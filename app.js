const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello world!!!');
});

app.get('/api/courses', (req, res) => {
  // in real env , get the list of data from database and return them
  res.send([1, 2, 3]);
});

app.get('/api/courses/:id', (req, res) => {
  res.send(req.params.id);
});

app.get('/api/posts/:year/:month', (req, res) => {
  res.send(req.query);
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`listening on port ${port}...`);
});
