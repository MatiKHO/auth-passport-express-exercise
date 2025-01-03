
const express = require("express");
const app = express();
const PORT = 3000;
const morgan = require("morgan");
const { create } = require('express-handlebars');
const session = require('express-session');
const passport = require('passport');
const hbs = create({
  extname: 'hbs',
  defaultLayout: 'main',
  partialsDir: 'views/partials',
  helpers: require('./utils/helpers')
});




app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport');
app.use(morgan('dev'));

app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } 
}));


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});