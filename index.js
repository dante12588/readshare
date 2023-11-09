
const express = require('express');
const morgan = require('morgan');
const hbs  = require('express-handlebars');

const app = express();
const port = 4000;

app.use(morgan('dev'));

app.engine('handlebars', hbs.engine({
    defaultLayout: "main"
  }));
app.set('view engine', 'handlebars');


app.get('/', (req, res) => {
  res.send('Witaj świecie!');
});

app.listen(port, () => {
  console.log(`Aplikacja działa na http://localhost:${port}`);
});
