const express = require('express');
const morgan = require('morgan');
const hbs  = require('express-handlebars');
const routes = require('./routes/index');
const session = require('express-session');
const methodOverride = require('method-override');
const handlebars = require('handlebars');
const fs = require('fs');

const app = express();
const port = 4000;

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Wyłączanie cache
app.set('view cache', false);

app.use(methodOverride('_method'));

app.use(express.static('public'));

app.use(session({
  secret: 'codziennie gram na flecie',
  resave: false,
  saveUninitialized: false
}));

handlebars.registerHelper('eq', function(a, b) {
  return a === b;
});

handlebars.registerPartial('modal', fs.readFileSync(__dirname + '/views/partials/modal.handlebars', 'utf8'));
handlebars.registerPartial('bestBooks', fs.readFileSync(__dirname + '/views/partials/bestbooks.handlebars', 'utf8'));
handlebars.registerPartial('lastBooks', fs.readFileSync(__dirname + '/views/partials/lastbooks.handlebars', 'utf8'));


app.engine('handlebars', hbs.engine({
    defaultLayout: "main"
  }));
app.set('view engine', 'handlebars');


// Configure Routes
app.use('/', routes);

app.listen(port, () => {
  console.log(`Aplikacja działa na http://localhost:${port}`);
});
