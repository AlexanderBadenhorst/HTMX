const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const router = require('./routes/index'); // <--- This line imports the router object

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/', router); // modified line

app.use((req, res, next) => {
  res.status(404).send('Not Found');
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Internal Server Error');
});

const server = app.listen(3000, () => {
  console.log(`Express is running on port ${server.address().port}`);
});