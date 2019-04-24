const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const categoriesRoute = require('../routes/categories');
const jwtRoute = require('../routes/jwt');

const book = express();

book.use(cors());
book.use(express.json());
book.use((req, res, next) => {
  // eslint-disable-next-line no-console
  console.log(`${new Date().toString()} => ${req.originalUrl}`);
  next();
});
book.use(categoriesRoute);
book.use(jwtRoute);

// QueryString => query property on the request object
// localhost:8080/api?name=kelvin&&age=20
book.get('/api', (req, res) => {
  if (req.query.name) {
    res.send(`You have a requested an api ${req.query.name}`);
  } else {
    res.send(`You have a requested an api`);
  }
});

const port = process.env.PORT || 8080;
book.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`listening on port: ${port}`);
});
