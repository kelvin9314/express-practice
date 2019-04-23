const Joi = require('joi');
const express = require('express');
const jwt = require('jsonwebtoken');
const book = express();

book.use(express.json());

const categories = [
  { id: 1, category: 'UCD' },
  { id: 2, category: 'DEV' },
  { id: 3, category: 'MNG' },
  { id: 4, category: 'ENT' },
  { id: 5, category: 'COD' },
  { id: 6, category: 'MAG' }
];

book.get('/api', (req, res) => {
  res.json({
    message: 'welcome to the api'
  });
});

book.get('/api/categories', (req, res) => {
  res.send(categories);
});

book.get('/api/categories/:id', (req, res) => {
  const category = categories.find(c => c.id === parseInt(req.params.id));
  if (!category) return res.status(404).send('The category with the given ID was not found.');

  res.send(category);
  // this.verifyToken()
});

book.post('/api/categories', (req, res) => {
  const { error } = validDateCategories(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const newCategory = {
    id: categories.length + 1,
    category: req.body.category
  };

  categories.push(newCategory);
  res.send(categories);
});

book.post('/api/login', (req, res) => {
  //Mock user
  const user = {
    id: 1,
    userName: 'kelvin',
    email: 'kelvin@mail.test.com'
  };
  // asynchronous way , by default using HS256
  jwt.sign({ user }, 'secretKey', { expiresIn: '30s' }, (err, token) => {
    res.json({
      token
    });
  });
});

book.post('/api/posts', verifyToken, (req, res) => {
  jwt.verify(req.token, 'secretKey', (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({
        message: 'Post created...',
        authData
      });
    }
  });
});

book.put('/api/categories/:id', (req, res) => {
  const targetCategory = categories.find(c => c.id === parseInt(req.params.id));
  if (!targetCategory) return res.status(404).send('The category with the given ID was not found.');

  const { error } = validDateCategories(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  targetCategory.category = req.body.category;
  res.send(targetCategory);
});

book.delete('/api/categories/:id', (req, res) => {
  const targetCategory = categories.find(c => c.id === parseInt(req.params.id));
  if (!targetCategory) return res.status(404).send('The category with the given ID was not found');

  const index = categories.indexOf(targetCategory);
  categories.splice(index, 1);

  res.send(categories);
});

validDateCategories = category => {
  const schema = {
    category: Joi.string()
      .min(3)
      .max(3)
      .required()
  };

  return Joi.validate(category, schema);
};

// Format of Token
// Authorization: Bearer <access_token>

// Verify Token
function verifyToken(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers['authorization'];
  // Check if bearer is undefined
  if (typeof bearerHeader !== 'undefined') {
    // Split at the space
    const bearer = bearerHeader.split(' ');
    // Get token from array
    const bearerToken = bearer[1];
    // Set the token
    req.token = bearerToken;
    // Next middleware
    next();
  } else {
    // Forbidden
    // res.status(403).send('403 error');
    res.sendStatus(403);
  }
}

const port = process.env.PORT || 8080;
book.listen(port, () => {
  console.log(`listening on port: ${port}`);
});
