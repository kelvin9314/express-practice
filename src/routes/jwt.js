/* eslint-disable no-use-before-define */
const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post('/api/login', (req, res) => {
  // Mock user
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

router.post('/api/posts', verifyToken, (req, res) => {
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

// Format of Token
// Authorization: Bearer <access_token>

// Verify Token
function verifyToken(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers.authorization;
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

module.exports = router;
