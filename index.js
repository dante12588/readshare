
const express = require('express');
const morgan = require('morgan');
const hbs  = require('express-handlebars');
const routes = require('./routes/index');
const session = require('express-session');
const methodOverride = require('method-override');

const app = express();
const port = 4000;

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(methodOverride('_method'));

app.use(session({
  secret: 'codziennie gram na flecie',
  resave: false,
  saveUninitialized: false
}));

app.engine('handlebars', hbs.engine({
    defaultLayout: "main"
  }));
app.set('view engine', 'handlebars');


// Configure Routes
app.use('/', routes);

app.listen(port, () => {
  console.log(`Aplikacja działa na http://localhost:${port}`);
});
