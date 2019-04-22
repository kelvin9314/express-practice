const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const courses = [{ id: 1, name: 'maths' }, { id: 2, name: 'chinese' }, { id: 3, name: 'english' }];

app.get('/', (req, res) => {
  res.send('Hello world !V!V!');
});

app.get('/api/courses', (req, res) => {
  // in real env , get the list of data from database and return them
  res.send(courses);
});

app.post('/api/courses', (req, res) => {
  const schema = {
    name: Joi.string()
      .min(3)
      .required()
  };

  const result = Joi.validate(req.body, schema);

  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  const course = {
    id: courses.length + 1,
    name: req.body.name
  };
  courses.push(course);
  res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) res.status(404).send('The courses with the given ID was not found.');

  res.send(course);
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`listening on port ${port}...`);
});
