/* eslint-disable consistent-return */
/* eslint-disable no-undef */
const express = require('express');
const Joi = require('joi');

const router = express.Router();

const categories = [
  { id: 1, category: 'UCD' },
  { id: 2, category: 'DEV' },
  { id: 3, category: 'MNG' },
  { id: 4, category: 'ENT' },
  { id: 5, category: 'COD' },
  { id: 6, category: 'MAG' }
];

router.get('/api/categories', (req, res) => {
  res.send(categories);
});

router.get('/api/categories/:id', (req, res) => {
  const category = categories.find(c => c.id === parseInt(req.params.id, 10));
  if (!category) return res.status(404).send('The category with the given ID was not found.');

  res.send(category);
  // this.verifyToken()
});

router.post('/api/categories', (req, res) => {
  const { error } = validDateCategories(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const newCategory = {
    id: categories.length + 1,
    category: req.body.category
  };

  categories.push(newCategory);
  res.send(categories);
});

router.put('/api/categories/:id', (req, res) => {
  const targetCategory = categories.find(c => c.id === parseInt(req.params.id, 10));
  if (!targetCategory) return res.status(404).send('The category with the given ID was not found.');

  const { error } = validDateCategories(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  targetCategory.category = req.body.category;
  res.send(targetCategory);
});

router.delete('/api/categories/:id', (req, res) => {
  const targetCategory = categories.find(c => c.id === parseInt(req.params.id, 10));
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
module.exports = router;
