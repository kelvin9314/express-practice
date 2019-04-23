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

app.get('/api/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send('The courses with the given ID was not found.');
  res.send(course);
});

// insert data
app.post('/api/courses', (req, res) => {
  const { error } = validateCourses(req.body); // result.error
  if (error) return res.status(400).send(error.details[0].message);

  const course = {
    id: courses.length + 1,
    name: req.body.name
  };
  courses.push(course);
  res.send(courses);
});

// update data
app.put('/api/courses/:id', (req, res) => {
  /* Look up the courses
  If not existing , return 404 */
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send('The courses with the given ID was not found.');

  /* validate
  if invalid, return 400 - Bad b*/
  // const result = validateCourses(req.body);
  const { error } = validateCourses(req.body); // result.error
  if (error) return res.status(400).send(error.details[0].message);

  /* Update courses
   Return the updated courses */
  course.name = req.body.name;
  res.send(course);
});

app.delete('/api/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send('The courses with the given ID was not found.');

  //Delete
  const index = courses.indexOf(course);
  courses.splice(index, 1);

  res.send(course);
});

validateCourses = courses => {
  const schema = {
    name: Joi.string()
      .min(3)
      .required()
  };

  return Joi.validate(courses, schema);
};



const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`listening on port ${port}...`);
});
